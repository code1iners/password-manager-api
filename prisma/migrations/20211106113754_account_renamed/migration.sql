/*
  Warnings:

  - You are about to drop the column `password` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "password",
ADD COLUMN     "accountPassword" TEXT NOT NULL DEFAULT E'';