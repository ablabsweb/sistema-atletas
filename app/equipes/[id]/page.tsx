import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/dashboard/stat-card";
import { Users, AlertTriangle, Ban, Calendar } from "lucide-react";

export const instant = false;

export default async function EquipeVisaoGeralPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [totalAtletas, pendurados, suspensos] = await Promise.all([
    prisma.atleta.count({ where: { equipeId: id } }),
    prisma.atleta.count({ where: { equipeId: id, status: "PENDURADO" } }),
    prisma.atleta.count({ where: { equipeId: id, status: "SUSPENSO" } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total de Atletas" value={totalAtletas} icon={Users} />
        <StatCard
          label="Pendurados"
          value={pendurados}
          icon={AlertTriangle}
        />
        <StatCard label="Suspensos" value={suspensos} icon={Ban} />
        <StatCard label="Próximo Jogo" value={0} icon={Calendar} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-navy-900">
          Últimos Jogos
        </h2>
        <p className="text-sm text-gray-500">
          Nenhum jogo registrado ainda — isso vem no próximo bloco do
          sistema.
        </p>
      </div>
    </div>
  );
}