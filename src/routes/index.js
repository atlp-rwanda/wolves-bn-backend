import express from 'express';
import createUser from '../controllers/index';

const router = express.Router();
router.use(express.json());
// Test if endpoint works
router.get('/', (req, res) => {
  res.send('Get endpoint is working');
});
router.post('/user', createUser);
export default router;
