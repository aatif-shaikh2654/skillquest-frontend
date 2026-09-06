"use client";

import { create } from "zustand";

export type ToastKind = "success" | "warning" | "error" | "info";

export type Toast = {
  id: number;
  text: string;
  kind: ToastKind;
};

type ToastStore = {
  toast: Toast | null;
  show: (text: string, kind?: ToastKind) => void;
  dismiss: () => void;
};

let timer = 0;
let nextId = 0;
const DISMISS_MS = 2200;
const ERROR_DISMISS_MS = 3200;

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  show: (text, kind = "info") => {
    window.clearTimeout(timer);
    nextId += 1;
    const id = nextId;
    set({ toast: { id, text, kind } });
    timer = window.setTimeout(
      () => {
        set((current) =>
          current.toast?.id === id ? { toast: null } : current,
        );
      },
      kind === "error" ? ERROR_DISMISS_MS : DISMISS_MS,
    );
  },
  dismiss: () => {
    window.clearTimeout(timer);
    set({ toast: null });
  },
}));

type ToastFn = {
  (text: string, kind?: ToastKind): void;
  success: (text: string) => void;
  warning: (text: string) => void;
  error: (text: string) => void;
  info: (text: string) => void;
};

export const toast: ToastFn = (text, kind = "info") => {
  useToastStore.getState().show(text, kind);
};

toast.success = (text) => toast(text, "success");
toast.warning = (text) => toast(text, "warning");
toast.error = (text) => toast(text, "error");
toast.info = (text) => toast(text, "info");

export function dismiss() {
  useToastStore.getState().dismiss();
}
