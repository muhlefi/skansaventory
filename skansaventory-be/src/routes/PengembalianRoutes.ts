import { Hono } from 'hono';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { getAllPengembalian } from '../controllers/PengembalianController';

const router = new Hono()

router.get('/', AuthMiddleware, (c) => getAllPengembalian(c));

export const PengembalianRoutes = router;
