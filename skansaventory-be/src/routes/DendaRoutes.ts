import { Hono } from 'hono';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { getAllDenda, getAllVervalDenda, getDendaById, updateDendaStatus } from '../controllers/DendaController';

const router = new Hono()

router.get('/', AuthMiddleware, (c) => getAllDenda(c));
router.get('/verval-denda', AuthMiddleware, (c) => getAllVervalDenda(c));
router.get('/:id', AuthMiddleware, (c) => getDendaById(c));
router.put('/verval/:id', AuthMiddleware, (c) => updateDendaStatus(c));

export const DendaRoutes = router;
