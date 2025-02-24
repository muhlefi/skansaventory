import { jwtVerify } from "jose";
import { Context, Next } from "hono";

const SECRET_KEY = new TextEncoder().encode(
  "b876tdrfcgvhhy87t6r75e4srdcgvhyfr65e4w3waezdxfcgfd5srxtcyf"
);

import { blacklistedTokens } from "../controllers/AuthController";

export const AuthMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) return c.json({ error: "Unauthorized" }, 401);

  const token = authHeader.split(" ")[1];

  if (blacklistedTokens.has(token)) {
    return c.json({ error: "Token revoked" }, 401);
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    c.set("user", payload);
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
};
