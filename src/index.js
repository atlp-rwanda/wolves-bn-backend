/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
import express from 'express';
import 'regenerator-runtime/runtime';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import fileupload from 'express-fileupload';
import path from 'path';
import redis from 'redis';
import router from './routes/index';
import NotificationListener from './helpers/notifications/index';
import socketAuth from './middleware/socketio.auth';
import chatController from './controllers/chat';

import passport from './config/passport';
import swaggerDocument from '../swagger.json';
import { socketSetup, io } from './helpers/events/socket';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(passport.initialize());
const client = redis.createClient(process.env.REDIS_PORT || 6379, process.env.REDIS_HOST, { no_ready_check: true });
client.auth(process.env.REDIS_PASSWORD, (err) => err);
client.on('error', (err) => {
  console.log(`Error ${err}`);
});
client.on('connect', () => {
  console.log('Connected to Redis');
  app.set('redis', client);
});
NotificationListener();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileupload({
  useTempFiles: true
}));

app.get('/testchat', (req, res) => {
  res.sendFile(`${__dirname}/testchat.html`);
});

io.use(socketAuth);
chatController(io);

app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => res.status(404).send({ message: 'Not found, check well your URL' }));
const server = app.listen(PORT, () => {
  console.log('Server has started at port', PORT);
});

socketSetup(server);

export default app;
