import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import { createCategoria } from "@/lib/actions/atletas";

export const instant = false;

const STATUS_STYLE: Record<string, string> = {
  ATIVO: "bg-status-success/10 text-status-success",
  PENDURADO: "bg-status-warning/10 text-status-warning",
  SUSPENSO: "bg-status-danger/10 text-status-danger",
  LESIONADO: "bg-status-info/10 text-status-info",
  INATIVO: "bg-gray-100 text-gray-500",
};

export default async function EquipeAtletasPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: equipeId } = await params;

  const [categorias, atletas] = await Promise.all([
    prisma.categoria.findMany({
      where: { equipeId },
      orderBy: { nome: "asc" },
    }),
    prisma.atleta.findMany({
      where: { equipeId },
      include: { categoria: true },
      orderBy: { nome: "asc" },
    }),
  ]);

  const createCategoriaWithEquipe = createCategoria.bind(null, equipeId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-bold text-navy-900">Atletas</h1>
        {categorias.length > 0 && (
          <Link
            href={`/equipes/${equipeId}/atletas/novo`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
          >
            <Plus size={18} />
            Novo Atleta
          </Link>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-sm font-semibold text-navy-900">
          Categorias desta equipe
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {categorias.map((c) => (
            <span
              key={c.id}
              className="rounded-full bg-navy-950/5 px-3 py-1 text-xs font-medium text-navy-900"
            >
              {c.nome}
            </span>
          ))}
          <form
            action={createCategoriaWithEquipe}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              name="nome"
              required
              placeholder="Ex: Sub-17"
              className="rounded-full border border-gray-300 px-3 py-1 text-xs focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
            <button
              type="submit"
              className="rounded-full bg-navy-950 px-3 py-1 text-xs font-semibold text-white hover:bg-navy-800"
            >
              + Adicionar
            </button>
          </form>
        </div>
      </div>

      {categorias.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
          Cadastre pelo menos uma categoria acima antes de adicionar atletas.
        </div>
      ) : atletas.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
          Nenhum atleta cadastrado ainda.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Nº</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Posição</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Nascimento</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {atletas.map((atleta) => (
                <tr
                  key={atleta.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{atleta.numero ?? "-"}</td>
                  <td className="px-4 py-3 font-medium text-navy-900">
                    {atleta.nome}
                  </td>
                  <td className="px-4 py-3">{atleta.posicao}</td>
                  <td className="px-4 py-3">{atleta.categoria.nome}</td>
                  <td className="px-4 py-3">
                    {atleta.dataNasc.toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[atleta.status]}`}
                    >
                      {atleta.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}