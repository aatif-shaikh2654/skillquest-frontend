import { HudCorners } from "@repo/ui/components/hud-corners";

type FormStatusProps = {
  error?: string;
  success?: string;
};

export function FormStatus({ error, success }: FormStatusProps) {
  if (!error && !success) return null;

  const isError = Boolean(error);

  return (
    <div
      role="status"
      className={
        isError
          ? "relative border border-destructive/40 bg-destructive/10 px-3.5 py-3"
          : "relative border border-primary/40 bg-primary/10 px-3.5 py-3"
      }
    >
      <HudCorners size="sm" tone={isError ? "danger" : "mint"} />
      <p
        className={
          isError
            ? "text-[10px] font-medium tracking-[0.2em] text-destructive uppercase"
            : "text-[10px] font-medium tracking-[0.2em] text-brand uppercase"
        }
      >
        {isError ? "Error" : "Clear"}
      </p>
      <p
        className={
          isError
            ? "mt-1 text-sm text-destructive"
            : "mt-1 text-sm text-foreground"
        }
      >
        {error ?? success}
      </p>
    </div>
  );
}
