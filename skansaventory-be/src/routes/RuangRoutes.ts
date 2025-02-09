import { Hono } from 'hono';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { createRuang, deleteRuang, getAllRuang, showRuangById, updateRuang, getCombobox} from '../controllers/RuangController';

const router = new Hono()

router.get('/combobox', AuthMiddleware, (c) => getCombobox(c));
router.get('/', AuthMiddleware, (c) => getAllRuang(c));
router.get('/:id', AuthMiddleware, (c) =>showRuangById(c));
router.post('/', AuthMiddleware, (c) => createRuang(c));
router.post('/:id', AuthMiddleware, (c) => updateRuang(c));
router.delete('/:id', AuthMiddleware, (c) => deleteRuang(c));

export const RuangRoutes = router;
