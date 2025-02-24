import { Context } from 'hono'
import { z } from 'zod';
import prisma from "../../prisma/client";
import { baseResponse } from '../helpers/BaseResponse';
import { handlePaginate } from '../helpers/HandlePaginate';
import bcrypt from 'bcrypt';

export const getAllPetugas = async (c: Context) => {
    try {
        const page = parseInt(c.req.query('page') || '1', 10)
        const perPage = parseInt(c.req.query('perPage') || '10', 10)
        const search = c.req.query('search') || ''

        const result = await handlePaginate(
            prisma.petugas,
            {
                deleted_at: null,
                OR: [
                    {
                        nama_petugas: { contains: search },
                    },
                    {
                        username: { contains: search },
                    },
                ],
            },
            {},
            page,
            perPage
        )

        return baseResponse.success(c, result)
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`)
    }
}

export const showPetugasById = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const petugas = await prisma.petugas.findUnique({
            where: {
                id_petugas: Number(id),
                deleted_at: null
            },
        });

        if (!petugas) {
            return baseResponse.error(c, 'Petugas not found');
        }

        return baseResponse.show(c, petugas);

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function createPetugas(c: Context) {
    try {
        const body = await c.req.json();
        const rules = z.object({
            nama: z.string().min(1),
            username: z.string().min(1),
            password: z.string().min(1),
            id_level: z.number().min(1),
            id_pegawai: z.number().min(1)
        }).parse(body);

        if (await prisma.petugas.findFirst({ where: { nama_petugas: rules.nama, username: rules.username, deleted_at: null } })) {
            return baseResponse.error(c, 'Name or username is already in use.');
        }

        const hashedPassword = await bcrypt.hash(rules.password, 8);

        const result = await prisma.petugas.create({
            data: {
                nama_petugas: rules.nama,
                username: rules.username,
                password: hashedPassword,
                id_level: rules.id_level,
                id_pegawai: rules.id_pegawai,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });

        if (result) {
            const { password, ...responseData } = result;
            return baseResponse.created(c, responseData);
        } else {
            return baseResponse.error(c, 'Failed to create petugas');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function updatePetugas(c: Context) {
    try {
        const id = parseInt(c.req.param('id'));
        const body = await c.req.json();
        const rules = z.object({
            nama: z.string().min(1),
            username: z.string().min(1),
            password: z.string().min(1),
            id_level: z.number().min(1),
            id_pegawai: z.number().min(1)
        }).parse(body);

        if (await prisma.petugas.findFirst({ where: { nama_petugas: rules.nama, username: rules.username, deleted_at: null, id_petugas: { not: id } } })) {
            return baseResponse.error(c, 'Name or username is already in use.');
        }

        const hashedPassword = await bcrypt.hash(rules.password, 8);

        const result = await prisma.petugas.update({
            where: { id_petugas: id },
            data: {
                nama_petugas: rules.nama,
                username: rules.username,
                password: hashedPassword,
                id_level: rules.id_level,
                id_pegawai: rules.id_pegawai,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });

        if (result) {
            const { password, ...responseData } = result;
            return baseResponse.updated(c, responseData);
        } else {
            return baseResponse.error(c, 'Failed to update petugas');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function deletePetugas(c: Context) {
    try {
        const id = parseInt(c.req.param('id'));
        const result = await prisma.petugas.update({
            where: { id_petugas: id },
            data: {
                deleted_at: new Date()
            }
        });

        if (result) {
            return baseResponse.deleted(c);
        } else {
            return baseResponse.error(c, 'Failed to delete petugas');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function getCombobox(c: Context) {
    try {
        const result = await prisma.petugas.findMany({
            select: { id_petugas: true, nama_petugas: true },
            where: { deleted_at: null },
            orderBy: { id_petugas: 'desc' },
        });

        const formattedResult = result.map(j => ({
            value: j.id_petugas,
            label: j.nama_petugas
        }));

        return baseResponse.success(c, formattedResult);
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
} 