import express from 'express';
import passport from 'passport';
import { userValidate } from '../validators/userValidation';
import { usersiginValidate } from '../validators/usersiginValidation';
import validateTrip from '../validators/tripvalidator';
import roleValidate from '../validators/roleValidator';
import auth from '../middleware/auth';
import usercontroller from '../controllers/user';
<<<<<<< HEAD
import statusValidate from '../validators/statusValidator';
import trip from '../controllers/request';
=======
import Accomodation from '../controllers/accomodation';
>>>>>>> create and update accomodation
import Password from '../controllers/password';
import userAuth from '../controllers/userAuth';
import isManager from '../middleware/isManager';
import rolesSettingsRoute from '../controllers/user.roles';
import checkAuth from '../middleware/checkauth';
import Trip from '../controllers/tripController';
import { isRequester } from '../middleware/isRequester';
import isAdmin from '../middleware/isAdmin';
import search from '../controllers/search';

import commentController from '../controllers/comment';

import commentValidator from '../validators/commentValidator';

const router = express.Router();
router.use(express.json());

router.get('/api/', (req, res) => res.send('Welcome to barefoot Nomad'));

router.post('/api/users/signup', userValidate, usercontroller.signup);
router.patch('/api/users/settings', isAdmin.verifyAdmin, roleValidate, rolesSettingsRoute.roleController);
router.get('/api/profiles/:id', usercontroller.getProfile);
router.put('/api/profiles/:id', userValidate, usercontroller.updateProfile);
router.get('/api/users/logout', auth, usercontroller.logout);

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
router.post('/api/accommodations', checkAuth.verifyUser,
// multerUploads,
  Accomodation.createAccommodation);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/cb',
  passport.authenticate('google'),
  userAuth.authUser
);

router.post('/api/users/signin', usersiginValidate, usercontroller.signIn);
router.get('/api/trips', checkAuth.verifyUser, Trip.Requests);

router.post('/api/trips', checkAuth.verifyUser, isRequester, validateTrip, Trip.createTrips);
router.patch('/api/trips/:id', checkAuth.verifyUser, isRequester, validateTrip, Trip.updateTrip);
router.delete('/api/trips/:id', checkAuth.verifyUser, isRequester, Trip.deleteTrip);

router.get('/user/confirmation/:email', usercontroller.updateUser);

router.get('/api/trips/search', search.searchEngine);
// comment
router.post('/api/trips/:id/comment', checkAuth.verifyUser, commentValidator, commentController.postComment);
router.get('/api/trips/:id/comments/:tripId', checkAuth.verifyUser, commentController.list);
router.delete('/api/trips/:id/comments', checkAuth.verifyUser, commentController.deleteComment);
// signin

router.post('/api/users/signin', usersiginValidate, usercontroller.signIn);
router.get('/user/confirmation/:email', usercontroller.updateUser);

// user requesting trip
router.patch('/api/users/tripRequest/:id', checkAuth.verifyUser, isManager, statusValidate, trip.updateTripRequest);

router.post('/api/trips', checkAuth, isRequester, validateTrip, Trip.createTrips);
router.patch('/api/trips/:id', checkAuth, isRequester, validateTrip, Trip.updateTrip);
router.delete('/api/trips/:id', checkAuth, isRequester, Trip.deleteTrip);
router.put('/api/accomomdations/:acc_id', checkAuth.verifyUser, Accomodation.editAccommodation);
export default router;
