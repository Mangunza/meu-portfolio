export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { RECAPTCHA_SECRET_KEY } = process.env;
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token é obrigatório" });
    }

    const googleRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: "POST" }
    );

    const data = await googleRes.json();

    if (!data.success || (data.score !== undefined && data.score < 0.5)) {
      return res.status(400).json({ error: "Falha no reCAPTCHA" });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erro verify-captcha:", err);
    res.status(500).json({ error: "Erro interno", details: err.message });
  }
}
