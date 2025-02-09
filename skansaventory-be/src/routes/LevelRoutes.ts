import { Hono } from 'hono';
import {getCombobox} from '../controllers/LevelController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const router = new Hono()

router.get('/combobox', AuthMiddleware, (c) => getCombobox(c));

export const LevelRoutes = router;
