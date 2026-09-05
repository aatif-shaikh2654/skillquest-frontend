"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type XpCounterProps = {
  value?: number;
  delay?: number;
  className?: string;
};

export function XpCounter({
  value = 5000,
  delay = 0.85,
  className,
}: XpCounterProps) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setCount(value);
      return;
    }

    let frame = 0;
    const duration = 900;
    const startAt = performance.now() + delay * 1000;

    const tick = (now: number) => {
      if (now < startAt) {
        frame = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(1, (now - startAt) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(value * eased));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [delay, reduced, value]);

  return <p className={className}>{count.toLocaleString()}+</p>;
}
