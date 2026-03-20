-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "senha" DROP NOT NULL;

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "revogado" BOOLEAN NOT NULL DEFAULT false,
    "expiraEm" TIMESTAMP(3) NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "token_usuario_id_key" ON "token"("usuario_id");

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
