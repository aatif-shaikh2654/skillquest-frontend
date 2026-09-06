import { QuestLoader } from "@repo/ui/components/quest-loader";
import { cn } from "@repo/ui/lib/utils";

type QuestLoadingScreenProps = {
  className?: string;
};

export function QuestLoadingScreen({ className }: QuestLoadingScreenProps) {
  return (
    <main
      aria-busy="true"
      className={cn(
        "relative grid min-h-svh place-items-center overflow-hidden bg-background px-4",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklch, var(--teal) 18%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--teal) 18%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative z-10">
        <QuestLoader size="lg" className="text-primary" />
      </div>
    </main>
  );
}
