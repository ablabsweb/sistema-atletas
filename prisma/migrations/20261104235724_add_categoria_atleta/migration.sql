-- CreateEnum
CREATE TYPE "StatusAtleta" AS ENUM ('ATIVO', 'PENDURADO', 'SUSPENSO', 'LESIONADO', 'INATIVO');

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "equipeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atleta" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "fotoUrl" TEXT,
    "posicao" TEXT NOT NULL,
    "dataNasc" TIMESTAMP(3) NOT NULL,
    "altura" DOUBLE PRECISION,
    "peso" DOUBLE PRECISION,
    "numero" INTEGER,
    "status" "StatusAtleta" NOT NULL DEFAULT 'ATIVO',
    "equipeId" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Atleta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_equipeId_nome_key" ON "Categoria"("equipeId", "nome");

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "Equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atleta" ADD CONSTRAINT "Atleta_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "Equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atleta" ADD CONSTRAINT "Atleta_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
