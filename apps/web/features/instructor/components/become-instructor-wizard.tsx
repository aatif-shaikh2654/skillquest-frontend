"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ApiError } from "@/lib/axios";
import { useBecomeInstructor } from "../hooks/use-become-instructor";
import {
  becomeInstructorSchema,
  type BecomeInstructorValues,
} from "../schemas";
import {
  FIELD_STAGE,
  slam,
  STAGES,
  type StageField,
} from "../utils/constants";
import { WizardFrame } from "./wizard-frame";
import { WizardQuestion } from "./wizard-question";

export function BecomeInstructorWizard() {
  const reduced = useReducedMotion();
  const become = useBecomeInstructor();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<BecomeInstructorValues>>({});
  const [direction, setDirection] = useState(1);

  const stage = STAGES[step];
  const blocked = become.isPending;
  const error =
    become.error instanceof ApiError && become.error.status !== 409
      ? become.error.message
      : undefined;

  function goTo(nextStep: number) {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  }

  function choose(value: string) {
    if (!stage || blocked) return;

    const nextAnswers = { ...answers, [stage.field]: value };
    setAnswers(nextAnswers);

    if (step < STAGES.length - 1) {
      goTo(step + 1);
      return;
    }

    const parsed = becomeInstructorSchema.safeParse(nextAnswers);
    if (!parsed.success) return;

    become.mutate(parsed.data, {
      onError: (cause) => {
        if (!(cause instanceof ApiError) || cause.status !== 422) return;
        const field = cause.field as StageField | undefined;
        if (field && field in FIELD_STAGE) goTo(FIELD_STAGE[field]);
      },
    });
  }

  if (!stage) return null;

  const offset = reduced ? 0 : 48 * direction;

  return (
    <WizardFrame step={step} blocked={blocked}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={stage.field}
          className="flex flex-1 flex-col"
          custom={direction}
          initial={reduced ? false : { opacity: 0, x: offset }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, x: -offset }}
          transition={slam}
        >
          <WizardQuestion
            stage={stage}
            selected={answers[stage.field]}
            error={error}
            disabled={blocked}
            onBack={step > 0 ? () => goTo(step - 1) : undefined}
            onChoose={choose}
          />
        </motion.div>
      </AnimatePresence>
    </WizardFrame>
  );
}
