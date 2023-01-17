import axios from "axios";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const openDotaRouter = createTRPCRouter({
  
  getProfile: publicProcedure
    .query(async ({ctx})=> {
      const profile = await axios.get(`https://api.opendota.com/api/players/${ctx.session?.user?.steamId}`);

      return profile.data;
    }) 
});
