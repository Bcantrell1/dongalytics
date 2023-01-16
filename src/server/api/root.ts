import { createTRPCRouter } from "./trpc";
import { discordRouter } from "./routers/discord";
import { userRouter } from "./routers/user";
import { steamRouter } from "./routers/steam";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  discord: discordRouter,
  steam: steamRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
