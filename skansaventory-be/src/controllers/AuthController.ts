import prisma from "../../prisma/client";
import { SignJWT } from 'jose';
import { Context } from 'hono';

const SECRET_KEY = new TextEncoder().encode('b876tdrfcgvhhy87t6r75e4srdcgvhyfr65e4w3waezdxfcgvygu7t6r5dsrxfcgvhg7f6d5srxyctrewa2a34srxfcgfd5srxtcyf');

export const login = async (c: Context) => {
  const { username, password } = await c.req.json();

  const user = await prisma.petugas.findUnique({
    where: { username },
    include: {
      level: true,
      pegawai: true
    }
  });

  if (!user || user.password !== password) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const result = await new SignJWT({
    id_petugas: user.id_petugas,
    username: user.username,
    role: user.level?.nama_level || "Unknown",
    name: user.pegawai?.nama_pegawai || "Unknown",
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(SECRET_KEY);

  return c.json({ result });
};