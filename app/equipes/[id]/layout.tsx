import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Shield } from "lucide-react";
import { EquipeTabs } from "@/components/equipes/equipe-tabs";

const MODALIDADE_LABEL: Record<string, string> = {
  FUTEBOL_CAMPO: "Futebol de Campo",
  FUTSAL: "Futsal",
  BEACH_SOCCER: "Beach Soccer",
  VOLEI: "Vôlei",
  SOCIETY: "Futebol Society",
  BASQUETE: "Basquete",
};

export const instant = false;

export default async function EquipeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const equipe = await prisma.equipe.findUnique({
    where: { id },
    include: { categorias: true },
  });

  if (!equipe) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <nav className="text-sm text-gray-500">
        <Link href="/equipes" className="hover:text-gold-500">
          Equipes
        </Link>{" "}
        / <span className="text-navy-900">{equipe.nome}</span>
      </nav>

      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-950 text-gold-400">
          <Shield size={26} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-navy-900">{equipe.nome}</h1>
          <p className="text-sm text-gray-500">
            {MODALIDADE_LABEL[equipe.modalidade]}
            {equipe.categorias.length > 0 && (
              <> · {equipe.categorias.map((c) => c.nome).join(" · ")}</>
            )}
          </p>
        </div>
      </div>

      <EquipeTabs equipeId={equipe.id} />

      <div>{children}</div>
    </div>
  );
}