/* eslint-disable import/named */
import express from 'express';
import passport from 'passport';
import { userValidate } from '../validators/userValidation';
import { usersiginValidate } from '../validators/usersiginValidation';
import validateTrip from '../validators/tripvalidator';
import roleValidate from '../validators/roleValidator';
import validateAccommodation from '../validators/accommodationValidator';
import validateRoom from '../validators/roomValidator';
import auth from '../middleware/auth';
import usercontroller from '../controllers/user';
import Accomodation from '../controllers/accomodation';
import Room from '../controllers/room';
import Password from '../controllers/password';
import userAuth from '../controllers/userAuth';
import rolesSettingsRoute from '../controllers/user.roles';
import checkAuth from '../middleware/checkAuth';
import Trip from '../controllers/tripController';
import { isRequester } from '../middleware/isRequester';
import { updateTripRequest } from '../controllers/request';
import isManager from '../middleware/isManager';
import statusValidate from '../validators/statusValidator';
import isAdmin from '../middleware/isAdmin';
import search from '../controllers/search';
import Notifications from '../controllers/notification';

import commentController from '../controllers/comment';
import commentValidator from '../validators/commentValidator';
import like from '../controllers/like';
import feedbacks from '../controllers/feedbacks';
import rating from '../controllers/rating';

const router = express.Router();
router.use(express.json());

router.get('/api/', (req, res) => res.send('Welcome to barefoot Nomad'));

router.post('/api/users/signup', userValidate, usercontroller.signup);
router.patch('/api/users/settings', isAdmin.verifyAdmin, roleValidate, rolesSettingsRoute.roleController);
router.get('/api/profiles/:id', usercontroller.getProfile);
router.put('/api/profiles', checkAuth.verifyUser, userValidate, usercontroller.updateProfile);
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
// Notifications
router.get('/api/notifications', checkAuth.verifyUser, Notifications.getAllNotifications);

router.post('/api/users/signin', usersiginValidate, usercontroller.signIn);
router.get('/api/trips', checkAuth.verifyUser, Trip.Requests);

router.post('/api/trips', checkAuth.verifyUser, isRequester, validateTrip, Trip.createTrips);
router.patch('/api/trips/:id', checkAuth.verifyUser, isRequester, validateTrip, Trip.updateTrip);
router.delete('/api/trips/:id', checkAuth.verifyUser, isRequester, Trip.deleteTrip);

router.get('/user/confirmation/:email', usercontroller.updateUser);
router.put('/api/trips/:id', checkAuth.verifyUser, isManager, statusValidate, updateTripRequest);

router.get('/api/trips/search', search.searchEngine);
// comment
router.post('/api/trips/:id/comment', checkAuth.verifyUser, commentValidator, commentController.postComment);
router.get('/api/trips/:id/comments/:tripId', checkAuth.verifyUser, commentController.list);
router.delete('/api/trips/:id/comments', checkAuth.verifyUser, commentController.deleteComment);

router.patch('/api/accommodations/:acc_id', checkAuth.verifyUser, Accomodation.editAccommodation);
router.get('/api/accommodations/:acc_id', checkAuth.verifyUser, Accomodation.getAccommodation);
router.put('/api/accommodations/:acc_id', checkAuth.verifyUser, validateAccommodation, Accomodation.editAccommodation);
router.delete('/api/accommodations/:acc_id', checkAuth.verifyUser, Accomodation.deleteAccommodation);
router.post('/api/accommodations', checkAuth.verifyUser, validateAccommodation, Accomodation.createAccommodation);
router.get('/api/accommodations', checkAuth.verifyUser, Accomodation.getAccommodations);
router.post('/api/accommodations/:acc_id/rooms', checkAuth.verifyUser, validateRoom, Room.createRoom);
router.delete('/api/accommodations/:acc_id/rooms/:room_id', checkAuth.verifyUser, Room.deleteRoom);

router.get('/api/accommodation/:acc_id/likeOrUnlike', checkAuth.verifyUser, isRequester, like.likeOrUnlike);
router.post('/api/accommodation/:acc_id/feedback', checkAuth.verifyUser, isRequester, feedbacks.feedback);
router.post('/api/accommodation/:acc_id/rating', checkAuth.verifyUser, isRequester, rating.rating);

export default router;
