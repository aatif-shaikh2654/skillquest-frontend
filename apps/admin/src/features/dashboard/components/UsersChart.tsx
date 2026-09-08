import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@repo/ui/components/chart";
import { HudCorners } from "@repo/ui/components/hud-corners";
import { USER_GROWTH, USER_GROWTH_STATS } from "./users-chart-data";

const chartConfig = {
  users: {
    label: "Users",
    color: "var(--chart-1)",
  },
  instructors: {
    label: "Instructors",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const stats = [
  { label: "Signups", value: USER_GROWTH_STATS.total },
  { label: "This month", value: USER_GROWTH_STATS.latest },
  { label: "Instructors", value: USER_GROWTH_STATS.instructors },
] as const;

export function UsersChart() {
  return (
    <section className="relative border border-foreground/10 bg-card">
      <HudCorners size="sm" tone="ink" />
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-foreground/10 px-5 py-4">
        <div>
          <p className="text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
            Roster
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight">User growth</h2>
        </div>
        <p className="text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Last 6 months
        </p>
      </div>

      <div className="grid grid-cols-3 divide-x divide-foreground/10 border-b border-foreground/10">
        {stats.map((stat) => (
          <div key={stat.label} className="px-5 py-3">
            <p className="text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              {stat.label}
            </p>
            <p className="mt-1 text-xl font-bold tracking-tight tabular-nums">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="px-2 pt-4 pb-3 sm:px-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-[16/7] w-full min-h-[220px]"
        >
          <AreaChart
            data={[...USER_GROWTH]}
            margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fill-users" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-users)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-users)"
                  stopOpacity={0.02}
                />
              </linearGradient>
              <linearGradient id="fill-instructors" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-instructors)"
                  stopOpacity={0.28}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-instructors)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeOpacity={0.7}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={32}
              tickMargin={4}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              allowDecimals={false}
            />
            <ChartTooltip
              cursor={{ stroke: "var(--brand)", strokeDasharray: "3 3" }}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="var(--color-users)"
              fill="url(#fill-users)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="instructors"
              stroke="var(--color-instructors)"
              fill="url(#fill-instructors)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </section>
  );
}
