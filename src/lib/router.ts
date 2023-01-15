import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from './passport';
import session from 'express-session';

const router = nextConnect<NextApiRequest, NextApiResponse>();

// Passport
router.use(session({ secret: "brian" }));
router.use(passport.initialize());
router.use(passport.session());

export default router;
