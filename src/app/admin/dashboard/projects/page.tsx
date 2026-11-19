"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FolderGit2, Plus, Trash2, Edit2, Loader2, CheckCircle2, ArrowLeft, X, Save } from "lucide-react";
import { Project } from "@/types/portfolio";
import { ImageUploader } from "@/components/ui/image-uploader";

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [displayOrder, setDisplayOrder] = useState<number>(1);
    const [submitting, setSubmitting] = useState(false);

    const loadProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(Array.isArray(data) ? data : []);
        } catch {
            setError("Failed to load projects list");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const openAddModal = () => {
        setEditingId(null);
        setName("");
        setDescription("");
        setImageUrl("");
        setLiveUrl("");
        setGithubUrl("");
        setDisplayOrder(projects.length + 1);
        setShowForm(true);
        setError("");
    };

    const openEditModal = (proj: Project) => {
        setEditingId(proj.id);
        setName(proj.name);
        setDescription(proj.description);
        setImageUrl(proj.imageUrl || "");
        setLiveUrl(proj.liveUrl || "");
        setGithubUrl(proj.githubUrl || "");
        setDisplayOrder(proj.displayOrder);
        setShowForm(true);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            if (editingId) {
                const res = await fetch("/api/projects", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: editingId, name, description, imageUrl, liveUrl, githubUrl, displayOrder }),
                });
                if (!res.ok) throw new Error("Failed to update project");
                setSuccess("Project updated successfully!");
            } else {
                const res = await fetch("/api/projects", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, description, imageUrl, liveUrl, githubUrl, displayOrder }),
                });
                if (!res.ok) throw new Error("Failed to create project");
                setSuccess("Project created successfully!");
            }

            setShowForm(false);
            loadProjects();
            setTimeout(() => setSuccess(""), 3500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error saving project");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete project");
            setSuccess("Project deleted successfully");
            loadProjects();
            setTimeout(() => setSuccess(""), 3500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error deleting project");
        }
    };

    if (loading) {
        return (
            <div className="py-24 flex items-center justify-center">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Loader2 className="animate-spin text-primary" size={20} />
                    <span>Loading projects...</span>
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
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Manage Projects</h1>
                        <p className="text-xs text-muted-foreground">Add and curate projects displayed on the portfolio showcase.</p>
                    </div>
                </div>

                <button
                    onClick={openAddModal}
                    className="px-4 py-2 bg-primary text-primary-foreground font-semibold text-xs rounded-md flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer shadow-xs self-start sm:self-auto"
                >
                    <Plus size={15} />
                    <span>Add New Project</span>
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
                            {editingId ? "Edit Project" : "Add New Project"}
                        </h2>
                        <button
                            onClick={() => setShowForm(false)}
                            className="text-muted-foreground hover:text-foreground p-1"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Bloom & Balance"
                                    className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                                />
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
                            folder="portfolio/projects"
                            label="Project Preview Image (Cloudinary or URL)"
                            helperText="Upload a screenshot to Cloudinary or enter an image URL / local path."
                        />

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                                    Live Demo URL
                                </label>
                                <input
                                    type="url"
                                    value={liveUrl}
                                    onChange={(e) => setLiveUrl(e.target.value)}
                                    placeholder="https://my-app.vercel.app"
                                    className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                                    GitHub Repository URL
                                </label>
                                <input
                                    type="url"
                                    value={githubUrl}
                                    onChange={(e) => setGithubUrl(e.target.value)}
                                    placeholder="https://github.com/username/project"
                                    className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                                Description &amp; Highlights
                            </label>
                            <textarea
                                rows={3}
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="A calm, accessible habit tracker designed to make everyday wellbeing..."
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
                                <span>{editingId ? "Update Project" : "Save Project"}</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Projects Grid / List */}
            <div className="grid md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                    <div
                        key={proj.id}
                        className="p-5 bg-card border border-border rounded-xl shadow-xs flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <div>
                                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                                        Order #{proj.displayOrder}
                                    </span>
                                    <h3 className="text-base font-bold text-foreground mt-0.5">{proj.name}</h3>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => openEditModal(proj)}
                                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                                        title="Edit"
                                    >
                                        <Edit2 size={15} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(proj.id)}
                                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-500/10 rounded-md"
                                        title="Delete"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-xs text-muted-foreground line-clamp-3 mt-2">{proj.description}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-border/60 text-[11px] text-muted-foreground flex items-center justify-between">
                            <span>Image: {proj.imageUrl ? proj.imageUrl.slice(0, 30) + "..." : "Default"}</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold">Active</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
