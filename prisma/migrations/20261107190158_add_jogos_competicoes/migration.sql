-- CreateEnum
CREATE TYPE "StatusJogo" AS ENUM ('AGENDADO', 'EM_ANDAMENTO', 'FINALIZADO', 'ADIADO');

-- CreateEnum
CREATE TYPE "TipoEvento" AS ENUM ('GOL', 'CARTAO_AMARELO', 'CARTAO_VERMELHO', 'SUBSTITUICAO');

-- CreateTable
CREATE TABLE "Competicao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "equipeId" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "inicio" TIMESTAMP(3),
    "fim" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Competicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jogo" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "status" "StatusJogo" NOT NULL DEFAULT 'AGENDADO',
    "competicaoId" TEXT NOT NULL,
    "equipeId" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "adversario" TEXT NOT NULL,
    "mandante" BOOLEAN NOT NULL DEFAULT true,
    "golsNos" INTEGER,
    "golsAdversario" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escalacao" (
    "id" TEXT NOT NULL,
    "jogoId" TEXT NOT NULL,
    "atletaId" TEXT NOT NULL,
    "titular" BOOLEAN NOT NULL DEFAULT true,
    "minutosJogados" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Escalacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventoJogo" (
    "id" TEXT NOT NULL,
    "jogoId" TEXT NOT NULL,
    "atletaId" TEXT NOT NULL,
    "tipo" "TipoEvento" NOT NULL,
    "minuto" INTEGER NOT NULL,

    CONSTRAINT "EventoJogo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Escalacao_jogoId_atletaId_key" ON "Escalacao"("jogoId", "atletaId");

-- AddForeignKey
ALTER TABLE "Competicao" ADD CONSTRAINT "Competicao_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "Equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competicao" ADD CONSTRAINT "Competicao_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogo" ADD CONSTRAINT "Jogo_competicaoId_fkey" FOREIGN KEY ("competicaoId") REFERENCES "Competicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogo" ADD CONSTRAINT "Jogo_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "Equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogo" ADD CONSTRAINT "Jogo_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escalacao" ADD CONSTRAINT "Escalacao_jogoId_fkey" FOREIGN KEY ("jogoId") REFERENCES "Jogo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escalacao" ADD CONSTRAINT "Escalacao_atletaId_fkey" FOREIGN KEY ("atletaId") REFERENCES "Atleta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoJogo" ADD CONSTRAINT "EventoJogo_jogoId_fkey" FOREIGN KEY ("jogoId") REFERENCES "Jogo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoJogo" ADD CONSTRAINT "EventoJogo_atletaId_fkey" FOREIGN KEY ("atletaId") REFERENCES "Atleta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
