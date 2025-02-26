import { Hono } from 'hono';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { getDashboardData } from '../controllers/DashboardController';

const router = new Hono()

router.get('/', AuthMiddleware, (c) => getDashboardData(c));

export const DashboardRoutes = router;
