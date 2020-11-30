/* eslint-disable import/no-cycle */
/* eslint-disable import/named */
import express from 'express';
import passport from 'passport';
import { userValidate } from '../validators/userValidation';
import { userSignInValidate } from '../validators/userSignInValidation';
import validateTrip from '../validators/tripvalidator';
import roleValidate from '../validators/roleValidator';
import validateAccommodation from '../validators/accommodationValidator';
import validateRoom from '../validators/roomValidator';
import usercontroller from '../controllers/user';
import profileController from '../controllers/profile';
import Accomodation from '../controllers/accomodation';
import Room from '../controllers/room';
import Destination from '../controllers/destination';
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
import reservation from '../controllers/reservationController';
import reserveValidator from '../validators/reservationValidator';
import readNotifications from '../controllers/readNotifications';

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => res.send('Welcome to barefoot Nomad'));

router.post('/api/users/signup', userValidate, usercontroller.signup);

router.post('/api/users/signin', userSignInValidate, usercontroller.signIn);
router.patch('/api/users/settings', isAdmin.verifyAdmin, roleValidate, rolesSettingsRoute.roleController);
router.get('/api/profiles', checkAuth.verifyUser, profileController.getProfile);
router.put('/api/profiles', checkAuth.verifyUser, userValidate, profileController.updateProfile);
router.get('/api/users/logout', checkAuth.verifyUser, usercontroller.logout);

router.post('/api/users/forgotPassword', Password.forgotPassword);
router.post('/api/users/resetPassword/:resetLinkToken', Password.resetPassword);
router.get('/user/confirmation/:email', usercontroller.updateUser);

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
router.get('/api/notifications', checkAuth.verifyUser, Notifications.getAllNotifications);
router.get('/api/notifications/markRead/:notif_id', checkAuth.verifyUser, readNotifications.singleNotification);
router.get('/api/notifications/markReadAll/', checkAuth.verifyUser, readNotifications.readAllNotification);

router.get('/api/trips', checkAuth.verifyUser, Trip.Requests);
router.post('/api/trips', checkAuth.verifyUser, isRequester, validateTrip, Trip.createTrips);
router.patch('/api/trips/:id', checkAuth.verifyUser, isRequester, validateTrip, Trip.updateTrip);
router.delete('/api/trips/:id', checkAuth.verifyUser, isRequester, Trip.deleteTrip);
router.put('/api/trips/:id', checkAuth.verifyUser, isManager, statusValidate, updateTripRequest);
router.get('/api/trips/search', search.searchEngine);

router.post('/api/trips/:id/comment', checkAuth.verifyUser, commentValidator, commentController.postComment);
router.get('/api/trips/:id/comments/:tripId', checkAuth.verifyUser, commentController.list);
router.delete('/api/trips/:tripId/comments/:id', checkAuth.verifyUser, commentController.deleteComment);

router.post('/api/accommodations', checkAuth.verifyUser, Accomodation.createAccommodation);
router.get('/api/accommodations/:acc_id', checkAuth.verifyUser, Accomodation.getAccommodation);
router.put('/api/accommodations/:acc_id', checkAuth.verifyUser, validateAccommodation, Accomodation.editAccommodation);
router.delete('/api/accommodations/:acc_id', checkAuth.verifyUser, Accomodation.deleteAccommodation);
router.post('/api/accommodations', checkAuth.verifyUser, validateAccommodation, Accomodation.createAccommodation);
router.get('/api/accommodations', checkAuth.verifyUser, Accomodation.getAccommodations);
router.post('/api/accommodations/:acc_id/rooms', checkAuth.verifyUser, validateRoom, Room.createRoom);
router.delete('/api/accommodations/:acc_id/rooms/:room_id', checkAuth.verifyUser, Room.deleteRoom);
router.get('/user/confirmation/:email', usercontroller.updateUser);

router.get('/api/accommodation/:acc_id/likeOrUnlike', checkAuth.verifyUser, isRequester, like.likeOrUnlike);
router.post('/api/accommodation/:acc_id/feedback', checkAuth.verifyUser, isRequester, feedbacks.feedback);
router.post('/api/accommodation/:acc_id/rating', checkAuth.verifyUser, isRequester, rating.rating);

router.post('/api/reservations', checkAuth.verifyUser, isRequester, reserveValidator, reservation.reserveRoom);
router.patch('/api/reservations/:booking_id', checkAuth.verifyUser, isRequester, reserveValidator, reservation.updateReservation);
router.get('/api/reservations', checkAuth.verifyUser, isRequester, reservation.getReservations);
router.delete('/api/reservations/:booking_id', checkAuth.verifyUser, isRequester, reservation.deleteReservation);

router.get('/api/trips/statistics/:start_time/:end_time', checkAuth.verifyUser, Trip.statsTrips);
router.post('/api/accommodation/:acc_id/rating', checkAuth.verifyUser, isRequester, rating.rating);
router.get('/api/topdestinations', checkAuth.verifyUser, Destination.mostVisited);

export default router;
