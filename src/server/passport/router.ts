import session from 'express-session';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from '../passport/config';

const router = nextConnect<NextApiRequest, NextApiResponse>();

// Passport
router.use(session({ secret: "brian" }));
router.use(passport.initialize());
router.use(passport.session());

export default router;