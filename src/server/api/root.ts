import { createTRPCRouter } from "./trpc";
import { discordRouter } from "./routers/discord";
import { userRouter } from "./routers/user";
import { openDotaRouter } from "./routers/openDota";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  discord: discordRouter,
  openDota: openDotaRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
