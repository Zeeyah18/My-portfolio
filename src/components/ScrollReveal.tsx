"use client";

import { useEffect } from "react";

const CARD_SELECTOR = [
  ".skill-item",
  ".project-row",
  ".timeline-entry",
  ".certificate-item",
  ".about-photo-card",
  ".about-facts",
  ".contact-form-card",
  ".hero-visual",
].join(",");

const TEXT_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "p",
  ".eyebrow",
  ".section-aside",
  ".section-number",
  ".hero-actions",
  ".intro-flower",
].join(",");

export function ScrollReveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".portfolio-page");
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observed: HTMLElement[] = [];
    const sections = root.querySelectorAll<HTMLElement>("section, footer");

    sections.forEach((section) => {
      section.classList.add("reveal");
      observed.push(section);

      section.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach((card) => {
        card.classList.add("reveal-item");
        observed.push(card);
      });

      section.querySelectorAll<HTMLElement>(TEXT_SELECTOR).forEach((text) => {
        if (text.closest(CARD_SELECTOR)) return;
        text.classList.add("reveal-item");
        observed.push(text);
      });
    });

    const viewHeight = window.innerHeight;
    const pending: HTMLElement[] = [];

    observed.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const alreadyVisible = rect.top < viewHeight * 0.9 && rect.bottom > 0;
      if (alreadyVisible) {
        element.classList.add("is-in");
      } else {
        pending.push(element);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter((entry) => entry.isIntersecting);
        entering.forEach((entry, index) => {
          const element = entry.target as HTMLElement;
          if (element.classList.contains("reveal-item")) {
            element.style.transitionDelay = `${Math.min(index, 7) * 70}ms`;
          }
          element.classList.add("is-in");
          observer.unobserve(element);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    pending.forEach((element) => observer.observe(element));
    root.classList.add("reveal-ready");

    return () => observer.disconnect();
  }, []);

  return null;
}
