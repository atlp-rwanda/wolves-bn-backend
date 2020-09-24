import express from 'express';
import passport from 'passport';
import { userValidate } from '../middleware/userValidation';
import usercontroller from '../controllers/user';
import Password from '../controllers/password';
import userAuth from '../controllers/userAuth';

const router = express.Router();
router.use(express.json());
router.get('/', (req, res) => {
  res.send('Get endpoint is working');
});
router.post('/api/users/signup', userValidate, usercontroller.signup);

router.post('/api/users/forgotPassword', Password.forgotPassword);
router.post('/api/users/resetPassword/:resetLinkToken', Password.resetPassword);

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' })
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook'),
  userAuth.authUser
);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/cb',
  passport.authenticate('google'),
  userAuth.authUser
);
export default router;
