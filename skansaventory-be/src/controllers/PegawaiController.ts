import { Context } from 'hono'
import { z } from 'zod';
import prisma from "../../prisma/client";
import { baseResponse } from '../helpers/BaseResponse';
import { handlePaginate } from '../helpers/HandlePaginate';

export const getAllPegawai = async (c: Context) => {
    try {
        const page = parseInt(c.req.query('page') || '1', 10)
        const perPage = parseInt(c.req.query('perPage') || '10', 10)

        const result = await handlePaginate(
            prisma.pegawai,
            { deleted_at: null },
            page,
            perPage
        )

        return baseResponse.success(c, result)
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`)
    }
}

export const showPegawaiById = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const pegawai = await prisma.pegawai.findUnique({
            where: {
                id_pegawai: Number(id),
                deleted_at: null
            }
        });

        if (!pegawai) {
            return baseResponse.error(c, 'Pegawai not found');
        }

        return baseResponse.show(c, pegawai);

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function createPegawai(c: Context) {
    try {
        const body = await c.req.parseBody();
        const rules = z.object({
            nama: z.string().min(1),
            nip: z.string().min(18).max(18),
            alamat: z.string().min(1),
            id_pegawai: z.number().min(1)
        }).parse(body);

        if (await prisma.pegawai.findFirst({ where: { nama_pegawai: rules.nama, nip: rules.nip, deleted_at: null } })) {
            return baseResponse.error(c, 'nama atau nip sudah digunakan.');
        }

        const result = await prisma.pegawai.create({
            data: {
                nama_pegawai: rules.nama,
                nip: rules.nip,
                alamat: rules.alamat,
                id_pegawai: rules.id_pegawai,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });

        if (result) {
            return baseResponse.created(c, result);
        } else {
            return baseResponse.error(c, 'Failed to create pegawai');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function updatePegawai(c: Context) {
    try {
        const id = parseInt(c.req.param('id'));
        const body = await c.req.parseBody();
        const rules = z.object({
            nama: z.string().min(1),
            nip: z.string().min(18).max(18),
            alamat: z.string().min(1),
            id_pegawai: z.number().min(1)
        }).parse(body);

        if (await prisma.pegawai.findFirst({ where: { nama_pegawai: rules.nama, nip: rules.nip, deleted_at: null } })) {
            return baseResponse.error(c, 'nama atau nip sudah digunakan.');
        }

        const result = await prisma.pegawai.update({
            where: { id_pegawai: id },
            data: {
                nama_pegawai: rules.nama,
                nip: rules.nip,
                alamat: rules.alamat,
                id_pegawai: rules.id_pegawai,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });

        if (result) {
            return baseResponse.updated(c, result);
        } else {
            return baseResponse.error(c, 'Failed to update pegawai');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function deletePegawai(c: Context) {
    try {
        const id = parseInt(c.req.param('id'));
        const result = await prisma.pegawai.update({
            where: { id_pegawai: id },
            data: {
                deleted_at: new Date()
            }
        });

        if (result) {
            return baseResponse.deleted(c);
        } else {
            return baseResponse.error(c, 'Failed to delete pegawai');
        }

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function getCombobox(c: Context) {
    try {
        const result = await prisma.pegawai.findMany({
            select: { id_pegawai: true, nama_pegawai: true },
            where: { deleted_at: null },
            orderBy: { id_pegawai: 'desc' },
        });

        const formattedResult = result.map(j => ({
            value: j.id_pegawai,
            label: j.nama_pegawai
        }));

        return baseResponse.success(c, formattedResult);
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
} 