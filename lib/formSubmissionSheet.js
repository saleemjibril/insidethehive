import { google } from "googleapis";

/** @type {readonly string[]} */
export const FORM_SUBMISSION_HEADERS = [
  "Submitted at",
  "Form type",
  "Email subject",
  "Message ID",
  "Name",
  "Nickname",
  "Email",
  "Phone",
  "Position(s)",
  "X username",
  "Telegram username",
  "Proof of work link",
  "Engage message",
];

function getCredentials() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!json?.trim()) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_JSON is not set (service account JSON as a single-line string)"
    );
  }
  return JSON.parse(json);
}

function getSpreadsheetId() {
  const id = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!id?.trim()) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not set");
  }
  return id.trim();
}

function getTabName() {
  return (process.env.GOOGLE_SHEETS_TAB_NAME || "Form submissions").trim();
}

function sheetsClient() {
  const credentials = getCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

/** Avoid Sheets treating values as formulas. */
export function sanitizeSheetsCell(value) {
  if (value == null) return "";
  const s = String(value);
  if (/^[=+\-@]/.test(s)) return `'${s}`;
  return s;
}

function tabQuotedA1(suffix) {
  const tab = getTabName();
  const escaped = `'${tab.replace(/'/g, "''")}'`;
  return `${escaped}!${suffix}`;
}

export function sheetRangeA1() {
  return tabQuotedA1("A:M");
}

/**
 * @param {string[][]} rows
 */
export async function appendFormSubmissionRows(rows) {
  if (!rows.length) return;
  const sheets = sheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: getSpreadsheetId(),
    range: sheetRangeA1(),
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: rows },
  });
}

export async function readMessageIdsColumn() {
  const sheets = sheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range: tabQuotedA1("D:D"),
  });
  const values = res.data.values || [];
  const set = new Set();
  for (const row of values) {
    const id = row[0];
    if (id && typeof id === "string") set.add(id.trim());
  }
  return set;
}

export async function ensureFormSubmissionHeaders() {
  const sheets = sheetsClient();
  const range = tabQuotedA1("A1:M1");
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range,
  });
  const first = res.data.values?.[0]?.[0];
  if (first === FORM_SUBMISSION_HEADERS[0]) return;
  await sheets.spreadsheets.values.update({
    spreadsheetId: getSpreadsheetId(),
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [FORM_SUBMISSION_HEADERS] },
  });
}

const JOIN_LABELS = [
  ["Name:", "name"],
  ["Nickname:", "nickname"],
  ["Email:", "email"],
  ["Phone:", "phone"],
  ["Position(s):", "positions"],
  ["X username:", "xUsername"],
  ["Telegram username:", "tgUsername"],
  ["Proof of work link:", "powLink"],
];

/**
 * Parse Join The Hive block from decoded plain-text email body.
 * @param {string} text
 * @returns {Record<string, string>|null}
 */
export function parseJoinHiveFieldsFromEmailText(text) {
  if (!text || typeof text !== "string") return null;
  const normalized = text.replace(/\r\n/g, "\n");
  if (!/(?:^|\n)Name:\s*/m.test(normalized)) return null;
  const lines = normalized.split("\n");
  /** @type {Record<string, string>} */
  const out = {};
  let currentKey = null;

  for (const raw of lines) {
    const line = raw.trimEnd();
    let hit = false;
    for (const [prefix, key] of JOIN_LABELS) {
      if (line.startsWith(prefix)) {
        currentKey = key;
        out[key] = line.slice(prefix.length).trim();
        hit = true;
        break;
      }
    }
    if (hit) continue;
    if (line.startsWith("Email sent via")) break;
    if (currentKey && line.trim() && !line.startsWith("[")) {
      out[currentKey] = `${out[currentKey] || ""} ${line.trim()}`.trim();
    }
  }
  return out.name ? out : null;
}

/**
 * Engage template: body after "You got a new message from …:" until EmailJS footer.
 * @param {string} text
 */
export function parseEngageMessageFromEmailText(text) {
  if (!text || typeof text !== "string") return "";
  const normalized = text.replace(/\r\n/g, "\n");
  const m = normalized.match(
    /You got a new message from\s*[^:]+:\s*\n+([\s\S]*?)(?=\n+Email sent via|\n*$)/i
  );
  return m ? m[1].trim() : normalized.trim();
}

export function parseEngageSenderFromEmailText(text) {
  if (!text || typeof text !== "string") return "Anonymous listener";
  const m = text.replace(/\r\n/g, "\n").match(/You got a new message from\s*([^:\n]+)\s*:/i);
  return m ? m[1].trim().replace(/=\s*\n\s*/g, "") : "Anonymous listener";
}

/**
 * @param {object} p
 * @param {string} p.submittedAt ISO string
 * @param {string} p.subject
 * @param {string} [p.messageId]
 * @param {Record<string, string>} fields from parseJoinHiveFieldsFromEmailText or form data
 */
export function rowFromJoinTheHive({ submittedAt, subject, messageId = "", fields }) {
  return [
    sanitizeSheetsCell(submittedAt),
    sanitizeSheetsCell("join_the_hive"),
    sanitizeSheetsCell(subject || ""),
    sanitizeSheetsCell(messageId || ""),
    sanitizeSheetsCell(fields.name || ""),
    sanitizeSheetsCell(fields.nickname || ""),
    sanitizeSheetsCell(fields.email || ""),
    sanitizeSheetsCell(fields.phone || ""),
    sanitizeSheetsCell(fields.positions || ""),
    sanitizeSheetsCell(fields.xUsername || ""),
    sanitizeSheetsCell(fields.tgUsername || ""),
    sanitizeSheetsCell(fields.powLink || ""),
    "",
  ];
}

/**
 * @param {object} p
 * @param {string} p.submittedAt
 * @param {string} p.message
 * @param {string} [p.fromName]
 * @param {string} [p.subject] email subject when importing from mbox
 */
export function rowFromEngage({
  submittedAt,
  message,
  fromName = "Anonymous listener",
  subject,
}) {
  return [
    sanitizeSheetsCell(submittedAt),
    sanitizeSheetsCell("engage"),
    sanitizeSheetsCell(subject || "Engage With Us"),
    "",
    sanitizeSheetsCell(fromName),
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    sanitizeSheetsCell(message || ""),
  ];
}

/**
 * Map join form POST body to sheet row (live submission).
 * @param {object} data
 */
export function rowFromJoinTheHiveFormData(data) {
  const positionLabels = {
    graphic_designer: "Graphic Designer",
    social_media_x: "Social Media Manager (X)",
    telegram_moderator: "Telegram Moderator",
    community_manager: "Community Manager",
    youtube_handler: "YouTube Handler",
    content_writer: "Content Writer",
    video_content_creator: "Video Content Creator",
  };
  const positionsText = (data.positions || [])
    .map((id) => positionLabels[id] || id)
    .join(", ");
  const submittedAt = data.submittedAt || new Date().toISOString();
  return rowFromJoinTheHive({
    submittedAt,
    subject: "New application from Join The Hive form (web)",
    messageId: data.messageId || "",
    fields: {
      name: data.name,
      nickname: data.nickname || "",
      email: data.email,
      phone: data.phone,
      positions: positionsText,
      xUsername: data.xUsername,
      tgUsername: data.tgUsername,
      powLink: data.powLink,
    },
  });
}
