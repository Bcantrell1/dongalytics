import passport from '../../../server/passport/config';
import router from '../../../server/passport/router';

const path = '/api/auth/login';

export default router	
	.use(path, passport.authenticate('steam', { failureRedirect: '/'}))
	.get(path, (_, res) => res.redirect('/'));
