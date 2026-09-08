import { HudCorners } from "@repo/ui/components/hud-corners";
import { cn } from "@repo/ui/lib/utils";
import type { Stage } from "../utils/constants";

function LongArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M26 8H3M9 2 2 8l7 6"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

type WizardQuestionProps = {
  stage: Stage;
  selected?: string;
  error?: string;
  disabled?: boolean;
  onBack?: () => void;
  onChoose: (value: string) => void;
};

export function WizardQuestion({
  stage,
  selected,
  error,
  disabled,
  onBack,
  onChoose,
}: WizardQuestionProps) {
  return (
    <>
      <h1 className="text-[1.4rem] leading-[1.15] font-bold tracking-tight text-balance sm:text-[1.75rem] lg:text-4xl">
        {stage.question}
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-[15px]">
        {stage.briefing}
      </p>

      {error ? (
        <div className="relative mt-4 border border-destructive/40 bg-destructive/10 px-3 py-3 sm:mt-6 sm:px-4">
          <HudCorners size="sm" tone="danger" />
          <p className="text-[10px] font-medium tracking-[0.2em] text-destructive uppercase">
            Hold
          </p>
          <p className="mt-1 text-sm text-destructive">{error}</p>
        </div>
      ) : null}

      <ul
        className={cn(
          "mt-5 grid gap-2 sm:mt-8 sm:gap-3",
          stage.options.length > 4 && "sm:grid-cols-2",
        )}
      >
        {stage.options.map((option, index) => {
          const active = selected === option.value;

          return (
            <li key={option.value}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onChoose(option.value)}
                className={cn(
                  "relative flex min-h-12 w-full items-center gap-3 border px-3 py-3 text-left transition-colors sm:min-h-14 sm:gap-4 sm:px-4 sm:py-4",
                  active
                    ? "border-primary bg-primary text-foreground"
                    : "border-foreground/10 bg-background hover:border-brand",
                  disabled && "opacity-60",
                )}
              >
                <HudCorners size="sm" tone={active ? "ink" : "mint"} />
                <span
                  className={cn(
                    "w-6 shrink-0 text-[10px] font-medium tracking-[0.18em] uppercase sm:w-7",
                    active ? "text-foreground/70" : "text-brand",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold tracking-tight sm:text-base">
                  {option.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {onBack ? (
        <div className="mt-5 flex justify-end sm:mt-8">
          <button
            type="button"
            disabled={disabled}
            onClick={onBack}
            aria-label="Previous stage"
            className="inline-flex h-11 w-14 items-center justify-center border-2 border-foreground bg-primary text-foreground transition-colors hover:bg-primary-hover disabled:opacity-40 sm:h-12 sm:w-16"
          >
            <LongArrowLeft className="h-4 w-7" />
          </button>
        </div>
      ) : null}
    </>
  );
}
