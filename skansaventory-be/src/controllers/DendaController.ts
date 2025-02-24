import { Context } from 'hono'
import { z } from 'zod';
import prisma from "../../prisma/client";
import { baseResponse } from '../helpers/BaseResponse';
import { handlePaginate } from '../helpers/HandlePaginate';

export const getAllDenda = async (c: Context) => {
    try {
        const page = parseInt(c.req.query('page') || '1', 10);
        const perPage = parseInt(c.req.query('perPage') || '10', 10);
        const search = c.req.query('search') || '';
        const status = c.req.query('status');

        const filter: any = {
            deleted_at: null,
            OR: [
                { peminjaman: { pegawai: { nama_pegawai: { contains: search, mode: 'insensitive' } } } },
                { peminjaman: { id_peminjaman: { equals: isNaN(Number(search)) ? undefined : Number(search) } } }
            ]
        };

        if (status === "Belum Bayar") {
            filter.status = 1;
        } else if (status === "Lunas") {
            filter.status = 2;
        }

        const result = await handlePaginate(
            prisma.denda,
            filter,
            {
                peminjaman: {
                    select: {
                        pegawai: { select: { nama_pegawai: true } },
                        status_peminjaman: true
                    }
                }
            },
            page,
            perPage
        );

        return baseResponse.success(c, result);
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
};


export const showJenisById = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const jenis = await prisma.jenis.findUnique({
            where: {
                id_jenis: Number(id),
                deleted_at: null
            }
        });

        if (!jenis) {
            return baseResponse.error(c, 'Jenis not found');
        }

        return baseResponse.show(c, jenis);

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function createJenis(c: Context) {
    try {
        const body = await c.req.json();
        const rules = z.object({
            nama: z.string().min(1),
            kode: z.string().min(1).regex(/^[^\s]+$/, { message: 'Code should not contain space' }),
            keterangan: z.string().optional()
        }).parse(body);

        if (await prisma.jenis.findFirst({ where: { kode_jenis: rules.kode, deleted_at: null } })) {
            return baseResponse.error(c, 'Jenis code is already used.');
        }

        const jenis = await prisma.jenis.create({
            data: {
                nama_jenis: rules.nama,
                kode_jenis: rules.kode,
                keterangan: rules.keterangan,
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        if (jenis) {
            return baseResponse.created(c, jenis);
        } else {
            return baseResponse.error(c, 'Failed to create jenis');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function updateJenis(c: Context) {
    try {
        const id = parseInt(c.req.param('id'));
        const body = await c.req.json();
        const rules = z.object({
            nama: z.string().min(1),
            kode: z.string().min(1).regex(/^[^\s]+$/, { message: 'Code should not contain space' }),
            keterangan: z.string().optional()
        }).parse(body);

        if (await prisma.jenis.findFirst({ where: { kode_jenis: rules.kode, id_jenis: { not: id }, deleted_at: null } })) {
            return baseResponse.error(c, 'Jenis code is already used.');
        }

        const jenis = await prisma.jenis.update({
            where: { id_jenis: id },
            data: {
                nama_jenis: rules.nama,
                kode_jenis: rules.kode,
                keterangan: rules.keterangan,
                updated_at: new Date()
            }
        });

        if (jenis) {
            return baseResponse.updated(c, jenis);
        } else {
            return baseResponse.error(c, 'Failed to update jenis');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function deleteJenis(c: Context) {
    try {
        const id = parseInt(c.req.param('id'));
        const jenis = await prisma.jenis.update({
            where: { id_jenis: id },
            data: {
                deleted_at: new Date()
            }
        });

        if (jenis) {
            return baseResponse.deleted(c);
        } else {
            return baseResponse.error(c, 'Failed to delete jenis');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function getCombobox(c: Context) {
    try {
        const jenis = await prisma.jenis.findMany({
            select: { id_jenis: true, nama_jenis: true },
            where: { deleted_at: null },
            orderBy: { id_jenis: 'desc' },
        });

        const formattedJenis = jenis.map(j => ({
            value: j.id_jenis,
            label: j.nama_jenis
        }));

        return baseResponse.success(c, formattedJenis);
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
} 