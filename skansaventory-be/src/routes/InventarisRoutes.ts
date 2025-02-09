import { Hono } from 'hono';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { createInventaris, deleteInventaris, getAllInventaris, showInventarisById, updateInventaris, getCombobox } from '../controllers/InventarisController';

const router = new Hono()

router.get('/combobox', AuthMiddleware, (c) => getCombobox(c));
router.get('/', AuthMiddleware, (c) => getAllInventaris(c));
router.get('/:id', AuthMiddleware, (c) => showInventarisById(c));
router.post('/', AuthMiddleware, (c) => createInventaris(c));
router.post('/:id', AuthMiddleware, (c) => updateInventaris(c));
router.delete('/:id', AuthMiddleware, (c) => deleteInventaris(c));

export const InventarisRoutes = router;
