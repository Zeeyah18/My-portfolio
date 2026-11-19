"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Trash2, Loader2, CheckCircle2, ArrowLeft, Send } from "lucide-react";
import { ContactMessage } from "@/types/portfolio";

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(Array.isArray(data.messages) ? data.messages : []);
    } catch {
      setError("Failed to load contact messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete message");
      setSuccess("Message deleted successfully");
      loadMessages();
      setTimeout(() => setSuccess(""), 3500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error deleting message");
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <Loader2 className="animate-spin text-primary" size={20} />
          <span>Loading contact inquiries...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Contact Inquiries ({messages.length})</h1>
            <p className="text-xs text-muted-foreground">Messages sent through the portfolio website contact form.</p>
          </div>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 text-xs font-semibold">
          {error}
        </div>
      )}

      {messages.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-border rounded-xl bg-card">
          <Mail className="mx-auto text-muted-foreground mb-2" size={28} />
          <h3 className="text-sm font-bold text-foreground">No messages yet</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
            When visitors submit inquiries through the contact form, they will be listed here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-5 bg-card border border-border rounded-xl shadow-xs hover:border-primary/40 transition-all flex flex-col gap-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">{msg.name}</h3>
                  <a
                    href={`mailto:${msg.email}?subject=Regarding%20your%20portfolio%20inquiry`}
                    className="text-xs text-primary hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <Mail size={12} />
                    <span>{msg.email}</span>
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {new Date(msg.createdAt).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <a
                    href={`mailto:${msg.email}?subject=Re:%20Portfolio%20Inquiry`}
                    className="px-3 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Send size={12} />
                    <span>Reply</span>
                  </a>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-500/10 rounded-md transition-colors"
                    title="Delete message"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed bg-muted/20 p-3 rounded-lg border border-border/40">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
