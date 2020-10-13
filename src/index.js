import express from 'express';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import fileupload from 'express-fileupload';
import router from './routes/index';
import { socketSetup } from './helpers/events/socket';
import NotificationListener from './helpers/notifications/index';
import passport from './config/passport';
import swaggerDocument from '../swagger.json';
import 'regenerator-runtime/runtime';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(passport.initialize());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileupload({
  useTempFiles: true
}));
app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => res.status(404).send({ message: 'Not found, check well your URL' }));
const server = app.listen(PORT, () => {
  console.log('Server has started at port', PORT);
});

socketSetup(server);

NotificationListener();
export default app;
