/*
  Warnings:

  - Added the required column `keterlambatan` to the `denda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `denda` ADD COLUMN `keterlambatan` INTEGER NOT NULL;
