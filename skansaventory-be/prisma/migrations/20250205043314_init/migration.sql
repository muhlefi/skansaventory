-- CreateTable
CREATE TABLE `jenis` (
    `id_jenis` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jenis` VARCHAR(191) NOT NULL,
    `kode_jenis` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_jenis`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ruang` (
    `id_ruang` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_ruang` VARCHAR(191) NOT NULL,
    `kode_ruang` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_ruang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventaris` (
    `id_inventaris` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `kondisi` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `jumlah` INTEGER NOT NULL,
    `id_jenis` INTEGER NOT NULL,
    `id_ruang` INTEGER NOT NULL,
    `id_petugas` INTEGER NOT NULL,
    `kode_inventaris` VARCHAR(191) NOT NULL,
    `tanggal_register` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_inventaris`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `petugas` (
    `id_petugas` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nama_petugas` VARCHAR(191) NOT NULL,
    `id_level` INTEGER NOT NULL,
    `id_pegawai` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `petugas_username_key`(`username`),
    PRIMARY KEY (`id_petugas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `level` (
    `id_level` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_level` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_level`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peminjaman` (
    `id_peminjaman` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_pinjam` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tanggal_kembali` DATETIME(3) NULL,
    `status_peminjaman` VARCHAR(191) NOT NULL,
    `id_pegawai` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_peminjaman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_pinjam` (
    `id_detail_pinjam` INTEGER NOT NULL AUTO_INCREMENT,
    `id_inventaris` INTEGER NOT NULL,
    `id_peminjaman` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_detail_pinjam`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pegawai` (
    `id_pegawai` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_pegawai` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `pegawai_nip_key`(`nip`),
    PRIMARY KEY (`id_pegawai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `inventaris` ADD CONSTRAINT `inventaris_id_jenis_fkey` FOREIGN KEY (`id_jenis`) REFERENCES `jenis`(`id_jenis`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventaris` ADD CONSTRAINT `inventaris_id_ruang_fkey` FOREIGN KEY (`id_ruang`) REFERENCES `ruang`(`id_ruang`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventaris` ADD CONSTRAINT `inventaris_id_petugas_fkey` FOREIGN KEY (`id_petugas`) REFERENCES `petugas`(`id_petugas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `petugas` ADD CONSTRAINT `petugas_id_level_fkey` FOREIGN KEY (`id_level`) REFERENCES `level`(`id_level`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `petugas` ADD CONSTRAINT `petugas_id_pegawai_fkey` FOREIGN KEY (`id_pegawai`) REFERENCES `pegawai`(`id_pegawai`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_id_pegawai_fkey` FOREIGN KEY (`id_pegawai`) REFERENCES `pegawai`(`id_pegawai`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_pinjam` ADD CONSTRAINT `detail_pinjam_id_inventaris_fkey` FOREIGN KEY (`id_inventaris`) REFERENCES `inventaris`(`id_inventaris`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_pinjam` ADD CONSTRAINT `detail_pinjam_id_peminjaman_fkey` FOREIGN KEY (`id_peminjaman`) REFERENCES `peminjaman`(`id_peminjaman`) ON DELETE RESTRICT ON UPDATE CASCADE;
