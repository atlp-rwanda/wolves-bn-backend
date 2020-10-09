import express from 'express';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import router from './routes/index';

import passport from './config/passport';

import swaggerDocument from '../swagger.json';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(passport.initialize());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Barefoot Nomad APIS'
}));
app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => res.status(404).send({ message: 'Not found, check well your URL' }));
app.listen(PORT, () => {
  console.log('Server has started at port', PORT);
});

export default app;
