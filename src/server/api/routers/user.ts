import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const userRouter = createTRPCRouter({

    getSteamId: protectedProcedure
      .query(async({ ctx }) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: ctx.session.user.id, 
          },
        });
        return user.steamId;
      }),
    
    setSteamId: protectedProcedure
      .input(z.object({ steamId: z.string() }))
      .mutation(async({ ctx, input }) => {
        const user = await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id, 
          },
          data: {
            steamId: input.steamId,
          },
        });
        return user.steamId;
      }),
  
});
