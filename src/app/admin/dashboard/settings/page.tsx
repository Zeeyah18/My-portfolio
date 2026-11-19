"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Settings,
  User,
  Lock,
  Globe,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Save,
  Database,
  Cloud,
  ExternalLink,
} from "lucide-react";

export default function AdminSettingsPage() {
  // Site settings state
  const [siteTitle, setSiteTitle] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerTitle, setOwnerTitle] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [introEyebrow, setIntroEyebrow] = useState("");
  const [introQuote, setIntroQuote] = useState("");
  const [footerCopyright, setFooterCopyright] = useState("");

  // Account settings state
  const [adminName, setAdminName] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingAccount, setSavingAccount] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState("");
  const [accountSuccess, setAccountSuccess] = useState("");
  const [settingsError, setSettingsError] = useState("");
  const [accountError, setAccountError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [settingsRes, meRes] = await Promise.all([
          fetch("/api/settings").then((r) => r.json()),
          fetch("/api/auth/me").then((r) => r.json()),
        ]);

        if (settingsRes) {
          setSiteTitle(settingsRes.siteTitle || "");
          setOwnerName(settingsRes.ownerName || "");
          setOwnerTitle(settingsRes.ownerTitle || "");
          setContactEmail(settingsRes.contactEmail || "");
          setGithubUrl(settingsRes.githubUrl || "");
          setLinkedinUrl(settingsRes.linkedinUrl || "");
          setIntroEyebrow(settingsRes.introEyebrow || "");
          setIntroQuote(settingsRes.introQuote || "");
          setFooterCopyright(settingsRes.footerCopyright || "");
        }

        if (meRes?.user) {
          setAdminName(meRes.user.name || "");
          setAdminUsername(meRes.user.username || "");
          setAdminEmail(meRes.user.email || "");
        }
      } catch (err) {
        console.error("Failed to load settings data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsError("");
    setSettingsSuccess("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteTitle,
          ownerName,
          ownerTitle,
          contactEmail,
          githubUrl,
          linkedinUrl,
          introEyebrow,
          introQuote,
          footerCopyright,
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to update settings");
      }

      setSettingsSuccess("Site settings saved successfully!");
      setTimeout(() => setSettingsSuccess(""), 3500);
    } catch (err) {
      setSettingsError(err instanceof Error ? err.message : "Error saving settings");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAccount(true);
    setAccountError("");
    setAccountSuccess("");

    if (newPassword && newPassword !== confirmPassword) {
      setAccountError("New passwords do not match.");
      setSavingAccount(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: adminName,
          username: adminUsername,
          email: adminEmail,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update account");
      }

      setAccountSuccess("Account details updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setAccountSuccess(""), 3500);
    } catch (err) {
      setAccountError(err instanceof Error ? err.message : "Error updating account");
    } finally {
      setSavingAccount(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <Loader2 className="animate-spin text-primary" size={20} />
          <span>Loading portfolio settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Global Settings & Profile</h1>
            <p className="text-xs text-muted-foreground">Manage brand identity, contact emails, social channels, and admin credentials.</p>
          </div>
        </div>
      </div>

      {/* Cloud & Database Status Banner */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 bg-card border border-border rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <Database size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">PostgreSQL (Neon)</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/30">
                Connected
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">ep-blue-union-a18erlsa pooler database active</p>
          </div>
        </div>

        <div className="p-4 bg-card border border-border rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <Cloud size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">Cloudinary Storage</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 border border-blue-500/30">
                Ready
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Cloud image uploading & CDN asset delivery enabled</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Site & Social Settings Form */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Globe className="text-primary" size={18} />
            <h2 className="text-base font-bold text-foreground">Brand & Social Identity</h2>
          </div>

          {settingsSuccess && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 size={15} />
              <span>{settingsSuccess}</span>
            </div>
          )}

          {settingsError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 text-xs font-semibold">
              {settingsError}
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                  Portfolio Owner Name
                </label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Abigail Ola"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                  Role / Student Title
                </label>
                <input
                  type="text"
                  required
                  value={ownerTitle}
                  onChange={(e) => setOwnerTitle(e.target.value)}
                  placeholder="Computer Science Student"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                Public Contact Email
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-border space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                  Intro Band Eyebrow
                </label>
                <input
                  type="text"
                  value={introEyebrow}
                  onChange={(e) => setIntroEyebrow(e.target.value)}
                  placeholder="A STUDENT BY DAY"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                  Intro Band Quote
                </label>
                <input
                  type="text"
                  value={introQuote}
                  onChange={(e) => setIntroQuote(e.target.value)}
                  placeholder="Learning out loud, building with intention."
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                Footer Copyright Text
              </label>
              <input
                type="text"
                value={footerCopyright}
                onChange={(e) => setFooterCopyright(e.target.value)}
                placeholder="© 2025 Abigail Ola"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={savingSettings}
                className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-md flex items-center gap-2 hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {savingSettings ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                <span>{savingSettings ? "Saving Settings..." : "Save Brand Settings"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Admin Account & Security Form */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Lock className="text-primary" size={18} />
            <h2 className="text-base font-bold text-foreground">Admin Account & Security</h2>
          </div>

          {accountSuccess && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 size={15} />
              <span>{accountSuccess}</span>
            </div>
          )}

          {accountError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 text-xs font-semibold">
              {accountError}
            </div>
          )}

          <form onSubmit={handleSaveAccount} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                Admin Display Name
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Abigail"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                  Admin Username
                </label>
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-foreground mb-1.5">
                  Admin Login Email
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-border space-y-3">
              <p className="text-xs font-bold text-foreground">Change Password (optional)</p>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={savingAccount}
                className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-md flex items-center gap-2 hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {savingAccount ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                <span>{savingAccount ? "Saving Account..." : "Save Account & Password"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
