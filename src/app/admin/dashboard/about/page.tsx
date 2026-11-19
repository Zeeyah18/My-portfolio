"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Loader2, CheckCircle2, ArrowLeft, RefreshCw } from "lucide-react";
import portrait from "@/assets/portfolio-portrait.png";
import { ImageUploader } from "@/components/ui/image-uploader";

export default function AdminAboutPage() {
    const [firstDescription, setFirstDescription] = useState("");
    const [secondDescription, setSecondDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadAbout() {
            try {
                const res = await fetch("/api/about");
                const data = await res.json();
                setFirstDescription(data.firstDescription || "");
                setSecondDescription(data.secondDescription || "");
                setImageUrl(data.imageUrl || "");
                setImageAlt(data.imageAlt || "");
            } catch (err) {
                setError("Failed to load about section data");
            } finally {
                setLoading(false);
            }
        }
        loadAbout();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSaved(false);
        setError("");

        try {
            const res = await fetch("/api/about", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstDescription,
                    secondDescription,
                    imageUrl,
                    imageAlt,
                }),
            });

            if (!res.ok) {
                const d = await res.json();
                throw new Error(d.error || "Failed to update about section");
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 3500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error saving about section");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="py-24 flex items-center justify-center">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Loader2 className="animate-spin text-primary" size={20} />
                    <span>Loading about settings...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/dashboard"
                        className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Manage About Me Section</h1>
                        <p className="text-xs text-muted-foreground">Edit biography text paragraphs and secondary about photo.</p>
                    </div>
                </div>
            </div>

            {saved && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>About section updated successfully in database!</span>
                </div>
            )}

            {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 text-xs font-semibold">
                    {error}
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-6 bg-card border border-border rounded-xl p-6 shadow-xs">
                <div className="grid md:grid-cols-3 gap-6 items-start">
                    {/* Photo Preview */}
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-bold uppercase text-muted-foreground mb-3 self-start">About Photo Preview</span>
                        <div className="w-full max-w-[240px] aspect-[4/3] relative border border-border rounded-lg overflow-hidden bg-muted/40 shadow-inner">
                            <Image
                                src={imageUrl || portrait}
                                alt={imageAlt || "About photo preview"}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    </div>

                    {/* Photo inputs */}
                    <div className="md:col-span-2 space-y-4">
                        <ImageUploader
                            value={imageUrl}
                            onChange={(url) => setImageUrl(url)}
                            folder="portfolio/about"
                            label="About Photo (Cloudinary or URL)"
                            helperText="Upload a photo to Cloudinary or enter an image URL / local path."
                        />

                        <div>
                            <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                                Photo Alt Description
                            </label>
                            <input
                                type="text"
                                value={imageAlt}
                                onChange={(e) => setImageAlt(e.target.value)}
                                placeholder="About photo of Abigail coding and designing"
                                className="w-full px-3.5 py-2.5 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-4 pt-4 border-t border-border">
                    <div>
                        <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                            First Biography Paragraph
                        </label>
                        <textarea
                            rows={4}
                            required
                            value={firstDescription}
                            onChange={(e) => setFirstDescription(e.target.value)}
                            placeholder="I'm a Information Technology student fascinated by..."
                            className="w-full px-3.5 py-2.5 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none transition-colors"
                        />
                        <p className="text-[11px] text-muted-foreground mt-1">
                            Highlighted in the upper portion of the About section.
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                            Second Biography Paragraph
                        </label>
                        <textarea
                            rows={4}
                            required
                            value={secondDescription}
                            onChange={(e) => setSecondDescription(e.target.value)}
                            placeholder="Between classes, you'll find me exploring frontend development..."
                            className="w-full px-3.5 py-2.5 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none transition-colors"
                        />
                    </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-md flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer shadow-xs"
                    >
                        {saving ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                        <span>{saving ? "Saving changes..." : "Save About Section"}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
