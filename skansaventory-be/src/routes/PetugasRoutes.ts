import { Hono } from 'hono';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { createPetugas, deletePetugas, getAllPetugas, showPetugasById, updatePetugas, getCombobox} from '../controllers/PetugasController';

const router = new Hono()

router.get('/combobox', AuthMiddleware, (c) => getCombobox(c));
router.get('/', AuthMiddleware, (c) => getAllPetugas(c));
router.get('/:id', AuthMiddleware, (c) =>showPetugasById(c));
router.post('/', AuthMiddleware, (c) => createPetugas(c));
router.post('/:id', AuthMiddleware, (c) => updatePetugas(c));
router.delete('/:id', AuthMiddleware, (c) => deletePetugas(c));

export const PetugasRoutes = router;
