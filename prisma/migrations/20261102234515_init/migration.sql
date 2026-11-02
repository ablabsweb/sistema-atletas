-- CreateEnum
CREATE TYPE "Modalidade" AS ENUM ('FUTEBOL_CAMPO', 'FUTSAL', 'BEACH_SOCCER', 'VOLEI', 'SOCIETY', 'BASQUETE');

-- CreateTable
CREATE TABLE "Equipe" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "escudoUrl" TEXT,
    "modalidade" "Modalidade" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipe_pkey" PRIMARY KEY ("id")
);
