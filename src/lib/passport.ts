import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import { env } from '../env/server.mjs';

passport.serializeUser(function(user, done) {
	done(null, user);
});
  
passport.deserializeUser(function(obj: any, done) {
	done(null, obj);
});

passport.use(new SteamStrategy({
	returnURL: `http://localhost:3000/api/auth/return`,
	realm: `http://localhost:3000`,
	apiKey: env.STEAM_API_KEY
}, async(_: any, profile: any, done: any) => {
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
