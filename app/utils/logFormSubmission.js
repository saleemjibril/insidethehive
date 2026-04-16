/**
 * Logs form payloads to Google Sheets via the server route (credentials stay server-side).
 * Failures are non-fatal for the user flow; errors are logged to the console.
 */

async function postLog(type, payload) {
  const res = await fetch("/api/log-form-submission", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, payload }),
  });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const j = await res.json();
      if (j?.error) detail = j.error;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }
}

/**
 * @param {object} data same shape as sendJoinTheHiveApplication
 */
export function logJoinTheHiveSubmission(data) {
  postLog("join_the_hive", {
    name: data.name,
    nickname: data.nickname,
    email: data.email,
    phone: data.phone,
    positions: data.positions,
    xUsername: data.xUsername,
    tgUsername: data.tgUsername,
    powLink: data.powLink,
    submittedAt: new Date().toISOString(),
  }).catch((err) => {
    console.warn("[logFormSubmission] join_the_hive:", err);
  });
}

/**
 * @param {object} p
 * @param {string} p.message
 */
export function logEngageSubmission({ message }) {
  postLog("engage", {
    message,
    fromName: "Anonymous listener",
    submittedAt: new Date().toISOString(),
  }).catch((err) => {
    console.warn("[logFormSubmission] engage:", err);
  });
}
