import { Context } from 'hono'
import { z } from 'zod';
import prisma from "../../prisma/client";
import { baseResponse } from '../helpers/BaseResponse';
import { handlePaginate } from '../helpers/HandlePaginate';

/**
 * Getting all Ruang
 */
export const getAllRuang = async (c: Context) => {
    try {
        const page = parseInt(c.req.query('page') || '1', 10)
        const perPage = parseInt(c.req.query('perPage') || '10', 10)
        const search = c.req.query('search') || ''

        const result = await handlePaginate(
            prisma.ruang,
            {
                deleted_at: null,
                OR: [
                    {
                        nama_ruang: { contains: search },
                    },
                    {
                        kode_ruang: { contains: search },
                    },
                ],
            },
            page,
            perPage
        )

        return baseResponse.success(c, result)
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`)
    }
}

export const showRuangById = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const Ruang = await prisma.ruang.findUnique({
            where: {
                id_ruang: Number(id),
                deleted_at: null
            }
        });

        if (!Ruang) {
            return baseResponse.error(c, 'Ruang not found');
        }

        return baseResponse.show(c, Ruang);

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function createRuang(c: Context) {
    try {
        const body = await c.req.json();
        const rules = z.object({
            nama: z.string().min(1),
            kode: z.string().min(1).regex(/^[^\s]+$/, { message: 'Code must not contain spaces' }),
            keterangan: z.string().optional()
        }).parse(body);

        if (await prisma.ruang.findFirst({ where: { kode_ruang: rules.kode, deleted_at: null } })) {
            return baseResponse.error(c, 'Ruang code is already in use.');
        }

        const Ruang = await prisma.ruang.create({
            data: {
                nama_ruang: rules.nama,
                kode_ruang: rules.kode,
                keterangan: rules.keterangan,
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        if (Ruang) {
            return baseResponse.created(c, Ruang);
        } else {
            return baseResponse.error(c, 'Failed to create Ruang');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function updateRuang(c: Context) {
    try {
        const id = parseInt(c.req.param('id'));
        const body = await c.req.json();
        const rules = z.object({
            nama: z.string().min(1),
            kode: z.string().min(1).regex(/^[^\s]+$/, { message: 'Code must not contain spaces' }),
            keterangan: z.string().optional()
        }).parse(body);

        if (await prisma.ruang.findFirst({ where: { kode_ruang: rules.kode, id_ruang: { not: id }, deleted_at: null } })) {
            return baseResponse.error(c, 'Ruang code is already in use.');
        }

        const Ruang = await prisma.ruang.update({
            where: { id_ruang: id },
            data: {
                nama_ruang: rules.nama,
                kode_ruang: rules.kode,
                keterangan: rules.keterangan,
                updated_at: new Date()
            }
        });

        if (Ruang) {
            return baseResponse.updated(c, Ruang);
        } else {
            return baseResponse.error(c, 'Failed to update Ruang');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function deleteRuang(c: Context) {
    try {
        const id = parseInt(c.req.param('id'));
        const Ruang = await prisma.ruang.update({
            where: { id_ruang: id },
            data: {
                deleted_at: new Date()
            }
        });

        if (Ruang) {
            return baseResponse.deleted(c);
        } else {
            return baseResponse.error(c, 'Failed to delete Ruang');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function getCombobox(c: Context) {
    try {
        const Ruang = await prisma.ruang.findMany({
            select: { id_ruang: true, nama_ruang: true },
            where: { deleted_at: null },
            orderBy: { id_ruang: 'desc' },
        });

        const formattedRuang = Ruang.map(j => ({
            value: j.id_ruang,
            label: j.nama_ruang
        }));

        return baseResponse.success(c, formattedRuang);
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
} 