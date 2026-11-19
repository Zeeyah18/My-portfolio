"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, Loader2, Trash2, Upload } from "lucide-react";
import type { ResumeMeta } from "@/types/portfolio";

export default function AdminResumePage() {
  const [resume, setResume] = useState<ResumeMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadResume() {
      try {
        const res = await fetch("/api/resume?meta=1", { cache: "no-store" });
        const data = await res.json();
        setResume(data.resume ?? null);
      } catch {
        setError("Failed to load the current resume.");
      } finally {
        setLoading(false);
      }
    }
    loadResume();
  }, []);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError("");
    setSaved("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/resume", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setResume(data.resume);
      setSaved("Resume updated. The live site will show this PDF.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    setError("");
    setSaved("");
    try {
      const res = await fetch("/api/resume", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not remove resume");
      setResume(null);
      setSaved("Resume removed from the site.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove resume");
    } finally {
      setRemoving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <Loader2 className="animate-spin text-primary" size={20} />
          <span>Loading resume...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/dashboard"
          className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Resume</h1>
          <p className="text-xs text-muted-foreground">
            Upload a PDF. Uploading again replaces the resume on the public site.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{saved}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-semibold">
          {error}
        </div>
      )}

      <div className="bg-card border border-border rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-md bg-primary/10 text-primary p-2">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {resume ? resume.filename : "No resume uploaded"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {resume
                  ? `Last updated ${new Date(resume.updatedAt).toLocaleString()}`
                  : "PDF only, up to 8MB."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) handleUpload(file);
              }}
            />
            <button
              type="button"
              disabled={uploading || removing}
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-2 hover:opacity-90 disabled:opacity-50 cursor-pointer"
            >
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              {resume ? "Replace PDF" : "Upload PDF"}
            </button>
            {resume && (
              <button
                type="button"
                disabled={uploading || removing}
                onClick={handleRemove}
                className="px-3 py-2.5 rounded-lg border border-red-500/30 text-red-600 text-xs font-semibold flex items-center gap-1.5 hover:bg-red-500/10 disabled:opacity-50 cursor-pointer"
              >
                {removing ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Remove
              </button>
            )}
          </div>
        </div>

        {resume ? (
          <iframe
            title="Current resume"
            src={resume.url}
            className="w-full h-[70vh] min-h-[420px] rounded-lg border border-border bg-white"
          />
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-muted/30 px-6 py-16 text-center text-sm text-muted-foreground">
            The public Resume button will show this PDF after you upload one.
          </div>
        )}
      </div>
    </div>
  );
}
