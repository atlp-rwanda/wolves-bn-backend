import express from 'express';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import router from './routes/index';
import swaggerDocument from '../swagger.json';
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`);
});

export default app;
