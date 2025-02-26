import { Context } from 'hono';
import prisma from '../../prisma/client';
import { baseResponse } from '../helpers/BaseResponse';

export const getDashboardData = async (c: Context) => {
    try {
        const user = c.get("user");
        if (!user) {
            return baseResponse.error(c, "Unauthorized", 401);
        }

        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

        // Total peminjaman
        const totalPeminjaman = await prisma.peminjaman.count({ where: { deleted_at: null } });

        // Total overdue
        const totalOverdue = await prisma.peminjaman.count({ where: { status_peminjaman: '6', deleted_at: null } });

        // Barang paling sering dipinjam
        const mostBorrowedItems = await prisma.detailPinjam.groupBy({
            by: ['id_inventaris'],
            _sum: { jumlah: true },
            orderBy: { _sum: { jumlah: 'desc' } },
            take: 1
        });
        
        const mostBorrowedItem = mostBorrowedItems.length > 0 ? await prisma.inventaris.findUnique({
            where: { id_inventaris: mostBorrowedItems[0].id_inventaris }
        }) : null;

        // Statistik bulanan
        const monthlyBorrowData = await prisma.detailPinjam.groupBy({
            by: ['id_peminjaman'],
            _count: { id_detail_pinjam: true },
            where: { peminjaman: { deleted_at: null, tanggal_pinjam: { gte: startOfMonth } } }
        });

        const formattedMonthlyData = monthlyBorrowData.map(entry => ({
            name: entry.id_peminjaman.toString(),
            peminjaman: entry._count.id_detail_pinjam
        }));

        // Data barang paling sering dipinjam
        const mostBorrowedItemsData = await prisma.detailPinjam.groupBy({
            by: ['id_inventaris'],
            _sum: { jumlah: true },
            orderBy: { _sum: { jumlah: 'desc' } },
            take: 5
        });

        const formattedMostBorrowedItemsData = await Promise.all(mostBorrowedItemsData.map(async (item) => {
            const inventaris = await prisma.inventaris.findUnique({
                where: { id_inventaris: item.id_inventaris }
            });
            return {
                name: inventaris?.nama || "Unknown",
                jumlah: item._sum.jumlah || 0
            };
        }));

        // Peminjaman terbaru
        const recentBorrows = await prisma.peminjaman.findMany({
            where: { deleted_at: null },
            orderBy: { created_at: 'desc' },
            take: 5,
            include: {
                pegawai: true,
                detail_pinjam: {
                    include: {
                        inventaris: true
                    }
                }
            }
        });

        const formattedRecentBorrows = recentBorrows.map(borrow => ({
            id: borrow.id_peminjaman,
            barang: borrow.detail_pinjam.map(detail => detail.inventaris.nama).join(", "),
            peminjam: borrow.pegawai.nama_pegawai,
            tanggal: borrow.tanggal_pinjam.toLocaleDateString(),
            status: borrow.status_peminjaman
        }));

        return baseResponse.success(c, {
            statistik: {
                totalPeminjaman,
                totalOverdue,
                mostBorrowedItem: mostBorrowedItem?.nama || "-"
            },
            monthlyBorrowData: formattedMonthlyData,
            mostBorrowedItemsData: formattedMostBorrowedItemsData,
            recentBorrows: formattedRecentBorrows
        });
    } catch (e: unknown) {
        return baseResponse.error(c, `Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
};