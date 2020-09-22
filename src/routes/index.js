import express from 'express';
import { userValidate } from '../middleware/userValidation';
import usercontroller from '../controllers/user';

const router = express.Router();
router.use(express.json());
router.get('/', (req, res) => {
  res.send('Get endpoint is working');
});
router.post('/api/users/signup', userValidate, usercontroller.signup);

export default router;
