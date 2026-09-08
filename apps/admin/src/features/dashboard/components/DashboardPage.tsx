import { useAuth } from "@/features/auth";
import { UsersChart } from "./UsersChart";

export function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-8">
      <UsersChart />
    </div>
  );
}
