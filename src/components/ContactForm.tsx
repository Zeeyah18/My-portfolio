"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="contact-form-card">
      <div className="contact-form-header">
        <span className="eyebrow">DROP A NOTE</span>
        <h3>Send a message</h3>
      </div>

      {status === "success" ? (
        <div className="contact-form-success">
          <CheckCircle2 size={32} className="success-icon" />
          <h4>Message sent!</h4>
          <p>Thank you for reaching out. I&apos;ll get back to you as soon as possible.</p>
          <button
            type="button"
            className="button-secondary"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          {status === "error" && (
            <div className="contact-form-error" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === "submitting"}
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === "submitting"}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder="Tell me about your project, idea, or questions..."
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === "submitting"}
            />
          </div>

          <button
            type="submit"
            className="contact-submit-btn"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send message <ArrowUpRight size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

