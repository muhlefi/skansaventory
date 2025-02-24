import { Context } from 'hono'
import { z } from 'zod';
import prisma from "../../prisma/client";
import { baseResponse } from '../helpers/BaseResponse';
import { handlePaginateRaw } from '../helpers/HandlePaginateRaw';

export const getAllInventaris = async (c: Context) => {
    try {
        const page = parseInt(c.req.query('page') || '1', 10);
        const perPage = parseInt(c.req.query('perPage') || '10', 10);
        const search = c.req.query('search') || '';

        const result = await handlePaginateRaw(
            'v_inventaris',
            ['nama', 'kode_inventaris', 'nama_jenis', 'nama_ruang'],
            search,
            page,
            perPage
        );

        return baseResponse.success(c, result);
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
};

export const showInventarisById = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const inventaris = await prisma.inventaris.findUnique({
            where: {
                id_inventaris: Number(id),
                deleted_at: null
            }
        });

        if (!inventaris) {
            return baseResponse.error(c, 'Inventaris not found');
        }

        return baseResponse.show(c, inventaris);

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function createInventaris(c: Context) {
    try {
        const body = await c.req.json();
        const rules = z.object({
            nama: z.string().min(1),
            kode: z.string().min(1).regex(/^[^\s]+$/, { message: 'Code must not contain spaces' }),
            jumlah: z.number().min(1),
            kondisi: z.string().min(1),
            id_petugas: z.number().min(1),
            id_jenis: z.number().min(1),
            id_ruang: z.number().min(1),
        }).parse(body);

        const jenis = await prisma.jenis.findUnique({
            where: { id_jenis: rules.id_jenis },
            select: { kode_jenis: true }
        });

        if (!jenis) {
            return baseResponse.error(c, 'Jenis not found.');
        }

        const finalKodeInventaris = `${jenis.kode_jenis}-${rules.kode}`;

        if (await prisma.inventaris.findFirst({ where: { nama: rules.nama, kode_inventaris: finalKodeInventaris, deleted_at: null } })) {
            return baseResponse.error(c, 'Code or name is already in use.');
        }

        const result = await prisma.inventaris.create({
            data: {
                nama: rules.nama,
                jumlah: rules.jumlah,
                jumlah_dipinjam: 0,
                jumlah_tersedia: rules.jumlah,
                kode_inventaris: finalKodeInventaris,
                kondisi: rules.kondisi,
                id_petugas: rules.id_petugas,
                id_jenis: rules.id_jenis,
                id_ruang: rules.id_ruang,
                tanggal_register: new Date(),
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        if (result) {
            return baseResponse.created(c, result);
        } else {
            return baseResponse.error(c, 'Failed to create inventaris');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function updateInventaris(c: Context) {
    try {
        const id = parseInt(c.req.param('id'));
        const body = await c.req.json();
        const rules = z.object({
            nama: z.string().min(1),
            kode: z.string().min(1).regex(/^[^\s]+$/, { message: 'Code must not contain spaces' }),
            jumlah: z.number().min(1),
            kondisi: z.string().min(1),
            keterangan: z.string().optional(),
            id_petugas: z.number().min(1),
            id_jenis: z.number().min(1),
            id_ruang: z.number().min(1),
        }).parse(body);

        if (await prisma.inventaris.findFirst({ where: { nama: rules.nama, id_jenis: { not: id }, kode_inventaris: rules.kode, deleted_at: null, id_inventaris: { not: id } } })) {
            return baseResponse.error(c, 'Code or name is already in use.');
        }

        const result = await prisma.inventaris.update({
            where: { id_inventaris: id },
            data: {
                nama: rules.nama,
                jumlah: rules.jumlah,
                kode_inventaris: rules.kode,
                kondisi: rules.kondisi,
                keterangan: rules.keterangan,
                id_petugas: rules.id_petugas,
                id_jenis: rules.id_jenis,
                id_ruang: rules.id_ruang,
                tanggal_register: new Date(),
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        if (result) {
            return baseResponse.updated(c, result);
        } else {
            return baseResponse.error(c, 'Failed to update inventaris');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function deleteInventaris(c: Context) {
    try {
        const id = parseInt(c.req.param('id'));
        const result = await prisma.inventaris.update({
            where: { id_inventaris: id },
            data: {
                deleted_at: new Date()
            }
        });

        if (result) {
            return baseResponse.deleted(c);
        } else {
            return baseResponse.error(c, 'Failed to delete inventaris');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function getCombobox(c: Context) {
    try {
        const result = await prisma.$queryRaw`
            SELECT i.id_inventaris, i.nama, i.kode_inventaris, i.jumlah_tersedia, i.kondisi, r.id_ruang, r.nama_ruang
            FROM inventaris i
            JOIN ruang r ON i.id_ruang = r.id_ruang
            WHERE i.deleted_at IS NULL AND i.jumlah_tersedia > 0
            ORDER BY i.id_inventaris DESC
        `;

        return baseResponse.success(c, result);
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
}