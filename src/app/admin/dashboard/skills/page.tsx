"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Edit2, Loader2, CheckCircle2, ArrowLeft, X, Save, Search } from "lucide-react";
import { Skill } from "@/types/portfolio";
import { getSimpleIconSlug } from "@/lib/icons";

type IconChoice = {
  title: string;
  slug: string;
  hex: string;
};

function iconSrc(slug: string, hex?: string) {
  const color = hex && readableHex(hex) ? hex : "111111";
  return `https://cdn.simpleicons.org/${encodeURIComponent(slug)}/${color}`;
}

function readableHex(hex: string) {
  const value = Number.parseInt(hex, 16);
  if (Number.isNaN(value)) return false;
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return red * 0.299 + green * 0.587 + blue * 0.114 < 210;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Add / Edit Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [iconKey, setIconKey] = useState("react");
  const [selectedIcon, setSelectedIcon] = useState<IconChoice | null>(null);
  const [iconQuery, setIconQuery] = useState("");
  const [iconChoices, setIconChoices] = useState<IconChoice[]>([]);
  const [iconsLoading, setIconsLoading] = useState(false);
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

  useEffect(() => {
    if (!showForm) return;
    const handle = window.setTimeout(async () => {
      setIconsLoading(true);
      try {
        const params = new URLSearchParams();
        if (iconQuery.trim()) params.set("q", iconQuery.trim());
        const res = await fetch(`/api/icons?${params.toString()}`);
        const data = await res.json();
        setIconChoices(Array.isArray(data) ? data : []);
      } catch {
        setIconChoices([]);
      } finally {
        setIconsLoading(false);
      }
    }, 200);
    return () => window.clearTimeout(handle);
  }, [iconQuery, showForm]);

  useEffect(() => {
    if (selectedIcon?.slug === iconKey || iconChoices.length === 0) return;
    const match = iconChoices.find((icon) => icon.slug === iconKey);
    if (match) setSelectedIcon(match);
  }, [iconChoices, iconKey, selectedIcon]);

  const chooseIcon = (icon: IconChoice, fillName = false) => {
    setIconKey(icon.slug);
    setSelectedIcon(icon);
    if (fillName && !name.trim()) setName(icon.title);
  };

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setIconKey("react");
    setSelectedIcon(null);
    setIconQuery("");
    setDisplayOrder(skills.length + 1);
    setShowForm(true);
    setError("");
  };

  const openEditModal = (skill: Skill) => {
    const slug = getSimpleIconSlug(skill.iconKey);
    setEditingId(skill.id);
    setName(skill.name);
    setIconKey(slug);
    setSelectedIcon(null);
    setIconQuery("");
    setDisplayOrder(skill.displayOrder);
    setShowForm(true);
    setError("");
    fetch(`/api/icons?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data[0]) setSelectedIcon(data[0]);
      })
      .catch(() => undefined);
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
            <div className="sm:col-span-2">
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

            <div className="sm:col-span-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="block text-xs font-semibold uppercase text-foreground">
                  Icon
                </label>
                <a
                  href="https://simpleicons.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-semibold text-primary hover:underline"
                >
                  Browse Simple Icons
                </a>
              </div>

              <div className="mb-3 flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-white">
                  {iconKey ? (
                    <img
                      src={iconSrc(iconKey, selectedIcon?.hex)}
                      alt=""
                      width={26}
                      height={26}
                      className="h-6 w-6 object-contain"
                    />
                  ) : null}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {selectedIcon?.title || "Choose an icon"}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{iconKey}</p>
                </div>
              </div>

              <div className="relative mb-3">
                <Search size={14} className="pointer-events-none absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  type="search"
                  value={iconQuery}
                  onChange={(e) => setIconQuery(e.target.value)}
                  placeholder="Search any icon — Figma, Docker, Java, Prisma..."
                  className="w-full py-2 pl-9 pr-3 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto rounded-lg border border-border bg-muted/20 p-2 sm:grid-cols-3 md:grid-cols-4">
                {iconsLoading && iconChoices.length === 0 ? (
                  <p className="col-span-full px-2 py-6 text-center text-xs text-muted-foreground">Searching icons...</p>
                ) : iconChoices.length === 0 ? (
                  <p className="col-span-full px-2 py-6 text-center text-xs text-muted-foreground">
                    No icons match that search.
                  </p>
                ) : (
                  iconChoices.map((icon) => {
                    const selected = icon.slug === iconKey;
                    return (
                      <button
                        key={icon.slug}
                        type="button"
                        onClick={() => chooseIcon(icon, true)}
                        aria-pressed={selected}
                        className={`flex items-center gap-2 rounded-md border px-2 py-2 text-left transition-colors cursor-pointer ${
                          selected
                            ? "border-primary bg-primary/10"
                            : "border-transparent bg-background hover:border-border"
                        }`}
                      >
                        <img
                          src={iconSrc(icon.slug, icon.hex)}
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5 shrink-0 object-contain"
                        />
                        <span className="truncate text-xs font-medium text-foreground">{icon.title}</span>
                      </button>
                    );
                  })
                )}
              </div>
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white">
                    <img
                      src={iconSrc(getSimpleIconSlug(skill.iconKey))}
                      alt=""
                      width={22}
                      height={22}
                      className="h-5 w-5 object-contain"
                    />
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
