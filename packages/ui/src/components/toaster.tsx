"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";
import { HudCorners } from "@repo/ui/components/hud-corners";
import { cn } from "@repo/ui/lib/utils";
import { useToastStore, type ToastKind } from "@repo/ui/lib/toast";

const slam = { type: "spring", stiffness: 480, damping: 18 } as const;

const variants: Record<
  ToastKind,
  {
    label: string;
    corner: "mint" | "sky" | "brand" | "danger";
    icon: typeof CircleCheck;
    labelClass: string;
    iconClass: string;
    railClass: string;
    borderClass: string;
    tintClass: string;
    washClass: string;
  }
> = {
  success: {
    label: "Success",
    corner: "mint",
    icon: CircleCheck,
    labelClass: "text-primary",
    iconClass: "text-primary",
    railClass: "bg-primary",
    borderClass: "border-primary",
    tintClass: "bg-primary/15",
    washClass: "bg-primary/40",
  },
  info: {
    label: "Info",
    corner: "sky",
    icon: Info,
    labelClass: "text-secondary",
    iconClass: "text-secondary",
    railClass: "bg-secondary",
    borderClass: "border-secondary",
    tintClass: "bg-secondary/15",
    washClass: "bg-secondary/40",
  },
  warning: {
    label: "Warning",
    corner: "brand",
    icon: CircleAlert,
    labelClass: "text-brand",
    iconClass: "text-brand",
    railClass: "bg-brand",
    borderClass: "border-brand",
    tintClass: "bg-brand/15",
    washClass: "bg-brand/40",
  },
  error: {
    label: "Error",
    corner: "danger",
    icon: CircleX,
    labelClass: "text-destructive",
    iconClass: "text-destructive",
    railClass: "bg-destructive",
    borderClass: "border-destructive",
    tintClass: "bg-destructive/15",
    washClass: "bg-destructive/40",
  },
};

export function Toaster() {
  const toast = useToastStore((state) => state.toast);
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-x-4 top-[max(1rem,env(safe-area-inset-top))] z-[60] flex justify-center sm:inset-x-6">
      <AnimatePresence mode="wait">
        {toast ? (
          <ToastCard
            key={toast.id}
            kind={toast.kind}
            text={toast.text}
            reduced={Boolean(reduced)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ToastCard({
  kind,
  text,
  reduced,
}: {
  kind: ToastKind;
  text: string;
  reduced: boolean;
}) {
  const variant = variants[kind];
  const Icon = variant.icon;

  return (
    <motion.div
      role="status"
      aria-live={kind === "error" ? "assertive" : "polite"}
      className={cn(
        "relative w-full max-w-md overflow-hidden border-2 bg-card px-4 py-3",
        variant.borderClass,
      )}
      initial={reduced ? false : { opacity: 0, y: -18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.97 }}
      transition={slam}
    >
      <span aria-hidden className={cn("absolute inset-0", variant.tintClass)} />
      {reduced ? null : (
        <motion.span
          aria-hidden
          className={cn("absolute inset-0", variant.washClass)}
          initial={{ opacity: 0.85 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        />
      )}
      <HudCorners size="sm" tone={variant.corner} />
      <span
        aria-hidden
        className={cn(
          "absolute top-0 bottom-0 left-0 w-0.5",
          variant.railClass,
        )}
      />
      <motion.span
        aria-hidden
        className={cn("absolute top-0 right-0 left-0 h-0.5", variant.railClass)}
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ ...slam, delay: 0.04 }}
        style={{ transformOrigin: "left" }}
      />
      <div className="relative flex items-start gap-2.5 pl-1">
        <Icon
          className={cn("mt-0.5 size-3.5 shrink-0", variant.iconClass)}
          strokeWidth={2}
        />
        <div className="min-w-0">
          <p
            className={cn(
              "text-[10px] font-medium tracking-[0.28em] uppercase",
              variant.labelClass,
            )}
          >
            {variant.label}
          </p>
          <p className="mt-1 text-sm font-medium tracking-tight text-foreground">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
