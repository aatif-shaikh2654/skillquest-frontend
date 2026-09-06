import { z } from "zod";

const emailField = z
  .email("Enter a valid email")
  .transform((value) => value.trim().toLowerCase());

export const emailSchema = z.object({
  email: emailField,
});

export const loginSchema = emailSchema;

export const signupSchema = z.object({
  full_name: z.string().min(2, "Enter your full name"),
  email: emailField,
  acceptTerms: z
    .boolean()
    .refine((value) => value, { error: "Accept the terms to continue" }),
});

export const verifyOtpSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Enter the code from your email"),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
export type EmailValues = z.infer<typeof emailSchema>;
export type VerifyOtpValues = z.infer<typeof verifyOtpSchema>;
