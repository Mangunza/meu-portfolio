export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Método não permitido" });
  }

  const { name, email, message, recaptchaToken } = req.body;

  try {
    // Validar reCAPTCHA server-side
    const secret = process.env.RECAPTCHA_SECRET;
    const recaptchaURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`;

    const recaptchaRes = await fetch(recaptchaURL, { method: "POST" });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return res.status(400).json({ success: false, error: "Falha no reCAPTCHA" });
    }

    // Enviar email via EmailJS Server API (se quiser posso adicionar)
    // ou qualquer outro serviço

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Erro interno" });
  }
}
