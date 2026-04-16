import { NextResponse } from "next/server";
import {
  appendFormSubmissionRows,
  rowFromEngage,
  rowFromJoinTheHiveFormData,
} from "../../../lib/formSubmissionSheet.js";

export const runtime = "nodejs";

function jsonError(message, status) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

/**
 * POST { type: "join_the_hive" | "engage", payload: object }
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON", 400);
  }

  const type = body?.type;
  const payload = body?.payload;
  if (!type || !payload || typeof payload !== "object") {
    return jsonError("Expected { type, payload }", 400);
  }

  try {
    if (type === "join_the_hive") {
      const required = ["name", "email", "phone", "xUsername", "tgUsername", "powLink", "positions"];
      for (const k of required) {
        if (payload[k] == null || (Array.isArray(payload[k]) && !payload[k].length)) {
          return jsonError(`Missing or empty field: ${k}`, 400);
        }
      }
      const row = rowFromJoinTheHiveFormData({
        name: String(payload.name).trim(),
        nickname: payload.nickname != null ? String(payload.nickname).trim() : "",
        email: String(payload.email).trim(),
        phone: String(payload.phone).trim(),
        positions: payload.positions,
        xUsername: String(payload.xUsername).trim(),
        tgUsername: String(payload.tgUsername).trim(),
        powLink: String(payload.powLink).trim(),
        submittedAt: payload.submittedAt,
      });
      await appendFormSubmissionRows([row]);
      return NextResponse.json({ ok: true });
    }

    if (type === "engage") {
      const msg = payload.message != null ? String(payload.message).trim() : "";
      if (!msg) return jsonError("Missing message", 400);
      const row = rowFromEngage({
        submittedAt: payload.submittedAt || new Date().toISOString(),
        message: msg,
        fromName: payload.fromName ? String(payload.fromName).trim() : undefined,
      });
      await appendFormSubmissionRows([row]);
      return NextResponse.json({ ok: true });
    }

    return jsonError("Unknown type", 400);
  } catch (e) {
    console.error("log-form-submission:", e);
    const msg =
      process.env.NODE_ENV === "development"
        ? e instanceof Error
          ? e.message
          : String(e)
        : "Sheet logging failed";
    return jsonError(msg, 500);
  }
}
