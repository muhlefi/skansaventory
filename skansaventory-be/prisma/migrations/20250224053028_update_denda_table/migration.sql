-- AlterTable
ALTER TABLE `detail_pinjam` ADD COLUMN `kondisi_sebelum` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `kondisi_sesudah` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `inventaris` ADD COLUMN `jumlah_rusak` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `denda` (
    `id_denda` INTEGER NOT NULL AUTO_INCREMENT,
    `id_peminjaman` INTEGER NOT NULL,
    `keterlambatan` INTEGER NOT NULL,
    `jumlah_denda` INTEGER NOT NULL,
    `tanggal_denda` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_denda`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `denda` ADD CONSTRAINT `denda_id_peminjaman_fkey` FOREIGN KEY (`id_peminjaman`) REFERENCES `peminjaman`(`id_peminjaman`) ON DELETE RESTRICT ON UPDATE CASCADE;
