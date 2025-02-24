import { Context } from 'hono'
import prisma from "../../prisma/client";
import { baseResponse } from '../helpers/BaseResponse';
import { handlePaginate } from '../helpers/HandlePaginate';

export const getAllPengembalian = async (c: Context) => {
    try {
        const page = parseInt(c.req.query('page') || '1', 10);
        const perPage = parseInt(c.req.query('perPage') || '10', 10);
        const search = c.req.query('search') || '';
        const startDate = c.req.query('startDate') || '';
        const endDate = c.req.query('endDate') || '';

        const whereCondition: any = {
            deleted_at: null,
            status_peminjaman: { in: ["3", "4", "6"] },
            OR: [
                {
                    pegawai: {
                        nama_pegawai: {
                            contains: search,
                        }
                    }
                },
                {
                    detail_pinjam: {
                        some: {
                            inventaris: {
                                OR: [
                                    { nama: { contains: search } },
                                    { kode_inventaris: { contains: search } }
                                ]
                            }
                        }
                    }
                }
            ]
        };

        if (startDate && endDate) {
            whereCondition.tanggal_pinjam = {
                gte: new Date(startDate),
                lte: new Date(endDate)
            };
        } else if (startDate) {
            whereCondition.tanggal_pinjam = { gte: new Date(startDate) };
        } else if (endDate) {
            whereCondition.tanggal_pinjam = { lte: new Date(endDate) };
        }

        const result = await handlePaginate(
            prisma.peminjaman,
            whereCondition,
            {
                detail_pinjam: {
                    include: {
                        inventaris: {
                            select: {
                                id_inventaris: true,
                                nama: true,
                                kondisi: true,
                                kode_inventaris: true,
                                jumlah: true,
                                ruang: {
                                    select: {
                                        id_ruang: true,
                                        nama_ruang: true
                                    }
                                }
                            }
                        }
                    }
                },
                pegawai: {
                    select: {
                        id_pegawai: true,
                        nama_pegawai: true,
                        nip: true,
                        alamat: true
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