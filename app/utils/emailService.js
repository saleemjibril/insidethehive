import emailjs from '@emailjs/browser';

// Initialize EmailJS with your user ID
emailjs.init("7douQQjyL4C_fcbrJ");

/** Inbox for Join The Hive applications (EmailJS template should deliver here). */
export const JOIN_THE_HIVE_INBOX = "insidethehivepod@gmail.com";

export const sendEmail = async (templateParams) => {
  console.log("templateParams", templateParams);

  try {
    const result = await emailjs.send(
      "service_dgb98ih",
      "template_2jtygxm",
      templateParams
    );
    console.log("Email sent successfully", result.text);
    return result;
  } catch (error) {
    console.error("Failed to send email", error);
    throw error;
  }
};

/**
 * Build EmailJS template params for Join The Hive form (matches engage.jsx field names).
 * @param {object} data
 */
export function buildJoinTheHiveTemplateParams(data) {
  const positionLabels = {
    graphic_designer: "Graphic Designer",
    social_media_x: "Social Media Manager (X)",
    telegram_moderator: "Telegram Moderator",
    community_manager: "Community Manager",
    youtube_handler: "YouTube Handler",
    content_writer: "Content Writer",
  };
  const positionsText = (data.positions || [])
    .map((id) => positionLabels[id] || id)
    .join(", ");

  const message = [
    "Join The Hive — new application",
    "",
    `Name: ${data.name}`,
    `Nickname: ${data.nickname || "—"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Position(s): ${positionsText || "—"}`,
    `X username: ${data.xUsername}`,
    `Telegram username: ${data.tgUsername}`,
    `Proof of work link: ${data.powLink}`,
  ].join("\n");

  return {
    from_name: data.name,
    message,
    reply_to: data.email,
    email: JOIN_THE_HIVE_INBOX,
  };
}

export async function sendJoinTheHiveApplication(data) {
  return sendEmail(buildJoinTheHiveTemplateParams(data));
}