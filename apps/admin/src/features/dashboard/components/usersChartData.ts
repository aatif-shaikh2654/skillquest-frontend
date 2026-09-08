export const USER_GROWTH = [
  { month: "Apr", users: 18, instructors: 2 },
  { month: "May", users: 27, instructors: 3 },
  { month: "Jun", users: 41, instructors: 4 },
  { month: "Jul", users: 36, instructors: 5 },
  { month: "Aug", users: 58, instructors: 6 },
  { month: "Sep", users: 72, instructors: 8 },
] as const;

const latestPoint = USER_GROWTH[USER_GROWTH.length - 1] ?? {
  users: 0,
  instructors: 0,
};

export const USER_GROWTH_STATS = {
  total: USER_GROWTH.reduce((sum, point) => sum + point.users, 0),
  latest: latestPoint.users,
  instructors: latestPoint.instructors,
} as const;
