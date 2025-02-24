import { Context } from 'hono'
import { z } from 'zod';
import prisma from "../../prisma/client";
import { baseResponse } from '../helpers/BaseResponse';
import { handlePaginate } from '../helpers/HandlePaginate';

export const getAllPeminjaman = async (c: Context) => {
    try {
        const page = parseInt(c.req.query('page') || '1', 10);
        const perPage = parseInt(c.req.query('perPage') || '10', 10);
        const search = c.req.query('search') || '';
        const startDate = c.req.query('startDate') || '';
        const endDate = c.req.query('endDate') || '';

        const user = c.get("user"); 
        if (!user) {
            return baseResponse.error(c, "Unauthorized", 401);
        }

        const whereCondition: any = {
            deleted_at: null,
            id_pegawai: user.id_pegawai,
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

export const showPeminjamanById = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const peminjaman = await prisma.peminjaman.findUnique({
            where: {
                id_peminjaman: Number(id),
                deleted_at: null
            },
            include: {
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
                }, pegawai: true
            }
        });

        if (!peminjaman) {
            return baseResponse.error(c, 'Peminjaman not found');
        }

        return baseResponse.show(c, peminjaman);

    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export async function createPeminjaman(c: Context) {
    try {
        const body = await c.req.json();
        const schema = z.object({
            pegawaiId: z.number().min(1),
            pinjam: z.string().datetime(),
            kembali: z.string().datetime().nullable(),
            status: z.string().min(1),
            detail_pinjam: z.array(
                z.object({
                    id_inventaris: z.number().min(1),
                    jumlah: z.number().min(1)
                })
            )
        });

        const validatedData = schema.parse(body);

        const result = await prisma.$transaction(async (tx) => {
            for (const item of validatedData.detail_pinjam) {
                const inventaris = await tx.inventaris.findUnique({
                    where: { id_inventaris: item.id_inventaris }
                });

                if (!inventaris || inventaris.jumlah_tersedia < item.jumlah) {
                    throw new Error(`Stock is not enough for ${item.id_inventaris}`);
                }
            }
            const peminjaman = await tx.peminjaman.create({
                data: {
                    id_pegawai: validatedData.pegawaiId,
                    tanggal_pinjam: new Date(validatedData.pinjam),
                    tanggal_kembali: validatedData.kembali ? new Date(validatedData.kembali) : null,
                    status_peminjaman: validatedData.status,
                    created_at: new Date(),
                    updated_at: new Date(),
                    detail_pinjam: {
                        create: validatedData.detail_pinjam.map((item) => ({
                            id_inventaris: item.id_inventaris,
                            jumlah: item.jumlah
                        }))
                    }
                },
                include: { detail_pinjam: true }
            });

            for (const item of validatedData.detail_pinjam) {
                await tx.inventaris.update({
                    where: { id_inventaris: item.id_inventaris },
                    data: {
                        jumlah_tersedia: { decrement: item.jumlah },
                        jumlah_dipinjam: { increment: item.jumlah }
                    }
                });
            }

            return peminjaman;
        });

        return baseResponse.created(c, result);
    } catch (e: unknown) {
        return baseResponse.error(c, `${e}`);
    }
}

export const getAllVervalPeminjaman = async (c: Context) => {
    try {
        const page = parseInt(c.req.query('page') || '1', 10);
        const perPage = parseInt(c.req.query('perPage') || '10', 10);
        const search = c.req.query('search') || '';
        const startDate = c.req.query('startDate') || '';
        const endDate = c.req.query('endDate') || '';

        const whereCondition: any = {
            deleted_at: null,
            status_peminjaman: '1',
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

export const updateVervalPeminjaman = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const { action } = await c.req.json();

        const peminjaman = await prisma.$transaction(async (tx) => {
            const updatedPeminjaman = await tx.peminjaman.update({
                where: { id_peminjaman: Number(id) },
                data: { 
                    status_peminjaman: action.toString(),
                    updated_at: new Date()
                },
                include: { detail_pinjam: true }
            });

            if ([4, 5].includes(action)) {
                for (const item of updatedPeminjaman.detail_pinjam) {
                    await tx.inventaris.update({
                        where: { id_inventaris: item.id_inventaris },
                        data: {
                            jumlah_tersedia: { increment: item.jumlah },
                            jumlah_dipinjam: { decrement: item.jumlah }
                        }
                    });
                }
            }            

            return updatedPeminjaman;
        });

        if (!peminjaman) {
            return baseResponse.error(c, 'Failed to verval peminjaman');
        }

        return baseResponse.updated(c, peminjaman);
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
}
