import { Hono } from 'hono';
import { login } from '../controllers/AuthController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const router = new Hono();

router.post('/login', login);
router.get('/verify-token', AuthMiddleware, (c) => {
    const user = (c.get as (key: string) => unknown)('user');
    return c.json({ message: 'You have access!', user });
});

export const AuthRoutes = router;
