"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, CheckCircle2, ArrowLeft, RefreshCw, Sparkles } from "lucide-react";
import portrait from "@/assets/portfolio-portrait.png";
import { ImageUploader } from "@/components/ui/image-uploader";

export default function AdminHeroPage() {
    const [imageUrl, setImageUrl] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [headline, setHeadline] = useState("");
    const [subheadline, setSubheadline] = useState("");
    const [description, setDescription] = useState("");
    const [badgeText, setBadgeText] = useState("");
    const [noteText, setNoteText] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadHero() {
            try {
                const res = await fetch("/api/hero");
                const data = await res.json();
                setImageUrl(data.imageUrl || "");
                setImageAlt(data.imageAlt || "");
                setHeadline(data.headline || "");
                setSubheadline(data.subheadline || "");
                setDescription(data.description || "");
                setBadgeText(data.badgeText || "");
                setNoteText(data.noteText || "");
            } catch (err) {
                setError("Failed to load hero section data");
            } finally {
                setLoading(false);
            }
        }
        loadHero();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSaved(false);
        setError("");

        try {
            const res = await fetch("/api/hero", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    imageUrl,
                    imageAlt,
                    headline,
                    subheadline,
                    description,
                    badgeText,
                    noteText,
                }),
            });

            if (!res.ok) {
                const d = await res.json();
                throw new Error(d.error || "Failed to update hero section");
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 3500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error saving hero");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="py-24 flex items-center justify-center">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Loader2 className="animate-spin text-primary" size={20} />
                    <span>Loading hero settings...</span>
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
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Manage Hero Section</h1>
                        <p className="text-xs text-muted-foreground">Customize your headline, bio description, portrait photo, and badges.</p>
                    </div>
                </div>
            </div>

            {saved && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Hero section saved successfully to database!</span>
                </div>
            )}

            {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 text-xs font-semibold">
                    {error}
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-6 bg-card border border-border rounded-xl p-6 shadow-xs">
                {/* Visual Preview */}
                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold uppercase text-muted-foreground mb-3 self-start">Portrait Preview</span>
                    <div className="w-full max-w-[240px] aspect-[4/5] relative border border-border rounded-lg overflow-hidden bg-muted/40 shadow-inner">
                        <Image
                            src={imageUrl || portrait}
                            alt={imageAlt || "Hero portrait preview"}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <span className="text-[11px] text-muted-foreground mt-2 text-center">
                        Standard aspect ratio: 4:5
                    </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSave} className="md:col-span-2 space-y-5">
                    <ImageUploader
                        value={imageUrl}
                        onChange={(url) => setImageUrl(url)}
                        folder="portfolio/hero"
                        label="Portrait Image (Cloudinary or URL)"
                        helperText="Upload a photo to Cloudinary or enter an image URL / local path."
                    />

                    <div>
                        <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                            Image Alt Description (Accessibility)
                        </label>
                        <input
                            type="text"
                            value={imageAlt}
                            onChange={(e) => setImageAlt(e.target.value)}
                            placeholder="Abigail Ola, a computer science student smiling beside her laptop"
                            className="w-full px-3.5 py-2.5 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none transition-colors"
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border/60">
                        <div>
                            <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                                Main Headline
                            </label>
                            <input
                                type="text"
                                required
                                value={headline}
                                onChange={(e) => setHeadline(e.target.value)}
                                placeholder="Curious mind."
                                className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                                Sub Headline (Accent line)
                            </label>
                            <input
                                type="text"
                                required
                                value={subheadline}
                                onChange={(e) => setSubheadline(e.target.value)}
                                placeholder="Thoughtful code."
                                className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                            Hero Bio / Introduction
                        </label>
                        <textarea
                            rows={3}
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Hi, I'm Abigail — a computer science student who loves turning big ideas into simple, human-centered digital experiences."
                            className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none transition-colors"
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                                Portrait Stamp Badge Text
                            </label>
                            <input
                                type="text"
                                value={badgeText}
                                onChange={(e) => setBadgeText(e.target.value)}
                                placeholder="BUILDING WITH CURIOSITY"
                                className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                                Floating Note Text
                            </label>
                            <input
                                type="text"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                placeholder="A little bit of logic,\na lot of heart."
                                className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none transition-colors"
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
                            <span>{saving ? "Saving changes..." : "Save Hero Section"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
