import { ReactNode } from "react";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata = {
  title: "Admin Dashboard — Abigail Ola Portfolio",
  description: "Content Management System for Abigail Ola's Portfolio",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <AdminNav />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground bg-card">
        Abigail Ola Portfolio CMS &copy; {new Date().getFullYear()} &middot; Authenticated Admin Session
      </footer>
    </div>
  );
}
