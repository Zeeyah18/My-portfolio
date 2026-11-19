"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Loader2, Link2, X, CheckCircle, AlertCircle } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  helperText?: string;
  aspectRatio?: string;
}

export function ImageUploader({
  value,
  onChange,
  folder = "portfolio",
  label = "Image",
  helperText = "Upload via Cloudinary or paste a direct image URL",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showDirectInput, setShowDirectInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload to Cloudinary");
      }

      onChange(data.url);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Upload to Cloudinary failed"
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const isCloudinaryUrl = value.includes("cloudinary.com");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase text-foreground">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowDirectInput(!showDirectInput)}
          className="text-[11px] text-primary hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Link2 size={12} />
          <span>{showDirectInput ? "Hide Direct URL" : "Edit Direct URL"}</span>
        </button>
      </div>

      {/* Upload action area */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={handleFileSelect}
        />

        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-medium text-xs rounded-md flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>Uploading to Cloudinary...</span>
            </>
          ) : (
            <>
              <UploadCloud size={14} />
              <span>Upload to Cloudinary</span>
            </>
          )}
        </button>

        {isCloudinaryUrl && (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1">
            <CheckCircle size={10} /> Cloudinary Hosted
          </span>
        )}

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-muted-foreground hover:text-red-500 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <X size={12} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {uploadSuccess && (
        <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle size={14} />
          <span>Uploaded successfully to Cloudinary!</span>
        </div>
      )}

      {uploadError && (
        <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 text-xs flex items-start gap-2">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="font-semibold">Upload failed</p>
            <p className="text-[11px] opacity-90">{uploadError}</p>
          </div>
        </div>
      )}

      {/* Direct text input (shown if toggled, if empty, or if an upload error occurred) */}
      {(showDirectInput || !value || Boolean(uploadError)) && (
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://res.cloudinary.com/... or /assets/portfolio-portrait.png"
            className="w-full px-3 py-2 text-xs bg-background border border-border rounded-md focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      )}

      <p className="text-[11px] text-muted-foreground">{helperText}</p>
    </div>
  );
}
