import { formatDuration, intervalToDuration } from "date-fns";
import { t } from "../trpc";
import authRouter from "./auth/auth.router";
import fieldRouter from "./field/field.router";
import userRouter from "./user/user.router";

function getReadableUptime() {
  const uptime = process.uptime();

  return formatDuration(intervalToDuration({ start: 0, end: uptime * 1000 }));
}

export const appRouter = t.router({
  getHealth: t.procedure.query(() => {
    return {
      status: "OK",
      uptime: getReadableUptime(),
      docURL: "https://www.goal-spot.com/",
      apiVersions: "1",
    };
  }),

  auth: authRouter,
  user: userRouter,
  field: fieldRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
