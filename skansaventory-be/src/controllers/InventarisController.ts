import { Context } from 'hono'
import { z } from 'zod';
import prisma from "../../prisma/client";
import { baseResponse } from '../helpers/BaseResponse';
import { handlePaginate } from '../helpers/HandlePaginate';

export const getAllInventaris = async (c: Context) => {
    try {
        const page = parseInt(c.req.query('page') || '1', 10)
        const perPage = parseInt(c.req.query('perPage') || '10', 10)

        const result = await handlePaginate(
            prisma.inventaris,
            { deleted_at: null },
            page,
            perPage
        )

        return baseResponse.success(c, result)
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`)
    }
}

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
            kode: z.string().min(1).regex(/^[^\s]+$/, { message: 'Kode tidak boleh mengandung spasi' }),
            jumlah: z.number().min(1),
            kondisi: z.string().min(1),
            id_petugas: z.number().min(1),
            id_jenis: z.number().min(1),
            id_ruang: z.number().min(1),
        }).parse(body);

        if (await prisma.inventaris.findFirst({ where: { nama:rules.nama, kode_inventaris:rules.kode, deleted_at: null } })) {
            return baseResponse.error(c, 'kode atau nama sudah digunakan.');
        }

        const result = await prisma.inventaris.create({
            data: {
                nama: rules.nama,
                jumlah: rules.jumlah,
                kode_inventaris: rules.kode,
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
            kode: z.string().min(1).regex(/^[^\s]+$/, { message: 'Kode tidak boleh mengandung spasi' }),
            jumlah: z.number().min(1),
            kondisi: z.string().min(1),
            keterangan: z.string().optional(),
            id_petugas: z.number().min(1),
            id_jenis: z.number().min(1),
            id_ruang: z.number().min(1),
        }).parse(body);

        if (await prisma.inventaris.findFirst({ where: { nama:rules.nama, id_jenis: { not: id }, kode_inventaris:rules.kode, deleted_at: null } })) {
            return baseResponse.error(c, 'kode atau nama sudah digunakan.');
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
        const result = await prisma.inventaris.findMany({
            select: { id_inventaris: true, nama: true },
            where: { deleted_at: null },
            orderBy: { id_inventaris: 'desc' },
        });

        const formattedResult = result.map(j => ({
            value: j.id_inventaris,
            label: j.nama
        }));

        return baseResponse.success(c, formattedResult);
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
} 