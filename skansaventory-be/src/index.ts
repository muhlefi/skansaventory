import { Hono } from 'hono';
import { cors } from 'hono/cors';
import apiRoutes from './routes/api';

const app = new Hono().basePath('/api');

app.use(cors({
  origin: 'http://localhost:5173',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.route('', apiRoutes);

export default app;
