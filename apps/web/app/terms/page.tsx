import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@repo/ui/components/logo-mark";

export const metadata: Metadata = {
  title: "Terms of Service · SkillQuest",
};

export default function TermsPage() {
  return (
    <main className="min-h-svh bg-background px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-foreground"
        >
          <LogoMark className="size-8" />
          <span className="text-lg font-semibold tracking-tight">
            SkillQuest
          </span>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          SkillQuest terms will live here. By creating an account you agree to
          use the platform for learning, keep your login details private, and
          follow course access rules.
        </p>
        <p className="mt-8 text-sm">
          <Link
            href="/signup"
            className="font-medium text-brand underline-offset-4 hover:underline"
          >
            Back to signup
          </Link>
        </p>
      </div>
    </main>
  );
}
