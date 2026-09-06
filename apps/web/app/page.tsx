import { getCurrentUser } from "@/features/auth/server";
import { LandingPage } from "@/features/landing";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await getCurrentUser();

  return <LandingPage user={user} />;
}
