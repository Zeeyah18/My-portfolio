"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Certificates", href: "#certificates" },
  ];

  return (
    <div className="header-sticky-wrap">
      <header className="site-header">
        <a
          href="#home"
          className="brand-mark"
          aria-label="Abigail Ola home"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Logo />
        </a>

        {/* Desktop Navigation */}
        <nav className="main-nav hidden md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Contact CTA */}
        <a className="header-contact hidden md:flex" href="#contact">
          Let&apos;s talk <ArrowUpRight size={15} />
        </a>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-menu-toggle md:hidden p-2 rounded-lg text-[var(--forest-deep)] hover:text-[var(--sage)] hover:bg-[var(--paper-deep)] transition-colors focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div className="mobile-menu-overlay" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <nav className="mobile-menu-links">
              <span className="mobile-menu-label">Navigation</span>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </nav>

            <div className="mobile-menu-footer">
              <a
                href="#contact"
                className="button-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Let&apos;s talk <ArrowUpRight size={16} />
              </a>
              <p>Open for student collaborations and internships</p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
