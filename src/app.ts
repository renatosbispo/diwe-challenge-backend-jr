import express from 'express';
import helmet from 'helmet';
import { AuthMiddleware, ErrorMiddleware } from './middlewares';
import { LoginRoute } from './routes';

const app = express();

app.use(express.json());
app.use(helmet());

// Login
app.use('/login', new LoginRoute().router);

app.use(AuthMiddleware.verifyToken);
// Protected routes

app.use(ErrorMiddleware.handleError);

export default app;
