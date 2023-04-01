import axios from "axios";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { createTRPCRouter, publicProcedure} from "../trpc";

export const openDotaRouter = createTRPCRouter({
  
    /* Hero API Calls */
  getHeroesStats: publicProcedure 
    .query(async ()=> {
      const heroStats = await axios.get(`${env.OPENDOTA_API_URL}/heroStats`);

    if (heroStats.data.length === 0) {
      return [];
    }

      return heroStats.data;
    }),

  /* Constant API Calls */
  getConstHeroes: publicProcedure 
    .query(async ()=> {
      const heroes = await axios.get(`${env.OPENDOTA_API_URL}/constants/heroes`);

    if (heroes.data.length === 0) {
      return [];
    }

      return heroes.data;
    }),

  /* Player API Calls */
  getPlayerHeroMatches: publicProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input})=> {
      const heroInfo = await axios.get(`${env.OPENDOTA_API_URL}/players/${ctx.session?.user?.steamId}/matches?significant=0&game_mode=23&hero_id=${input.id}`);

      if(heroInfo.data.length === 0) {
        return [];
      }

      return heroInfo.data;
    }),
  getPlayerRecentMatches: publicProcedure
    .input(z.object({limit: z.number()}))
    .query(async ({ctx, input})=> {
      const recentMatches = await axios.get(`${env.OPENDOTA_API_URL}/players/${ctx.session?.user?.steamId}/matches?significant=0&game_mode=23&limit=${input.limit}`);

      if(recentMatches.data.length === 0) {
        return [];
      }

      return recentMatches.data;
    }),
  getProfile: publicProcedure 
    .query(async ({ctx})=> {
        const profile = await axios.get(`${env.OPENDOTA_API_URL}/players/${ctx.session?.user?.steamId}`);

        if(profile.data.length === 0) {
          return [];
        }

        return profile.data;

    }), 

  /* Match API Calls */
  getMatchDetails: publicProcedure 
    .input(z.object({matchId: z.number()}))
    .query(async ({input})=> {
      const matchDetails = await axios.get(`${env.OPENDOTA_API_URL}/matches/${input.matchId}`);

    if (matchDetails.data.length === 0) {
      return [];
    }

      return matchDetails.data;
    }),
});
