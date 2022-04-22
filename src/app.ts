import express from 'express';
import helmet from 'helmet';
import { ErrorMiddleware } from './middlewares';
import { LoginRoute } from './routes';

const app = express();

app.use(express.json());
app.use(helmet());

// TODO: Routes
app.get('/ping', (_req, res) => res.status(200).json({ message: 'pong' }));

app.use('/login', new LoginRoute().router);

app.use(ErrorMiddleware.handleError);

export default app;
