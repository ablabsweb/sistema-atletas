"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createEquipe(formData: FormData) {
  const nome = formData.get("nome") as string;
  const modalidade = formData.get("modalidade") as string;
  const escudoUrl = formData.get("escudoUrl") as string;

  if (!nome || !modalidade) {
    throw new Error("Nome e modalidade são obrigatórios");
  }

  const equipe = await prisma.equipe.create({
    data: {
      nome,
      modalidade: modalidade as never,
      escudoUrl: escudoUrl || null,
    },
  });

  redirect(`/equipes/${equipe.id}`);
}