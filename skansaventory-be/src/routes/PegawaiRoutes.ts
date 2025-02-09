import { Hono } from 'hono';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { createPegawai, deletePegawai, getAllPegawai, showPegawaiById, updatePegawai, getCombobox} from '../controllers/PegawaiController';

const router = new Hono()

router.get('/combobox', AuthMiddleware, (c) => getCombobox(c));
router.get('/', AuthMiddleware, (c) => getAllPegawai(c));
router.get('/:id', AuthMiddleware, (c) =>showPegawaiById(c));
router.post('/', AuthMiddleware, (c) => createPegawai(c));
router.post('/:id', AuthMiddleware, (c) => updatePegawai(c));
router.delete('/:id', AuthMiddleware, (c) => deletePegawai(c));

export const PegawaiRoutes = router;
