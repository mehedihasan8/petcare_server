/*
  Warnings:

  - You are about to drop the column `helhStatus` on the `pets` table. All the data in the column will be lost.
  - Added the required column `helthStatus` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "helhStatus",
ADD COLUMN     "helthStatus" TEXT NOT NULL;
