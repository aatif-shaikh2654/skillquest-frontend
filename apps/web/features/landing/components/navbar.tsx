"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { HudCorners } from "@repo/ui/components/hud-corners";
import { LogoMark } from "@repo/ui/components/logo-mark";
import { cn } from "@repo/ui/lib/utils";
import { SplitAction } from "./split-action";

const links = [
  { href: "#about", label: "About Us" },
  { href: "#courses", label: "Courses" },
  { href: "#shop", label: "Shop" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact Us" },
];

const spring = { type: "spring", stiffness: 380, damping: 28 } as const;
const ease = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const menu = (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-nav"
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex h-dvh w-screen flex-col bg-foreground lg:hidden"
          initial={{ clipPath: "circle(0% at 100% 0%)" }}
          animate={{ clipPath: "circle(160% at 100% 0%)" }}
          exit={{ clipPath: "circle(0% at 100% 0%)" }}
          transition={{ duration: 0.5, ease }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--mint)_22%,transparent),transparent_70%)]" />
          <div className="relative flex min-h-0 flex-1 flex-col px-6 pt-24 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
            <HudCorners size="lg" tone="white" className="inset-4" />
            <p className="mb-4 text-[10px] tracking-[0.28em] text-primary uppercase">
              Select stage
            </p>
            <ul className="flex flex-col gap-1">
              {links.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -36, scale: 0.94 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ ...spring, stiffness: 420, damping: 20, delay: 0.1 + index * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-baseline gap-4 border-b border-white/10 py-3 text-2xl font-semibold tracking-tight text-white transition-colors hover:text-primary sm:text-3xl"
                    onClick={() => setOpen(false)}
                  >
                    <span className="w-7 text-xs tracking-[0.18em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-auto pt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ ...spring, delay: 0.42 }}
            >
              <SplitAction href="/login" label="Login" tone="mint" />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <motion.nav
          className="relative z-50 mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-10 lg:py-6"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 20 }}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white"
            onClick={() => setOpen(false)}
          >
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 520, damping: 16, delay: 0.08 }}
            >
              <LogoMark className="size-9 sm:size-10" />
            </motion.span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-semibold tracking-tight sm:text-[1.35rem]">
                SkillQuest
              </span>
              <span className="mt-1 h-0.5 w-8 bg-primary" />
            </span>
          </Link>

          <ul className="hidden items-center gap-9 text-[15px] font-medium text-white/95 lg:flex">
            {links.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 20,
                  delay: 0.16 + index * 0.05,
                }}
              >
                <Link
                  href={link.href}
                  className="relative py-1 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <SplitAction href="/login" label="Login" tone="ink" />
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:size-11 lg:hidden",
              open
                ? "bg-primary text-foreground"
                : "bg-foreground text-white hover:bg-foreground/90",
            )}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative size-5">
              <Menu
                className={cn(
                  "absolute inset-0 size-5 transition-all duration-300",
                  open
                    ? "scale-50 rotate-90 opacity-0"
                    : "scale-100 rotate-0 opacity-100",
                )}
                strokeWidth={2.25}
              />
              <X
                className={cn(
                  "absolute inset-0 size-5 transition-all duration-300",
                  open
                    ? "scale-100 rotate-0 opacity-100"
                    : "scale-50 -rotate-90 opacity-0",
                )}
                strokeWidth={2.25}
              />
            </span>
          </button>
        </motion.nav>
      </header>

      {menu}
    </>
  );
}
