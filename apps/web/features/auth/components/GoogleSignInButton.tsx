"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ApiError } from "@/lib/axios";
import { HudCorners } from "@repo/ui/components/hud-corners";
import { QuestLoader } from "@repo/ui/components/quest-loader";
import { useLinkGoogle } from "../hooks/useLinkGoogle";
import { useSocialLogin } from "../hooks/useSocialLogin";
import { errorMessage } from "../utils/errors";
import { googleClientId } from "../utils/google";
import { FormStatus } from "./FormStatus";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: Record<string, unknown>,
          ) => void;
        };
      };
    };
  }
}

const GOOGLE_TAKEN =
  "Sign in with email, then link Google";

type GoogleSignInButtonProps = {
  mode: "login" | "link";
};

export function GoogleSignInButton({ mode }: GoogleSignInButtonProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const social = useSocialLogin();
  const link = useLinkGoogle();
  const pending = mode === "link" ? link.isPending : social.isPending;
  const error = mode === "link" ? link.error : social.error;
  const success =
    mode === "link" && link.isSuccess
      ? (link.data?.message ?? "Google account linked successfully")
      : undefined;

  const onCredential = useCallback(
    (idToken: string) => {
      if (mode === "link") {
        link.mutate({ id_token: idToken });
        return;
      }

      social.mutate({ id_token: idToken });
    },
    [link, mode, social],
  );
  const onCredentialRef = useRef(onCredential);

  useEffect(() => {
    onCredentialRef.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    const host = hostRef.current;
    if (!scriptReady || !host || !googleClientId || !window.google) return;

    host.replaceChildren();
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: (response) => onCredentialRef.current(response.credential),
    });
    window.google.accounts.id.renderButton(host, {
      type: "standard",
      theme: "outline",
      size: "large",
      text: "continue_with",
      width: host.clientWidth || 360,
    });
  }, [scriptReady]);

  if (!googleClientId) return null;

  const displayError =
    error instanceof ApiError && error.status === 409 && mode === "login"
      ? GOOGLE_TAKEN
      : error
        ? errorMessage(error)
        : undefined;

  return (
    <div className="flex flex-col gap-3">
      <FormStatus error={displayError} success={success} />
      <div className="relative border border-foreground/10 bg-card px-3 py-2">
        <HudCorners size="sm" tone="ink" />
        <div
          ref={hostRef}
          className="flex min-h-10 items-center justify-center [&>div]:w-full"
        />
        {pending ? (
          <div className="mt-2 flex justify-center text-primary">
            <QuestLoader size="sm" />
          </div>
        ) : null}
      </div>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
    </div>
  );
}
