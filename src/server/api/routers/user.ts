import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({

    getSteamId: protectedProcedure
      .query(async({ ctx }) => {
        if (!ctx.session.user) return null; 

        const user = await ctx.prisma.user.findUnique({
          where: {
            id: ctx.session.user.id, 
          },
        });
        
        if(user) return user.steamId;

        return null;
      }),
 
    setSteamId: protectedProcedure
      .input(z.object({ steamId: z.string() }))
      .mutation(async({ ctx, input }) => {
        if (!ctx.session.user) return null;

        const user = await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id, 
          },
          data: {
            steamId: input.steamId,
          },
        });

        if(user) return user.steamId;

        return null;
      }),

		deleteSteamId: protectedProcedure
			.mutation(async({ ctx }) => {
				if (!ctx.session.user) return null;

				const user = await ctx.prisma.user.update({
					where: {
						id: ctx.session.user.id, 
					},
					data: {
						steamId: null,
					},
				});

				if(user) return user.steamId;

				return null;
			}),

});
