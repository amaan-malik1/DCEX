/*
  Warnings:

  - You are about to drop the column `privateKey` on the `InrWallet` table. All the data in the column will be lost.
  - You are about to drop the column `publicKey` on the `InrWallet` table. All the data in the column will be lost.
  - Added the required column `balance` to the `InrWallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InrWallet" DROP COLUMN "privateKey",
DROP COLUMN "publicKey",
ADD COLUMN     "balance" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT,
ADD COLUMN     "profileImg" TEXT;
