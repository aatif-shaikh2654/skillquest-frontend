import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ApiError } from "@/lib/axios";

export function isEmailTakenError(error: unknown) {
  return (
    error instanceof ApiError &&
    error.status === 409 &&
    error.message.toLowerCase().includes("already exists")
  );
}

export function applyApiFieldError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
) {
  if (!(error instanceof ApiError) || !error.field) return;

  const field = error.field as Path<T>;
  const separator = error.message.indexOf(":");
  const message =
    separator >= 0
      ? error.message.slice(separator + 1).trim()
      : error.message;

  setError(field, { message });
}

export function errorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  return "Something went wrong. Try again.";
}
