import express from 'express';
import helmet from 'helmet';
import prisma from '../prisma';
import { ErrorMiddleware } from './middlewares';
import { LoginRoute } from './routes';

const app = express();

app.use(express.json());
app.use(helmet());

// TODO: Routes
app.get('/ping', (_req, res) => res.status(200).json({ message: 'pong' }));

app.use('/login', new LoginRoute().router);

// Temporary endpoint definition to make sure tests are working
app.get('/types', async (_req, res) => {
  const types = await prisma.type.findMany({ select: { name: true } });

  res.status(200).json(types.map(({ name }) => name));
});

app.use(ErrorMiddleware.handleError);

export default app;
