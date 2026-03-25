/*
  Warnings:

  - You are about to drop the column `expiraEm` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `revogado` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `token` table. All the data in the column will be lost.
  - You are about to alter the column `token` on the `token` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `expiresAt` to the `token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `token` table without a default value. This is not possible if the table is not empty.
  - Made the column `senha` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TypeToken" AS ENUM ('ACCESS', 'REFRESH');

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_usuario_id_fkey";

-- DropIndex
DROP INDEX "token_usuario_id_key";

-- AlterTable
ALTER TABLE "token" DROP COLUMN "expiraEm",
DROP COLUMN "revogado",
DROP COLUMN "tipo",
DROP COLUMN "usuario_id",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "revoked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "TypeToken" NOT NULL DEFAULT 'ACCESS',
ADD COLUMN     "usuarioId" INTEGER NOT NULL,
ALTER COLUMN "token" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "senha" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
