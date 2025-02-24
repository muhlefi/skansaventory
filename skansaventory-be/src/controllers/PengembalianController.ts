import { Context } from 'hono'
import prisma from "../../prisma/client";
import { baseResponse } from '../helpers/BaseResponse';
import { handlePaginate } from '../helpers/HandlePaginate';
import { z } from 'zod';

export const getAllPengembalian = async (c: Context) => {
    try {
        const page = parseInt(c.req.query('page') || '1', 10);
        const perPage = parseInt(c.req.query('perPage') || '10', 10);
        const search = c.req.query('search') || '';
        const startDate = c.req.query('startDate') || '';
        const endDate = c.req.query('endDate') || '';

        const whereCondition: any = {
            deleted_at: null,
            status_peminjaman: { in: ["3", "5", "4", "6", "7", "8"] },
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

const returnSchema = z.object({
    details: z.array(
        z.object({
            id_detail: z.number(),
            jumlah_kembali: z.number(),
            jumlah_rusak: z.number(),
            kondisi_sesudah: z.number().min(1).max(3),
        })
    ),
});

export const confirmReturn = async (c: Context) => {
    try {
        const id_peminjaman = c.req.param('id');
        const { details } = await c.req.json();

        const validatedData = returnSchema.safeParse({ details });
        if (!validatedData.success) {
            return baseResponse.error(c, `Invalid payload: ${validatedData.error.message}`, 400);
        }

        let hasDamaged = false;
        let hasLost = false;

        const peminjaman = await prisma.$transaction(async (tx) => {
            for (const item of validatedData.data.details) {
                const detail = await tx.detailPinjam.findUnique({
                    where: { id_detail_pinjam: item.id_detail },
                    select: { id_inventaris: true, jumlah: true },
                });

                if (!detail) {
                    throw new Error(`Detail peminjaman dengan ID ${item.id_detail} tidak ditemukan`);
                }

                await tx.detailPinjam.update({
                    where: { id_detail_pinjam: item.id_detail },
                    data: { kondisi_sesudah: item.kondisi_sesudah },
                });

                if (item.kondisi_sesudah === 1) {
                    await tx.inventaris.update({
                        where: { id_inventaris: detail.id_inventaris },
                        data: {
                            jumlah_tersedia: { increment: item.jumlah_kembali },
                            jumlah_dipinjam: { decrement: item.jumlah_kembali },
                        },
                    });
                } else {
                    const inventaris = await tx.inventaris.findUnique({
                        where: { id_inventaris: detail.id_inventaris },
                        select: { harga_per_unit: true },
                    });

                    if (!inventaris) {
                        throw new Error(`Inventaris dengan ID ${detail.id_inventaris} tidak ditemukan`);
                    }

                    let totalDenda = 0;

                    if (item.jumlah_rusak > 0) {
                        hasDamaged = true;
                        await tx.inventaris.update({
                            where: { id_inventaris: detail.id_inventaris },
                            data: {
                                jumlah_rusak: { increment: item.jumlah_rusak },
                                jumlah_dipinjam: { decrement: item.jumlah_rusak },
                            },
                        });

                        totalDenda += inventaris.harga_per_unit * item.jumlah_rusak * 0.5;
                    }

                    if (item.kondisi_sesudah === 3) {
                        hasLost = true;
                    
                        const jumlahHilang = item.jumlah_kembali === 0 ? detail.jumlah : item.jumlah_kembali;
                    
                        await tx.inventaris.update({
                            where: { id_inventaris: detail.id_inventaris },
                            data: {
                                jumlah: { decrement: jumlahHilang },
                                jumlah_tersedia: { decrement: jumlahHilang },
                                jumlah_dipinjam: { decrement: jumlahHilang },
                            },
                        });
                    
                        totalDenda += inventaris.harga_per_unit * jumlahHilang;
                    }

                    if (totalDenda > 0) {
                        await tx.denda.upsert({
                            where: { id_peminjaman: parseInt(id_peminjaman) },
                            update: { jumlah_denda: { increment: totalDenda } },
                            create: {
                                id_peminjaman: parseInt(id_peminjaman),
                                jumlah_denda: totalDenda,
                                keterlambatan: 0,
                                status: 1,
                                tanggal_denda: new Date(),
                            },
                        });
                    }
                }
            }

            let newStatus = "4";
            if (hasLost) {
                newStatus = "8";
            } else if (hasDamaged) {
                newStatus = "7";
            }

            return tx.peminjaman.update({
                where: { id_peminjaman: parseInt(id_peminjaman) },
                data: { status_peminjaman: newStatus },
            });
        });

        return baseResponse.updated(c, peminjaman);
    } catch (error) {
        console.error(error);
        return baseResponse.error(c, `Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};