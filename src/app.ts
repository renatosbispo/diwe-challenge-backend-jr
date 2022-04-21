import express from 'express';
import helmet from 'helmet';
import prisma from '../prisma';

const app = express();

app.use(express.json());
app.use(helmet());

// TODO: Routes
app.get('/ping', (_req, res) => res.status(200).json({ message: 'pong' }));
app.get('/types', async (_req, res) => {
  const types = await prisma.type.findMany({ select: { name: true } });

  res.status(200).json(types.map(({ name }) => name));
});

export default app;
