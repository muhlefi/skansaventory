import { Context } from 'hono'
import prisma from "../../prisma/client";
import { baseResponse } from '../helpers/BaseResponse';

export async function getCombobox(c: Context) {
    try {
        const Ruang = await prisma.level.findMany({
            select: { id_level: true, nama_level: true },
            orderBy: { id_level: 'desc' },
        });

        const formattedRuang = Ruang.map(j => ({
            value: j.id_level,
            label: j.nama_level === 'ST' ? 'Staff' : j.nama_level === 'OP' ? 'Operator' : j.nama_level === 'SA' ? 'Superadmin' : j.nama_level
        }));

        return baseResponse.success(c, formattedRuang);
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
} 