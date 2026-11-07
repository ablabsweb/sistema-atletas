import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/dashboard/stat-card";
import { HighlightCard } from "@/components/dashboard/highlight-card";
import {
  Shield,
  Users,
  Trophy,
  Calendar,
  AlertTriangle,
  Ban,
  CalendarClock,
  CircleDashed,
} from "lucide-react";

export const instant = false;

export default async function DashboardPage() {
  const [totalEquipes, totalAtletas, atletasPendurados, atletasSuspensos] =
    await Promise.all([
      prisma.equipe.count(),
      prisma.atleta.count(),
      prisma.atleta.count({ where: { status: "PENDURADO" } }),
      prisma.atleta.count({ where: { status: "SUSPENSO" } }),
    ]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-navy-950 p-8 text-white">
        <h1 className="text-2xl font-bold">Seja bem-vindo!</h1>
        <p className="mt-2 max-w-xl text-sm text-navy-300">
          Aqui você gerencia todas as suas equipes, atletas, competições e
          acompanha o desempenho em um só lugar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Equipes Cadastradas"
          value={totalEquipes}
          icon={Shield}
          href="/equipes"
        />
        <StatCard
          label="Atletas Cadastrados"
          value={totalAtletas}
          icon={Users}
          href="/atletas"
        />
        <StatCard
          label="Competições"
          value={0}
          icon={Trophy}
          href="/competicoes"
        />
        <StatCard label="Jogos" value={0} icon={Calendar} href="/jogos" />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-navy-900">
          Destaques do momento
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <HighlightCard
            label="Atletas Pendurados"
            count={atletasPendurados}
            countLabel="atletas"
            icon={AlertTriangle}
            colorClass="bg-status-warning/10 text-status-warning"
            href="/atletas?status=PENDURADO"
          />
          <HighlightCard
            label="Atletas Suspensos"
            count={atletasSuspensos}
            countLabel="atletas"
            icon={Ban}
            colorClass="bg-status-danger/10 text-status-danger"
            href="/atletas?status=SUSPENSO"
          />
          <HighlightCard
            label="Próximos Jogos"
            count={0}
            countLabel="jogos"
            icon={CalendarClock}
            colorClass="bg-status-info/10 text-status-info"
            href="/jogos"
          />
          <HighlightCard
            label="Últimos Jogos sem Resultado"
            count={0}
            countLabel="jogos"
            icon={CircleDashed}
            colorClass="bg-gray-100 text-gray-500"
            href="/jogos"
          />
        </div>
      </div>
    </div>
  );
}