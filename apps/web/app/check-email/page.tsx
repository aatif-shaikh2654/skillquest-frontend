import { redirect } from "next/navigation";

type CheckEmailRedirectProps = {
  searchParams: Promise<{ email?: string }>;
};

export default async function CheckEmailRedirectPage({
  searchParams,
}: CheckEmailRedirectProps) {
  const { email } = await searchParams;
  redirect(
    email
      ? `/verify-otp?email=${encodeURIComponent(email)}`
      : "/verify-otp",
  );
}
