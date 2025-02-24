import prisma from "../../prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { Context } from "hono";
import bcrypt from "bcrypt";

const SECRET_KEY = new TextEncoder().encode(
  "b876tdrfcgvhhy87t6r75e4srdcgvhyfr65e4w3waezdxfcgfd5srxtcyf"
);

export const blacklistedTokens = new Set<string>();

export const login = async (c: Context) => {
  const { username, password } = await c.req.json();

  const user = await prisma.petugas.findUnique({
    where: { username },
    include: {
      level: true,
      pegawai: true,
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return c.json({ error: "Invalid credentials" }, 400);
  }

  const accessToken = await new SignJWT({
    id_petugas: user.id_petugas,
    id_pegawai: user.id_pegawai,
    username: user.username,
    role: user.level?.nama_level || "Unknown",
    name: user.pegawai?.nama_pegawai || "Unknown",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(SECRET_KEY);

  const refreshToken = await new SignJWT({
    id_petugas: user.id_petugas,
    id_pegawai: user.id_pegawai,
    username: user.username,
    role: user.level?.nama_level || "Unknown",
    name: user.pegawai?.nama_pegawai || "Unknown",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET_KEY);

  return c.json({ token: accessToken, refreshToken });
};

export const logout = async (c: Context) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) return c.json({ error: "Unauthorized" }, 401);

  const token = authHeader.split(" ")[1];

  blacklistedTokens.add(token);

  return c.json({ message: "Logout successful" });
};

export const refreshToken = async (c: Context) => {
  const { refreshToken } = await c.req.json();
  
  try {
    const { payload } = await jwtVerify(refreshToken, SECRET_KEY);
    const newAccessToken = await new SignJWT({
      id_petugas: payload.id_petugas,
      id_pegawai: payload.id_pegawai,
      username: payload.username,
      role: payload?.role || "Unknown",
      name: payload?.name || "Unknown",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(SECRET_KEY);

    return c.json({ token: newAccessToken });
  } catch (error) {
    return c.json({ error: "Invalid or expired refresh token" }, 401);
  }
};