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
        const status = parseInt(c.req.query('status') || '');
        const pegawaiId = parseInt(c.req.query('pegawaiId') || '');

        const user = c.get("user");
        if (!user) {
            return baseResponse.error(c, "Unauthorized", 401);
        }

        const filter: any = {
            deleted_at: null,
            status: status ? { in: [status] } : {},
            peminjaman: {
                pegawai: {
                    id_pegawai: user.id_pegawai
                }
            },
            OR: [
                { peminjaman: { pegawai: { nama_pegawai: { contains: search } } } },
                { peminjaman: { id_peminjaman: { equals: isNaN(Number(search)) ? undefined : Number(search) } } }
            ]
        };

        if (!isNaN(pegawaiId)) {
            filter.peminjaman = {
                pegawai: {
                    id_pegawai: pegawaiId
                }
            };
        }

        const result = await handlePaginate(
            prisma.denda,
            filter,
            {
                peminjaman: {
                    select: {
                        id_peminjaman: true,
                        tanggal_pinjam: true,
                        tanggal_kembali: true,
                        status_peminjaman: true,
                        pegawai: { select: { nama_pegawai: true } }
                    }
                }
            },
            page,
            perPage
        );

        // Calculate total unpaid fines for the logged-in user
        const totalDendaBelumDibayar = await prisma.denda.aggregate({
            _sum: { jumlah_denda: true },
            where: { status: 0, deleted_at: null, peminjaman: { pegawai: { id_pegawai: user.id_pegawai } } }
        });

        // Calculate total fines paid this month by the logged-in user
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const totalDendaTerbayarBulanIni = await prisma.denda.aggregate({
            _sum: { jumlah_denda: true },
            where: {
                status: 2,
                deleted_at: null,
                tanggal_denda: { gte: startOfMonth },
                peminjaman: { pegawai: { id_pegawai: user.id_pegawai } }
            }
        });

        // Calculate total overdue loans this month for the logged-in user
        const totalOverdueBulanIni = await prisma.denda.count({
            where: {
                keterlambatan: { gt: 0 },
                deleted_at: null,
                peminjaman: {
                    pegawai: { id_pegawai: user.id_pegawai },
                    tanggal_kembali: { lt: new Date() }
                }
            }
        });

        return baseResponse.success(c, {
            statistik: {
                totalDendaBelumDibayar: totalDendaBelumDibayar._sum.jumlah_denda || 0,
                totalDendaTerbayarBulanIni: totalDendaTerbayarBulanIni._sum.jumlah_denda || 0,
                totalOverdueBulanIni: totalOverdueBulanIni
            },
            result
        });
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
};

export const getAllVervalDenda = async (c: Context) => {
    try {
        const page = parseInt(c.req.query('page') || '1', 10);
        const perPage = parseInt(c.req.query('perPage') || '10', 10);
        const search = c.req.query('search') || '';
        const status = parseInt(c.req.query('status') || '');
        const pegawaiId = parseInt(c.req.query('pegawaiId') || '');

        const filter: any = {
            deleted_at: null,
            status: status ? { in: [status] } : {in: [1,2]},
            OR: [
                { peminjaman: { pegawai: { nama_pegawai: { contains: search } } } },
                { peminjaman: { id_peminjaman: { equals: isNaN(Number(search)) ? undefined : Number(search) } } }
            ]
        };

        if (!isNaN(pegawaiId)) {
            filter.peminjaman = {
                pegawai: {
                    id_pegawai: pegawaiId
                }
            };
        }

        const result = await handlePaginate(
            prisma.denda,
            filter,
            {
                peminjaman: {
                    select: {
                        id_peminjaman: true,
                        tanggal_pinjam: true,
                        tanggal_kembali: true,
                        status_peminjaman: true,
                        pegawai: { select: { nama_pegawai: true } }
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

export const getDendaById = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);

        if (isNaN(id)) {
            return baseResponse.error(c, "Invalid fine ID.");
        }

        const denda = await prisma.denda.findUnique({
            where: { id_denda: id, deleted_at: null },
            include: {
                peminjaman: {
                    select: {
                        id_peminjaman: true,
                        tanggal_pinjam: true,
                        tanggal_kembali: true,
                        status_peminjaman: true,
                        pegawai: { select: { nama_pegawai: true } }
                    }
                }
            }
        });

        if (!denda) {
            return baseResponse.error(c, "Fine not found.");
        }

        return baseResponse.success(c, denda);
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
};

const updateDendaStatusSchema = z.object({
    status: z.number().int().min(0).max(2)
});

export const updateDendaStatus = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        const body = await c.req.json();

        if (isNaN(id)) {
            return baseResponse.error(c, "Invalid fine ID.");
        }

        // Validate request body
        const parsedBody = updateDendaStatusSchema.safeParse(body);
        if (!parsedBody.success) {
            return baseResponse.error(c, "Invalid status. Allowed values: 0 (Unpaid), 1 (Under Verification), 2 (Paid).");
        }

        const { status } = parsedBody.data;

        const existingDenda = await prisma.denda.findUnique({
            where: { id_denda: id, deleted_at: null }
        });

        if (!existingDenda) {
            return baseResponse.error(c, "Fine not found.");
        }

        if (existingDenda.status === 2) {
            return baseResponse.error(c, "This fine has already been paid and cannot be updated.");
        }

        let updatedData: any = { status, updated_at: new Date() };

        if (status === 1) {
            updatedData.jumlah_pembayaran = existingDenda.jumlah_pembayaran - existingDenda.jumlah_denda;
        } else if (status === 2) {
            updatedData.jumlah_pembayaran = 0;
        }

        const updatedDenda = await prisma.denda.update({
            where: { id_denda: id },
            data: updatedData
        });

        return baseResponse.success(c, updatedDenda, "Fine status updated successfully.");
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
};

