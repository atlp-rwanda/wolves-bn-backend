/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import passport from 'passport';
import { userValidate } from '../middleware/userValidation';
import { usersiginValidate } from '../middleware/usersiginValidation';
import roleValidate from '../middleware/roleValidator';
import usercontroller from '../controllers/user';
import Password from '../controllers/password';
import userAuth from '../controllers/userAuth';
import rolesSettingsRoute from '../controllers/user.roles';
import authValidator from '../middleware/auth.middleware';

const router = express.Router();
router.use(express.json());
router.get('/', (req, res) => {
  res.send('Get endpoint is working');
});
router.post('/api/users/signup', userValidate, usercontroller.signup);
router.patch('/api/users/settings', authValidator.verifyAdmin, roleValidate, rolesSettingsRoute.roleController);

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
// router.post('/user', createUser);

// signin

router.post('/api/users/signin', usersiginValidate, usercontroller.signIn);

router.get('/user/confirmation/:email', usercontroller.updateUser);
export default router;
