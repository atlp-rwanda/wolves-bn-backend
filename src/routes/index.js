/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import { userValidate } from '../middleware/userValidation';
import { usersiginValidate } from '../middleware/usersiginValidation';
import usercontroller from '../controllers/user';
import Password from '../controllers/password';

const router = express.Router();
router.use(express.json());
router.get('/', (req, res) => {
  res.send('Get endpoint is working');
});
router.post('/api/users/signup', userValidate, usercontroller.signup);

router.post('/api/users/forgotPassword', Password.forgotPassword);
router.post('/api/users/resetPassword/:resetLinkToken', Password.resetPassword);

// router.post('/user', createUser);

// signin

router.post('/api/users/signin', usersiginValidate, usercontroller.signIn);

export default router;
