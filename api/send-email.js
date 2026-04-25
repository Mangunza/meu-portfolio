import { v4 as uuidv4 } from "uuid";
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  let connection;

  try {
    const {
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      EMAILJS_PUBLIC_KEY,
      RECAPTCHA_SECRET_KEY,
      SQL_HOST,
      SQL_USER,
      SQL_PASSWORD,
      SQL_DATABASE,
    } = process.env;

    const { name, email, message, recaptchaToken } = req.body;

    // 🔐 validação env
    if (
      !EMAILJS_SERVICE_ID ||
      !EMAILJS_TEMPLATE_ID ||
      !EMAILJS_PUBLIC_KEY ||
      !RECAPTCHA_SECRET_KEY ||
      !SQL_HOST ||
      !SQL_USER ||
      !SQL_PASSWORD ||
      !SQL_DATABASE
    ) {
      return res.status(500).json({ error: "Configuração incompleta" });
    }

    // 🔐 validação input
    if (!name || !email || !message || !recaptchaToken) {
      return res.status(400).json({ error: "Campos obrigatórios" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    // 🛡 reCAPTCHA
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: "POST" }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return res.status(400).json({ error: "Falha no reCAPTCHA" });
    }

    if (recaptchaData.score !== undefined && recaptchaData.score < 0.5) {
      return res.status(400).json({ error: "Bot detectado" });
    }

    // 📩 EmailJS
    const emailResponse = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: name,
            from_email: email,
            message,
          },
        }),
      }
    );

    if (!emailResponse.ok) {
      return res.status(500).json({ error: "Erro ao enviar email" });
    }

    // 🗄 MySQL
    const trackingId = uuidv4();

    connection = await mysql.createConnection({
      host: SQL_HOST,
      user: SQL_USER,
      password: SQL_PASSWORD,
      database: SQL_DATABASE,
    });

    await connection.execute(
      `INSERT INTO messages (tracking_id, name, email, message, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [trackingId, name, email, message]
    );

    return res.status(200).json({
      success: true,
      trackingId,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Erro interno do servidor",
      details: err.message,
    });

  } finally {
    if (connection) await connection.end();
  }
}