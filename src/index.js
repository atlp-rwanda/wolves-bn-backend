import express from 'express';
import 'dotenv/config';
import router from './routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`);
});

export default app;
