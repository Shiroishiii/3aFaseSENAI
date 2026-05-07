/*
  Warnings:

  - You are about to drop the column `pacienteId` on the `exame` table. All the data in the column will be lost.
  - You are about to drop the `consulta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paciente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prontuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "consulta" DROP CONSTRAINT "consulta_paciente_id_fkey";

-- DropForeignKey
ALTER TABLE "exame" DROP CONSTRAINT "exame_pacienteId_fkey";

-- DropForeignKey
ALTER TABLE "prontuario" DROP CONSTRAINT "prontuario_medico_responsavel_id_fkey";

-- DropForeignKey
ALTER TABLE "prontuario" DROP CONSTRAINT "prontuario_paciente_id_fkey";

-- AlterTable
ALTER TABLE "exame" DROP COLUMN "pacienteId";

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "consulta";

-- DropTable
DROP TABLE "paciente";

-- DropTable
DROP TABLE "prontuario";
