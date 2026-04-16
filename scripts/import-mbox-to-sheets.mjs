/**
 * One-time import from Gmail Takeout .mbox into Google Sheets.
 *
 * Setup (same env as the site — use .env.local):
 *   GOOGLE_SERVICE_ACCOUNT_JSON   — full service account JSON string (one line on Vercel)
 *   GOOGLE_SHEETS_SPREADSHEET_ID  — from the sheet URL
 *   GOOGLE_SHEETS_TAB_NAME        — optional, default "Form submissions"
 *
 * Usage:
 *   node scripts/import-mbox-to-sheets.mjs /path/to/Starred.mbox
 *   node scripts/import-mbox-to-sheets.mjs --dry-run /path/to/Starred.mbox
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { simpleParser } from "mailparser";
import {
  appendFormSubmissionRows,
  ensureFormSubmissionHeaders,
  readMessageIdsColumn,
  parseJoinHiveFieldsFromEmailText,
  parseEngageMessageFromEmailText,
  parseEngageSenderFromEmailText,
  rowFromJoinTheHive,
  rowFromEngage,
} from "../lib/formSubmissionSheet.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });
dotenv.config({ path: path.join(__dirname, "..", ".env") });

function splitMbox(raw) {
  const normalized = raw.replace(/\r\n/g, "\n");
  return normalized.split(/\n(?=From \d+@)/).filter(Boolean);
}

function shouldSkip(subject) {
  if (!subject) return false;
  const s = subject.trim();
  if (/employment contract/i.test(s)) return true;
  if (/^re:\s*new application from join the hive/i.test(s)) return true;
  return false;
}

function mboxMessageToRow(parsed) {
  const subject = parsed.subject || "";
  if (shouldSkip(subject)) return null;

  const text = parsed.text || "";
  const submittedAt = (parsed.date && parsed.date.toISOString?.()) || new Date().toISOString();
  const messageId = (parsed.messageId || "").replace(/^<|>$/g, "").trim();

  const joinFields = parseJoinHiveFieldsFromEmailText(text);
  if (joinFields) {
    return rowFromJoinTheHive({
      submittedAt,
      subject,
      messageId,
      fields: joinFields,
    });
  }

  if (/engage with us/i.test(subject)) {
    const message = parseEngageMessageFromEmailText(text);
    const fromName = parseEngageSenderFromEmailText(text);
    return rowFromEngage({
      submittedAt,
      message,
      fromName,
      subject,
    });
  }

  return null;
}

async function main() {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes("--dry-run");
  const pathArg = argv.find((a) => !a.startsWith("--"));
  if (!pathArg) {
    console.error("Usage: node scripts/import-mbox-to-sheets.mjs [--dry-run] /path/to/file.mbox");
    process.exit(1);
  }
  const mboxPath = path.resolve(pathArg);
  if (!fs.existsSync(mboxPath)) {
    console.error("File not found:", mboxPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(mboxPath, "utf8");
  const chunks = splitMbox(raw);
  /** @type {import('mailparser').ParsedMail[]} */
  const parsedList = [];
  for (const chunk of chunks) {
    try {
      parsedList.push(await simpleParser(chunk));
    } catch (e) {
      console.warn("Skip chunk (parse error):", e instanceof Error ? e.message : e);
    }
  }

  parsedList.sort((a, b) => (a.date?.getTime() || 0) - (b.date?.getTime() || 0));

  const rows = [];
  for (const parsed of parsedList) {
    const row = mboxMessageToRow(parsed);
    if (row) rows.push(row);
  }

  console.log(`Parsed ${parsedList.length} messages, ${rows.length} rows for sheet (after filters).`);
  if (dryRun) {
    console.log("Dry run — no writes.");
    process.exit(0);
  }

  await ensureFormSubmissionHeaders();
  const existingIds = await readMessageIdsColumn();
  const newRows = rows.filter((r) => {
    const id = (r[3] || "").trim();
    if (!id) return true;
    if (existingIds.has(id)) return false;
    existingIds.add(id);
    return true;
  });

  console.log(`Appending ${newRows.length} new rows (${rows.length - newRows.length} duplicates skipped by Message ID).`);

  const BATCH = 100;
  for (let i = 0; i < newRows.length; i += BATCH) {
    await appendFormSubmissionRows(newRows.slice(i, i + BATCH));
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
