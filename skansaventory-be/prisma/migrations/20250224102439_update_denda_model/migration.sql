/*
  Warnings:

  - You are about to drop the column `keterlambatan` on the `denda` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_peminjaman]` on the table `denda` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `denda` DROP COLUMN `keterlambatan`;

-- CreateIndex
CREATE UNIQUE INDEX `denda_id_peminjaman_key` ON `denda`(`id_peminjaman`);
