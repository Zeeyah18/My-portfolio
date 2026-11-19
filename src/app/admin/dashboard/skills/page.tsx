"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wrench, Plus, Trash2, Edit2, Loader2, CheckCircle2, ArrowLeft, X, Save } from "lucide-react";
import { Skill } from "@/types/portfolio";

const POPULAR_ICONS = [
  { key: "siReact", label: "React" },
  { key: "siTypescript", label: "TypeScript" },
  { key: "siJavascript", label: "JavaScript" },
  { key: "siHtml5", label: "HTML5" },
  { key: "siCss", label: "CSS3" },
  { key: "siNodedotjs", label: "Node.js" },
  { key: "siPython", label: "Python" },
  { key: "siGit", label: "Git" },
];

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Add / Edit Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [iconKey, setIconKey] = useState("siReact");
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);

  const loadSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      setSkills(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load skills list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setIconKey("siReact");
    setDisplayOrder(skills.length + 1);
    setShowForm(true);
    setError("");
  };

  const openEditModal = (skill: Skill) => {
    setEditingId(skill.id);
    setName(skill.name);
    setIconKey(skill.iconKey);
    setDisplayOrder(skill.displayOrder);
    setShowForm(true);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (editingId) {
        // Update
        const res = await fetch("/api/skills", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, name, iconKey, displayOrder }),
        });
        if (!res.ok) throw new Error("Failed to update skill");
        setSuccess("Skill updated successfully!");
      } else {
        // Create
        const res = await fetch("/api/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, iconKey, displayOrder }),
        });
        if (!res.ok) throw new Error("Failed to add skill");
        setSuccess("Skill added successfully!");
      }

      setShowForm(false);
      loadSkills();
      setTimeout(() => setSuccess(""), 3500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving skill");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      const res = await fetch(`/api/skills?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete skill");
      setSuccess("Skill deleted successfully");
      loadSkills();
      setTimeout(() => setSuccess(""), 3500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error deleting skill");
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <Loader2 className="animate-spin text-primary" size={20} />
          <span>Loading skills...</span>
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
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Manage Skills &amp; Tools</h1>
            <p className="text-xs text-muted-foreground">Add or modify technical competencies shown on the live portfolio.</p>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-primary text-primary-foreground font-semibold text-xs rounded-md flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Add New Skill</span>
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

      {/* Form Drawer / Card */}
      {showForm && (
        <div className="p-6 bg-card border border-primary/30 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
            <h2 className="text-base font-bold text-foreground">
              {editingId ? "Edit Skill" : "Add New Skill"}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-muted-foreground hover:text-foreground p-1"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                Skill Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Next.js, React, Python"
                className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                Icon Identifier
              </label>
              <select
                value={iconKey}
                onChange={(e) => setIconKey(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
              >
                {POPULAR_ICONS.map((icon) => (
                  <option key={icon.key} value={icon.key}>
                    {icon.label} ({icon.key})
                  </option>
                ))}
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

            <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
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
                <span>{editingId ? "Update Skill" : "Save Skill"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Total Skills ({skills.length})
          </span>
        </div>

        {skills.length === 0 ? (
          <div className="py-12 text-center text-xs text-muted-foreground">
            No skills configured yet. Click &quot;Add New Skill&quot; above to create one.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                    {skill.name.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{skill.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      Icon: <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{skill.iconKey}</code> &middot; Order: {skill.displayOrder}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(skill)}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                    title="Edit skill"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-500/10 rounded-md transition-colors"
                    title="Delete skill"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
