import axios from "axios";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { createTRPCRouter, protectedProcedure} from "../trpc";

export const openDotaRouter = createTRPCRouter({
  
  getProfile: protectedProcedure
    .query(async ({ctx})=> {
      const profile = await axios.get(`${env.OPENDOTA_API_URL}/players/${ctx.session?.user?.steamId}`);

      return profile.data;
    }), 
  getHeroesStats: protectedProcedure 
    .query(async ()=> {
      const heroStats = await axios.get(`${env.OPENDOTA_API_URL}/heroStats`);

      return heroStats.data;
    }),
  getHeroes: protectedProcedure 
    .query(async ()=> {
      const heroes = await axios.get(`${env.OPENDOTA_API_URL}/constants/heroes`);

      return heroes.data;
    }),
  getPlayerHeroMatches: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input})=> {
      const heroInfo = await axios.get(`${env.OPENDOTA_API_URL}/heroes/${input.id}/matches`);

      return heroInfo.data;
    }),
});
