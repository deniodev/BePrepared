/*
  Warnings:

  - You are about to drop the column `province_id` on the `subscribers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "subscribers" DROP CONSTRAINT "subscribers_province_id_fkey";

-- AlterTable
ALTER TABLE "subscribers" DROP COLUMN "province_id";
