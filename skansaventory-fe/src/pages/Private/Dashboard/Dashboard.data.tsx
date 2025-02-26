export interface DashboardInventarisProps {
    data: {
        success: boolean;
        message: string;
        data: {
            statistik: {
                totalPeminjaman: number;
                totalOverdue: number;
                mostBorrowedItem: string;
            };
            monthlyBorrowData: {
                name: string;
                peminjaman: number;
            }[];
            mostBorrowedItemsData: {
                name: string;
                jumlah: number;
            }[];
            recentBorrows: {
                id: number;
                barang: string;
                peminjam: string;
                tanggal: string;
                status: string;
            }[];
        };
    };
    mapStatusBadge: (status: number) => {
        className: string;
        text: string;
    }
}