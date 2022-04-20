import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(express.json());
app.use(helmet());

// TODO: Routes
app.get('/ping', (_req, res) => res.status(200).json({ message: 'pong' }));

export default app;
