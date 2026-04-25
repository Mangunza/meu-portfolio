import React, { useState } from "react";
import DOMPurify from "dompurify";
import ReCAPTCHA from "react-google-recaptcha";
import "./contactform.sass";

const MAX_NAME = 50;
const MAX_EMAIL = 100;
const MAX_MSG = 1000;

export default function ContactForm({ recaptchaRef, showModal }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const sanitize = (value, max) =>
    DOMPurify.sanitize(String(value || "").trim().slice(0, max), {
      USE_PROFILES: { html: false },
    });

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const safeData = {
      name: sanitize(form.name, MAX_NAME),
      email: sanitize(form.email, MAX_EMAIL),
      message: sanitize(form.message, MAX_MSG),
    };

    const newErrors = {};

    if (!safeData.name) newErrors.name = "Nome obrigatório";
    if (!safeData.email) newErrors.email = "Email obrigatório";
    if (!safeData.message) newErrors.message = "Mensagem obrigatória";
    if (safeData.email && !validateEmail(safeData.email))
      newErrors.email = "Email inválido";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showModal("Corrige os campos ❌", "warning");
      setLoading(false);
      return;
    }

    try {
      const token = await recaptchaRef.current.executeAsync();

      if (!token) throw new Error("reCAPTCHA falhou");

      recaptchaRef.current.reset();

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...safeData,
          recaptchaToken: token,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      showModal("Mensagem enviada com sucesso ✅", "success");

      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      showModal(err.message || "Erro no servidor ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-wrapper">
      {loading && (
        <div className="form-loading-overlay active">
          <div className="spinner"></div>
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>Identificação</legend>

          <input
            className={errors.name ? "invalid" : ""}
            name="name"
            placeholder="Seu Nome"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <small>{errors.name}</small>}

          <input
            className={errors.email ? "invalid" : ""}
            name="email"
            placeholder="Seu Email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <small>{errors.email}</small>}
        </fieldset>

        <fieldset>
          <legend>Mensagem</legend>

          <textarea
            className={errors.message ? "invalid" : ""}
            name="message"
            placeholder="Sua Mensagem..."
            value={form.message}
            onChange={handleChange}
          />
          {errors.message && <small>{errors.message}</small>}
        </fieldset>

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Mensagem"}
        </button>

        {/* escondido corretamente */}
        <div className="recaptcha-hidden">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            size="invisible"
            ref={recaptchaRef}
          />
        </div>
      </form>
    </div>
  );
}