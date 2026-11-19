"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, AtSign, Lock, Mail, User, Loader2, Gem } from "lucide-react";

export default function AdminRegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, username, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            router.push("/admin/dashboard");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
            <div className="w-full max-w-md p-8 border border-border bg-card shadow-lg">
                <div className="flex items-center gap-2 mb-2 text-primary font-bold text-lg">
                    <Gem size={18} />
                    <span>PORTFOLIO ADMIN</span>
                </div>
                <h1 className="text-2xl font-semibold text-foreground mb-1">Create Admin Account</h1>
                <p className="text-sm text-muted-foreground mb-6">
                    Set up owner credentials to manage your website content.
                </p>

                {error && (
                    <div className="mb-5 p-3 text-xs bg-red-500/10 border border-red-500 text-red-600 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                            Your Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-muted-foreground" size={16} />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Abigail Ola"
                                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border focus:border-primary focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                            Username
                        </label>
                        <div className="relative">
                            <AtSign className="absolute left-3 top-3 text-muted-foreground" size={16} />
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                                placeholder="abigail"
                                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border focus:border-primary focus:outline-none"
                            />
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            Letters, numbers, underscores, and hyphens.
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-muted-foreground" size={16} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border focus:border-primary focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                            Password (min. 6 characters)
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-muted-foreground" size={16} />
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border focus:border-primary focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-muted-foreground" size={16} />
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border focus:border-primary focus:outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-2.5 px-4 bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            <>
                                Create Account <ArrowUpRight size={16} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>Already registered?</span>
                    <Link href="/admin/login" className="font-semibold text-primary hover:underline">
                        Sign in
                    </Link>
                </div>

                <div className="mt-3 text-center">
                    <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">
                        ← Back to public portfolio
                    </Link>
                </div>
            </div>
        </div>
    );
}
