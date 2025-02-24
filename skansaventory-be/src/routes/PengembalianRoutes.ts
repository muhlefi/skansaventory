import { Hono } from 'hono';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { getAllPengembalian, confirmReturn } from '../controllers/PengembalianController';

const router = new Hono()

router.get('/', AuthMiddleware, (c) => getAllPengembalian(c));
router.post('/:id/return-pengembalian', AuthMiddleware, (c) => confirmReturn(c));

export const PengembalianRoutes = router;
