import { Hono } from "hono";
import { login, logout, refreshToken } from "../controllers/AuthController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const router = new Hono();

router.post("/login", login);
router.post("/logout", AuthMiddleware, logout);
router.post("/refresh-token", refreshToken);
router.get('/verify-token', AuthMiddleware, (c) => {
    const user = (c.get as (key: string) => unknown)('user');
    return c.json({ message: 'You have access!', data: user });
});

export const AuthRoutes = router;
