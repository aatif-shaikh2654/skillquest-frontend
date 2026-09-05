import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  full_name: z.string().min(2, "Enter your full name"),
  email: z.email("Enter a valid email"),
  phone_number: z
    .string()
    .regex(/^\d{10}$/, "Enter a 10-digit phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  acceptTerms: z
    .boolean()
    .refine((value) => value, { error: "Accept the terms to continue" }),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
