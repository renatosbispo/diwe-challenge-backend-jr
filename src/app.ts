import express from 'express';
import helmet from 'helmet';
import { AuthMiddleware, ErrorMiddleware } from './middlewares';
import { LoginRoute, StatusRoute, TypeRoute } from './routes';

const app = express();

app.use(express.json());
app.use(helmet());

// Routes
app.use('/login', new LoginRoute().router);

app.use(AuthMiddleware.verifyToken);

// Protected routes
app.use('/types', new TypeRoute().router);
app.use('/statuses', new StatusRoute().router);

app.use(ErrorMiddleware.handleError);

export default app;
