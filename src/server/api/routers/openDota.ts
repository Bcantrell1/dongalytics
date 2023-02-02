import axios from "axios";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { createTRPCRouter, protectedProcedure} from "../trpc";

export const openDotaRouter = createTRPCRouter({
  
  /* Profile API Calls */
  getProfile: protectedProcedure
    .query(async ({ctx})=> {
      const profile = await axios.get(`${env.OPENDOTA_API_URL}/players/${ctx.session?.user?.steamId}`);

      return profile.data;
    }), 

  /* Hero API Calls */
  getHeroesStats: protectedProcedure 
    .query(async ()=> {
      const heroStats = await axios.get(`${env.OPENDOTA_API_URL}/heroStats`);

      return heroStats.data;
    }),

  /* Constant API Calls */
  getConstHeroes: protectedProcedure 
    .query(async ()=> {
      const heroes = await axios.get(`${env.OPENDOTA_API_URL}/constants/heroes`);

      return heroes.data;
    }),

  /* Player API Calls */
  getPlayerHeroMatches: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input})=> {
      const heroInfo = await axios.get(`${env.OPENDOTA_API_URL}/players/${ctx.session?.user?.steamId}/matches?significant=0&game_mode=23&hero_id=${input.id}`);

      console.log(heroInfo.status);

      if(heroInfo.data.length === 0) {
        return [];
      }

      return heroInfo.data;
    }),
  getPlayerRecentMatches: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input})=> {
      const recentMatches = await axios.get(`${env.OPENDOTA_API_URL}/players/${ctx.session?.user?.steamId}/recentMatches?hero_id=${input.id}`);

      return recentMatches.data;
    }),
});
