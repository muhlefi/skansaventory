import { Hono } from 'hono';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { getAllVervalPeminjaman, updateVervalPeminjaman, getAllPeminjaman, showPeminjamanById, createPeminjaman, checkIsOverdue } from '../controllers/PeminjamanController';

const router = new Hono()

router.get('/', AuthMiddleware, (c) => getAllPeminjaman(c));
router.get('/verval', AuthMiddleware, (c) => getAllVervalPeminjaman(c));
router.get('/check-overdue', AuthMiddleware, (c) => checkIsOverdue(c));
router.get('/:id', AuthMiddleware, (c) => showPeminjamanById(c))
router.post('/', AuthMiddleware, (c) => createPeminjaman(c))
router.put('/verval/:id', AuthMiddleware, (c) => updateVervalPeminjaman(c));

export const PeminjamanRoutes = router;
