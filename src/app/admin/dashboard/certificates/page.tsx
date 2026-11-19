"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Award, Plus, Trash2, Edit2, Loader2, CheckCircle2, ArrowLeft, X, Save, ExternalLink, ImageIcon } from "lucide-react";
import { Certificate } from "@/types/portfolio";
import { ImageUploader } from "@/components/ui/image-uploader";

export default function AdminCertificatesPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [aboutCertificate, setAboutCertificate] = useState("");
    const [year, setYear] = useState("2025");
    const [imageUrl, setImageUrl] = useState("");
    const [iconName, setIconName] = useState("Award");
    const [displayOrder, setDisplayOrder] = useState<number>(1);
    const [submitting, setSubmitting] = useState(false);

    const loadCertificates = async () => {
        try {
            const res = await fetch("/api/certificates");
            const data = await res.json();
            setCertificates(Array.isArray(data) ? data : []);
        } catch {
            setError("Failed to load certificates");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCertificates();
    }, []);

    const openAddModal = () => {
        setEditingId(null);
        setTitle("");
        setAboutCertificate("");
        setYear("2025");
        setImageUrl("");
        setIconName("Award");
        setDisplayOrder(certificates.length + 1);
        setShowForm(true);
        setError("");
    };

    const openEditModal = (cert: Certificate) => {
        setEditingId(cert.id);
        setTitle(cert.title);
        setAboutCertificate(cert.aboutCertificate || "");
        setYear(cert.year);
        const cleanImageUrl =
            cert.imageUrl &&
            !cert.imageUrl.includes("portfolio-portrait") &&
            !cert.imageUrl.includes("abigail-portrait")
                ? cert.imageUrl
                : "";
        setImageUrl(cleanImageUrl);
        setIconName(cert.iconName || "Award");
        setDisplayOrder(cert.displayOrder);
        setShowForm(true);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            if (editingId) {
                const res = await fetch("/api/certificates", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: editingId, title, aboutCertificate, year, imageUrl, iconName, displayOrder }),
                });
                if (!res.ok) throw new Error("Failed to update certificate");
                setSuccess("Certificate updated successfully!");
            } else {
                const res = await fetch("/api/certificates", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title, aboutCertificate, year, imageUrl, iconName, displayOrder }),
                });
                if (!res.ok) throw new Error("Failed to create certificate");
                setSuccess("Certificate created successfully!");
            }

            setShowForm(false);
            loadCertificates();
            setTimeout(() => setSuccess(""), 3500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error saving certificate");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this certificate?")) return;
        try {
            const res = await fetch(`/api/certificates?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete certificate");
            setSuccess("Certificate deleted successfully");
            loadCertificates();
            setTimeout(() => setSuccess(""), 3500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error deleting certificate");
        }
    };

    if (loading) {
        return (
            <div className="py-24 flex items-center justify-center">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Loader2 className="animate-spin text-primary" size={20} />
                    <span>Loading certificates...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/dashboard"
                        className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Manage Certificates</h1>
                        <p className="text-xs text-muted-foreground">Showcase course completions, degrees, and industry certifications.</p>
                    </div>
                </div>

                <button
                    onClick={openAddModal}
                    className="px-4 py-2 bg-primary text-primary-foreground font-semibold text-xs rounded-md flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer shadow-xs self-start sm:self-auto"
                >
                    <Plus size={15} />
                    <span>Add Certificate</span>
                </button>
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

            {/* Form Drawer */}
            {showForm && (
                <div className="p-6 bg-card border border-primary/30 rounded-xl shadow-md">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                        <h2 className="text-base font-bold text-foreground">
                            {editingId ? "Edit Certificate" : "Add Certificate"}
                        </h2>
                        <button
                            onClick={() => setShowForm(false)}
                            className="text-muted-foreground hover:text-foreground p-1"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                                    Certificate Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Introduction to Front-End Development"
                                    className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                                    Year Issued
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    placeholder="2025"
                                    className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                                    Icon Name
                                </label>
                                <select
                                    value={iconName}
                                    onChange={(e) => setIconName(e.target.value)}
                                    className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                                >
                                    <option value="Award">Award</option>
                                    <option value="Braces">Braces</option>
                                    <option value="Gem">Gem</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    value={displayOrder}
                                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                                    className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                                />
                            </div>
                        </div>

                        <ImageUploader
                            value={imageUrl}
                            onChange={(url) => setImageUrl(url)}
                            folder="portfolio/certificates"
                            label="Certificate Badge / Image (Cloudinary or URL)"
                            helperText="Upload a certificate badge or image to Cloudinary, or enter an image URL."
                        />

                        <div>
                            <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                                About the Certificate &amp; Skills Covered
                            </label>
                            <textarea
                                rows={3}
                                required
                                value={aboutCertificate}
                                onChange={(e) => setAboutCertificate(e.target.value)}
                                placeholder="Mastered responsive page layouts, DOM manipulation, Git version control..."
                                className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 border border-border text-foreground text-xs font-semibold rounded-md hover:bg-muted"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-5 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-md flex items-center gap-1.5 hover:opacity-90 disabled:opacity-50"
                            >
                                {submitting ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                                <span>{editingId ? "Update Certificate" : "Save Certificate"}</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Certificates Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                    <div
                        key={cert.id}
                        className="p-5 bg-card border border-border rounded-xl shadow-xs flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <div>
                                    <span className="text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                                        {cert.year}
                                    </span>
                                    <h3 className="text-base font-bold text-foreground mt-2">{cert.title}</h3>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => openEditModal(cert)}
                                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                                        title="Edit"
                                    >
                                        <Edit2 size={15} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cert.id)}
                                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-500/10 rounded-md"
                                        title="Delete"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>

                            {/* Certificate Image Preview */}
                            {cert.imageUrl &&
                            !cert.imageUrl.includes("portfolio-portrait") &&
                            !cert.imageUrl.includes("abigail-portrait") ? (
                                <div className="mt-3 mb-3 relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border bg-muted/30 group">
                                    <Image
                                        src={cert.imageUrl}
                                        alt={cert.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <a
                                        href={cert.imageUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-2 right-2 px-2.5 py-1 text-[11px] font-semibold bg-black/75 text-white rounded backdrop-blur-xs flex items-center gap-1 hover:bg-black/90 transition-colors shadow-xs"
                                    >
                                        <span>View Full Image</span>
                                        <ExternalLink size={11} />
                                    </a>
                                </div>
                            ) : (
                                <div className="mt-3 mb-3 p-3 rounded-lg border border-dashed border-border/80 text-center text-xs text-muted-foreground flex items-center justify-center gap-2 bg-muted/20">
                                    <ImageIcon size={14} className="opacity-60" />
                                    <span>No certificate badge/image uploaded</span>
                                </div>
                            )}

                            <p className="text-xs text-muted-foreground line-clamp-3 mt-2">{cert.aboutCertificate}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-border/60 text-[11px] text-muted-foreground flex items-center justify-between">
                            <span>Icon: {cert.iconName} &middot; Order: #{cert.displayOrder}</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold">Verified</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
