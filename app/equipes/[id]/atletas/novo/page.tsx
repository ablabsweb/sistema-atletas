import { prisma } from "@/lib/prisma";
import { createAtleta } from "@/lib/actions/atletas";
import { notFound } from "next/navigation";

export const instant = false;

export default async function NovoAtletaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: equipeId } = await params;

  const categorias = await prisma.categoria.findMany({
    where: { equipeId },
    orderBy: { nome: "asc" },
  });

  if (categorias.length === 0) {
    notFound();
  }

  const createAtletaWithEquipe = createAtleta.bind(null, equipeId);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-xl font-bold text-navy-900">Novo Atleta</h1>

      <form
        action={createAtletaWithEquipe}
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="nome"
            className="mb-1 block text-sm font-medium text-navy-900"
          >
            Nome completo
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="posicao"
              className="mb-1 block text-sm font-medium text-navy-900"
            >
              Posição
            </label>
            <input
              id="posicao"
              name="posicao"
              type="text"
              required
              placeholder="Ex: Goleiro"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
          </div>
          <div>
            <label
              htmlFor="numero"
              className="mb-1 block text-sm font-medium text-navy-900"
            >
              Número (opcional)
            </label>
            <input
              id="numero"
              name="numero"
              type="number"
              min={0}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="categoriaId"
            className="mb-1 block text-sm font-medium text-navy-900"
          >
            Categoria
          </label>
          <select
            id="categoriaId"
            name="categoriaId"
            required
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          >
            <option value="" disabled>
              Selecione...
            </option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="dataNasc"
            className="mb-1 block text-sm font-medium text-navy-900"
          >
            Data de nascimento
          </label>
          <input
            id="dataNasc"
            name="dataNasc"
            type="date"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
        >
          Salvar Atleta
        </button>
      </form>
    </div>
  );
}