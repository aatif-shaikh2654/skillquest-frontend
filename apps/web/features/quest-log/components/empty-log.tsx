import Link from "next/link";
import { enrolledQuests } from "../quest-log-data";

const RULES = 9;

export function EmptyLog() {
  if (enrolledQuests.length > 0) return null;

  return (
    <section aria-label="Empty log" className="mt-8">
      <ol>
        {Array.from({ length: RULES }, (_, index) => (
          <li
            key={index}
            className="grid grid-cols-[2.5rem_1fr] items-center border-b border-foreground/10"
          >
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            {index === 3 ? (
              <p className="py-3 text-sm text-muted-foreground">
                No quests in the log. When you take a drop, it lands here.
              </p>
            ) : index === 4 ? (
              <p className="py-3">
                <Link
                  href="/#courses"
                  className="text-sm font-medium text-brand underline underline-offset-4"
                >
                  Open the board
                </Link>
              </p>
            ) : (
              <span className="h-11" />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
