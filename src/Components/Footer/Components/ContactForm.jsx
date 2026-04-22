import React, { useState } from "react";
import DOMPurify from "dompurify";
import ReCAPTCHA from "react-google-recaptcha";
import "./contactform.sass";

const MAX_NAME = 50;
const MAX_EMAIL = 100;
const MAX_MSG = 1000;

export default function ContactForm({ recaptchaRef, showModal }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  //  By johnnydurao1802@gmail.com
  const sanitize = (value, max) =>
    DOMPurify.sanitize(
      String(value || "")
        .trim()
        .slice(0, max),
      { USE_PROFILES: { html: false } }
    );

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const safeData = {
        name: sanitize(form.name, MAX_NAME),
        email: sanitize(form.email, MAX_EMAIL),
        message: sanitize(form.message, MAX_MSG),
      };

      // Validação
      if (!safeData.name || !safeData.email || !safeData.message) {
        showModal("Preencha todos os campos ❌", "warning");
        setLoading(false);
        return;
      }
      if (!validateEmail(safeData.email)) {
        showModal("Email inválido ❌", "error");
        setLoading(false);
        return;
      }

      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      // Envia para serverless
      const res = await fetch("/api/send-email-sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...safeData, recaptchaToken: token }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao enviar ❌");

      showModal(
        `Mensagem enviada! ✅ Tracking ID: ${data.trackingId}`,
        "success"
      );
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      showModal(err.message || "Erro no servidor ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* ========================= */}
      {/* SEÇÃO: IDENTIFICAÇÃO */}
      {/* ========================= */}
      <fieldset>
        <legend>Identificação</legend>

        <div className="form-group">
          <label htmlFor="name" className="sr-only">
            Nome completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Seu Nome"
            value={form.name}
            onChange={handleChange}
            maxLength={MAX_NAME}
            required
            autoComplete="name"
          />
          <small>
            {form.name.length}/{MAX_NAME}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="sr-only">
            Endereço de e-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Seu Email"
            value={form.email}
            onChange={handleChange}
            maxLength={MAX_EMAIL}
            required
            autoComplete="email"
          />
          <small>
            {form.email.length}/{MAX_EMAIL}
          </small>
        </div>
      </fieldset>

      {/* ========================= */}
      {/* SEÇÃO: MENSAGEM */}
      {/* ========================= */}
      <fieldset>
        <legend>Mensagem</legend>

        <div className="form-group">
          <label htmlFor="message" className="sr-only">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Sua Mensagem..."
            rows={5}
            value={form.message}
            onChange={handleChange}
            maxLength={MAX_MSG}
            required
          />
          <small>
            {form.message.length}/{MAX_MSG}
          </small>
        </div>
      </fieldset>

      {/* ========================= */}
      {/* ENVIO */}
      {/* ========================= */}
      <button
        type="submit"
        className="button-glass"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? <div className="spinner"></div> : "Enviar Mensagem"}
      </button>

      <div className="recaptcha-container">
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          size="invisible"
          ref={recaptchaRef}
        />
      </div>
    </form>
  );
}
