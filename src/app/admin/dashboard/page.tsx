"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Wrench,
    FolderGit2,
    Award,
    Briefcase,
    Mail,
    FileText,
    ImageIcon,
    User,
    ArrowRight,
    Loader2,
    CheckCircle2,
    Settings,
} from "lucide-react";
import { PortfolioData, ContactMessage } from "@/types/portfolio";

export default function AdminOverviewDashboard() {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
        const [hero, about, skills, projects, certs, exp, settingsRes, msgRes] = await Promise.all([
          fetch("/api/hero").then((r) => r.json()),
          fetch("/api/about").then((r) => r.json()),
          fetch("/api/skills").then((r) => r.json()),
          fetch("/api/projects").then((r) => r.json()),
          fetch("/api/certificates").then((r) => r.json()),
          fetch("/api/experiences").then((r) => r.json()),
          fetch("/api/settings").then((r) => r.json()),
          fetch("/api/messages").then((r) => r.json()),
        ]);

        setData({
          hero,
          about,
          skills: Array.isArray(skills) ? skills : [],
          projects: Array.isArray(projects) ? projects : [],
          certificates: Array.isArray(certs) ? certs : [],
          experiences: Array.isArray(exp) ? exp : [],
          settings: settingsRes?.siteTitle
            ? settingsRes
            : {
                id: 1,
                siteTitle: "Abigail Ola · IT Portfolio",
                ownerName: "Abigail Ola",
                ownerTitle: "Computer Science Student",
                contactEmail: "hello@example.com",
                githubUrl: "https://github.com",
                linkedinUrl: "https://linkedin.com",
                introEyebrow: "A STUDENT BY DAY",
                introQuote: "Learning out loud, building with intention.",
                footerCopyright: "© 2025 Abigail Ola",
              },
          resume: null,
        });

                if (msgRes && Array.isArray(msgRes.messages)) {
                    setMessages(msgRes.messages);
                }
            } catch (err) {
                console.error("Failed to load dashboard overview data", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="py-24 flex items-center justify-center">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Loader2 className="animate-spin text-primary" size={20} />
                    <span>Loading dashboard overview...</span>
                </div>
            </div>
        );
    }

    const sections = [
        {
            title: "Hero Section",
            description: "Manage hero portrait, headlines, subtitles, badge and note.",
            href: "/admin/dashboard/hero",
            icon: ImageIcon,
            countLabel: "Content & Photo",
            color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
        },
        {
            title: "About Me",
            description: "Edit bio paragraphs, portrait photo, and snapshot.",
            href: "/admin/dashboard/about",
            icon: User,
            countLabel: "2 Paragraphs",
            color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
        },
        {
            title: "Skills & Tools",
            description: "Add, edit, reorder or toggle frontend/backend technical skills.",
            href: "/admin/dashboard/skills",
            icon: Wrench,
            countLabel: `${data?.skills.length || 0} skills`,
            color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
        },
        {
            title: "Projects",
            description: "Showcase development projects with descriptions and artwork.",
            href: "/admin/dashboard/projects",
            icon: FolderGit2,
            countLabel: `${data?.projects.length || 0} projects`,
            color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
        },
        {
            title: "Work Experience",
            description: "Maintain career timeline entries, roles, organizations, and dates.",
            href: "/admin/dashboard/experience",
            icon: Briefcase,
            countLabel: `${data?.experiences.length || 0} entries`,
            color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
        },
        {
            title: "Certificates",
            description: "Display certifications, issuing years, and curriculum descriptions.",
            href: "/admin/dashboard/certificates",
            icon: Award,
            countLabel: `${data?.certificates.length || 0} certificates`,
            color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
        },
        {
            title: "Resume",
            description: "Upload a PDF resume and replace it whenever you have a new version.",
            href: "/admin/dashboard/resume",
            icon: FileText,
            countLabel: "PDF upload",
            color: "bg-orange-500/10 text-orange-600 border-orange-500/20",
        },
        {
            title: "Contact Messages",
            description: "Review and respond to client inquiries and portfolio contacts.",
            href: "/admin/dashboard/contacts",
            icon: Mail,
            countLabel: `${messages.length} inquiries`,
            color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
        },
        {
            title: "Site Settings & Admin",
            description: "Manage brand identity, social links, introduction quotes, and admin account security.",
            href: "/admin/dashboard/settings",
            icon: Settings,
            countLabel: "Identity & Security",
            color: "bg-teal-500/10 text-teal-600 border-teal-500/20",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Hero */}
            <div className="p-6 md:p-8 bg-card border border-border rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-primary">Content Management</span>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-1">
                        Welcome back, Abigail
                    </h1>
                    <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                        Manage every section of your portfolio from this central dashboard. Changes save directly to your database and update the live website immediately.
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <Link
                        href="/"
                        target="_blank"
                        className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-2 hover:opacity-90 shadow-xs transition-all"
                    >
                        <span>View Live Site</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 bg-card border border-border rounded-xl shadow-xs">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Skills</span>
                    <p className="text-3xl font-extrabold text-foreground mt-2">{data?.skills.length || 0}</p>
                    <span className="text-[11px] text-muted-foreground mt-1 block">Active tech stack</span>
                </div>
                <div className="p-5 bg-card border border-border rounded-xl shadow-xs">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projects</span>
                    <p className="text-3xl font-extrabold text-foreground mt-2">{data?.projects.length || 0}</p>
                    <span className="text-[11px] text-muted-foreground mt-1 block">Featured portfolio work</span>
                </div>
                <div className="p-5 bg-card border border-border rounded-xl shadow-xs">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Certificates</span>
                    <p className="text-3xl font-extrabold text-foreground mt-2">{data?.certificates.length || 0}</p>
                    <span className="text-[11px] text-muted-foreground mt-1 block">Verified credentials</span>
                </div>
                <div className="p-5 bg-card border border-border rounded-xl shadow-xs">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Inquiries</span>
                    <p className="text-3xl font-extrabold text-primary mt-2">{messages.length}</p>
                    <span className="text-[11px] text-muted-foreground mt-1 block">Received messages</span>
                </div>
            </div>

            {/* Management Navigation Hub */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-foreground">Manage Portfolio Sections</h2>
                        <p className="text-xs text-muted-foreground">Select a section to edit its content and media.</p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <Link
                                key={section.href}
                                href={section.href}
                                className="group p-5 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`p-2.5 rounded-lg border ${section.color}`}>
                                            <Icon size={18} />
                                        </div>
                                        <span className="text-[11px] font-semibold text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full">
                                            {section.countLabel}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                        {section.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                                        {section.description}
                                    </p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary">
                                    <span>Manage section</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Latest Messages Snapshot */}
            <div className="p-6 bg-card border border-border rounded-xl shadow-xs">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Mail className="text-primary" size={18} />
                        <h2 className="text-base font-bold text-foreground">Recent Contact Messages</h2>
                    </div>
                    <Link
                        href="/admin/dashboard/contacts"
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                        <span>View all ({messages.length})</span>
                        <ArrowRight size={13} />
                    </Link>
                </div>

                {messages.length === 0 ? (
                    <div className="py-8 text-center text-xs text-muted-foreground border border-dashed border-border rounded-lg">
                        No contact messages yet. Inquiries submitted through the contact form will appear here.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {messages.slice(0, 3).map((msg) => (
                            <div
                                key={msg.id}
                                className="p-4 bg-muted/30 border border-border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-foreground">{msg.name}</span>
                                        <span className="text-xs text-muted-foreground">&lt;{msg.email}&gt;</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{msg.message}</p>
                                </div>
                                <span className="text-[11px] text-muted-foreground shrink-0">
                                    {new Date(msg.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
