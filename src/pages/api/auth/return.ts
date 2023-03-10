import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { steamID64toSteamID32 } from '../../../helpers/convert';
import { prisma } from '../../../server/db';
import passport from '../../../server/passport/config';
import router from '../../../server/passport/router';
import { authOptions } from '../auth/[...nextauth]';

const path = '/api/auth/return';

export default router
	.use(path, passport.authenticate('steam', { failureRedirect: '/login' }))
	.get(path, async (req: NextApiRequest, res: NextApiResponse) => {
		const session = await unstable_getServerSession(req, res, authOptions);
		const { user } = session;
		const steamId = await prisma.user.findUnique({ where: { id: user.id } });

		if (user && res.req.user) {
			console.log("Discord User", user);
			console.log("Steam User", res.req.user);	
		}

		if (!steamId?.steamId) {
			await prisma.user.update({
				where: { id: user.id },
				data: { 
					steamId: JSON.stringify(steamID64toSteamID32(res.req.user.id)) 
			    },
			});
		}

		res.redirect("/profile");
	});
