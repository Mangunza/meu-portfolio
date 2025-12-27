import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });

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

    if (!name || !email || !message || !recaptchaToken)
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ error: "Email inválido" });

    // 1️⃣ Verifica ReCAPTCHA
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: "POST" }
    );
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || (recaptchaData.score !== undefined && recaptchaData.score < 0.5))
      return res.status(400).json({ error: "Falha na validação do reCAPTCHA" });

    // 2️⃣ Envia Email
    const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: { from_name: name, from_email: email, message },
      }),
    });

    if (!emailResponse.ok) return res.status(500).json({ error: "Erro ao enviar email" });

    // 3️⃣ Salva no banco SQL
    const trackingId = uuidv4();
    const connection = await mysql.createConnection({
      host: SQL_HOST,
      user: SQL_USER,
      password: SQL_PASSWORD,
      database: SQL_DATABASE,
    });

    const query = `
      INSERT INTO messages (tracking_id, name, email, message, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;

    await connection.execute(query, [trackingId, name, email, message]);
    await connection.end();

    res.status(200).json({ success: true, trackingId });
  } catch (err) {
    console.error("Erro:", err);
    res.status(500).json({ error: "Erro interno", details: err.message });
  }
}
