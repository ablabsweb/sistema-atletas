import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, ChevronRight, Shield } from "lucide-react";

const MODALIDADE_LABEL: Record<string, string> = {
  FUTEBOL_CAMPO: "Futebol de Campo",
  FUTSAL: "Futsal",
  BEACH_SOCCER: "Beach Soccer",
  VOLEI: "Vôlei",
  SOCIETY: "Futebol Society",
  BASQUETE: "Basquete",
};

export const instant = false;

export default async function EquipesPage() {
  const equipes = await prisma.equipe.findMany({
    orderBy: { nome: "asc" },
    include: {
      categorias: true,
      _count: { select: { atletas: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-navy-900">Minhas Equipes</h1>
        <Link
          href="/equipes/nova"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
        >
          <Plus size={18} />
          Nova Equipe
        </Link>
      </div>

      {equipes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Nenhuma equipe cadastrada ainda. Clique em &quot;Nova Equipe&quot;
          para começar.
        </div>
      ) : (
        <div className="space-y-3">
          {equipes.map((equipe) => (
            <Link
              key={equipe.id}
              href={`/equipes/${equipe.id}`}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-950 text-gold-400">
                  <Shield size={22} />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">{equipe.nome}</p>
                  <p className="text-sm text-gray-500">
                    {MODALIDADE_LABEL[equipe.modalidade]}
                    {equipe.categorias.length > 0 && (
                      <>
                        {" "}
                        ·{" "}
                        {equipe.categorias.map((c) => c.nome).join(" · ")}
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {equipe._count.atletas} atletas
                </span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}