import type { AdminUser } from "@repo/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { PasswordInput } from "@repo/ui/components/password-input";
import { toast } from "@repo/ui/lib/toast";
import { useAdminLogin } from "../hooks/useAdminLogin";
import { loginSchema, type LoginValues } from "../utils/schemas";
import { FormStatus } from "./FormStatus";

type LoginFormProps = {
  onSuccess: (user: AdminUser) => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const login = useAdminLogin();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit((values) =>
        login.mutate(values, {
          onSuccess: (response) => {
            toast.success("Signed in");
            onSuccess(response.data);
          },
        }),
      )}
      noValidate
    >
      <FormStatus error={login.error?.message} />

      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                size="form"
                type="email"
                autoComplete="email"
                placeholder="admin@email.com"
                aria-invalid={fieldState.invalid || undefined}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput
                {...field}
                id="password"
                size="form"
                autoComplete="current-password"
                placeholder="Your password"
                aria-invalid={fieldState.invalid || undefined}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" size="form" loading={login.isPending}>
        Sign in
      </Button>
    </form>
  );
}
