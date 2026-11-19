"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  User,
  Wrench,
  FolderGit2,
  Briefcase,
  Award,
  Mail,
  FileText,
  ArrowUpRight,
  LogOut,
  ImageIcon,
  Settings,
} from "lucide-react";

export const ADMIN_NAV_ITEMS = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Hero", href: "/admin/dashboard/hero", icon: ImageIcon },
  { label: "About", href: "/admin/dashboard/about", icon: User },
  { label: "Skills", href: "/admin/dashboard/skills", icon: Wrench },
  { label: "Projects", href: "/admin/dashboard/projects", icon: FolderGit2 },
  { label: "Experience", href: "/admin/dashboard/experience", icon: Briefcase },
  { label: "Certificates", href: "/admin/dashboard/certificates", icon: Award },
  { label: "Resume", href: "/admin/dashboard/resume", icon: FileText },
  { label: "Contacts", href: "/admin/dashboard/contacts", icon: Mail },
  { label: "Settings", href: "/admin/dashboard/settings", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs backdrop-blur-md bg-opacity-95">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <Image
              src="/logo-ao.png"
              alt="Logo"
              width={38}
              height={26}
              className="h-7 w-auto object-contain"
            />
            <span className="font-bold text-base tracking-tight text-foreground hidden sm:inline">
              Abigail Ola
            </span>
          </Link>
          <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
            Admin CMS
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors px-2 py-1"
          >
            <span>Live Portfolio</span>
            <ArrowUpRight size={14} />
          </Link>

          <button
            onClick={handleLogout}
            className="text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-500/10 flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-red-500/30 transition-all cursor-pointer"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Horizontal Admin Navigation Bar (NO SIDEBAR) */}
      <nav className="border-t border-border/60 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin/dashboard"
                  ? pathname === "/admin/dashboard"
                  : pathname === item.href || (pathname ? pathname.startsWith(`${item.href}/`) : false);

              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon size={14} className={isActive ? "text-primary-foreground" : "text-muted-foreground"} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
