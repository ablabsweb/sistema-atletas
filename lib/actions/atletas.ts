"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategoria(
  equipeId: string,
  formData: FormData
) {
  const nome = formData.get("nome") as string;

  if (!nome) {
    throw new Error("Nome da categoria é obrigatório");
  }

  await prisma.categoria.create({
    data: { nome, equipeId },
  });

  revalidatePath(`/equipes/${equipeId}/atletas`);
}

export async function createAtleta(equipeId: string, formData: FormData) {
  const nome = formData.get("nome") as string;
  const posicao = formData.get("posicao") as string;
  const categoriaId = formData.get("categoriaId") as string;
  const dataNasc = formData.get("dataNasc") as string;
  const numero = formData.get("numero") as string;

  if (!nome || !posicao || !categoriaId || !dataNasc) {
    throw new Error("Preencha todos os campos obrigatórios");
  }

  await prisma.atleta.create({
    data: {
      nome,
      posicao,
      categoriaId,
      equipeId,
      dataNasc: new Date(dataNasc),
      numero: numero ? Number(numero) : null,
    },
  });

  redirect(`/equipes/${equipeId}/atletas`);
}