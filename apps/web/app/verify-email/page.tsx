import { redirect } from "next/navigation";

type VerifyEmailRedirectProps = {
  searchParams: Promise<{ email?: string }>;
};

export default async function VerifyEmailRedirectPage({
  searchParams,
}: VerifyEmailRedirectProps) {
  const { email } = await searchParams;
  redirect(
    email
      ? `/verify-otp?email=${encodeURIComponent(email)}`
      : "/verify-otp",
  );
}
