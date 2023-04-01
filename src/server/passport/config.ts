import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import { env } from '../../env/server.mjs';
import { prisma } from '../../server/db';

passport.serializeUser(function(user: any, done: any) {
	done(null, user);
});

passport.deserializeUser(function(obj: any, done: any) {
	done(null, obj);
});

passport.use(new SteamStrategy({
	returnURL:`${env.NEXTAUTH_URL}/api/auth/return`,
	realm: `${env.NEXTAUTH_URL}`,
	apiKey: env.STEAM_API_KEY
}, async (identifier: any, profile: any, done: any) => {
	profile.identifier = identifier;
	const userData = {
		id: profile.id,
		displayName: profile.displayName,
		avatarfull: profile._json.avatarfull,
		profileurl: profile._json.profileurl,
	};

	let user = await prisma.user.findFirst({
		where: {
			steamId: userData.id
		}
	});

	if (user) {
		console.log('already a user');
	} else {
		console.log('new user');
	}

	return done(null, userData);
}));

export default passport;
