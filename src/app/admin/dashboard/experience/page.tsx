"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Plus, Trash2, Edit2, Loader2, CheckCircle2, ArrowLeft, X, Save } from "lucide-react";
import { Experience } from "@/types/portfolio";

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);

  const loadExperiences = async () => {
    try {
      const res = await fetch("/api/experiences");
      const data = await res.json();
      setExperiences(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load experiences");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setTitle("");
    setOrganization("");
    setPeriod("2025 — PRESENT");
    setDescription("");
    setDisplayOrder(experiences.length + 1);
    setShowForm(true);
    setError("");
  };

  const openEditModal = (exp: Experience) => {
    setEditingId(exp.id);
    setTitle(exp.title);
    setOrganization(exp.organization);
    setPeriod(exp.period);
    setDescription(exp.description);
    setDisplayOrder(exp.displayOrder);
    setShowForm(true);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (editingId) {
        const res = await fetch("/api/experiences", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, title, organization, period, description, displayOrder }),
        });
        if (!res.ok) throw new Error("Failed to update experience");
        setSuccess("Experience updated successfully!");
      } else {
        const res = await fetch("/api/experiences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, organization, period, description, displayOrder }),
        });
        if (!res.ok) throw new Error("Failed to add experience");
        setSuccess("Experience entry added successfully!");
      }

      setShowForm(false);
      loadExperiences();
      setTimeout(() => setSuccess(""), 3500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving experience");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this experience record?")) return;
    try {
      const res = await fetch(`/api/experiences?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete experience");
      setSuccess("Experience record deleted");
      loadExperiences();
      setTimeout(() => setSuccess(""), 3500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error deleting experience");
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <Loader2 className="animate-spin text-primary" size={20} />
          <span>Loading career experience...</span>
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
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Manage Experience Timeline</h1>
            <p className="text-xs text-muted-foreground">Add education, internships, roles, and milestones.</p>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-primary text-primary-foreground font-semibold text-xs rounded-md flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Add Experience</span>
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
              {editingId ? "Edit Experience Entry" : "Add Experience Entry"}
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
                  Role / Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Computer Science Student"
                  className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                  Organization / Location
                </label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. University studies &middot; Bengaluru, India"
                  className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                  Time Period
                </label>
                <input
                  type="text"
                  required
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="e.g. 2024 — PRESENT"
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

            <div>
              <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                Description / Highlights
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Building strong foundations in programming, data structures, web development..."
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
                <span>{editingId ? "Update Experience" : "Save Experience"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Timeline List */}
      <div className="space-y-3">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-5 bg-card border border-border rounded-xl shadow-xs flex items-start justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                  {exp.period}
                </span>
                <span className="text-xs text-muted-foreground font-semibold">
                  Order #{exp.displayOrder}
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground mt-1.5">{exp.title}</h3>
              <p className="text-xs font-medium text-muted-foreground">{exp.organization}</p>
              <p className="text-xs text-muted-foreground mt-2">{exp.description}</p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => openEditModal(exp)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                title="Edit entry"
              >
                <Edit2 size={15} />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-500/10 rounded-md"
                title="Delete entry"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
