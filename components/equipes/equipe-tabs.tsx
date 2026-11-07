"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type EquipeTabsProps = {
  equipeId: string;
};

export function EquipeTabs({ equipeId }: EquipeTabsProps) {
  const pathname = usePathname();
  const base = `/equipes/${equipeId}`;

  const tabs = [
    { label: "Visão Geral", href: base },
    { label: "Atletas", href: `${base}/atletas` },
    { label: "Jogos", href: `${base}/jogos` },
    { label: "Competições", href: `${base}/competicoes` },
    { label: "Estatísticas", href: `${base}/estatisticas` },
    { label: "Relatórios", href: `${base}/relatorios` },
  ];

  return (
    <div className="flex gap-1 overflow-x-auto border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive =
          tab.href === base ? pathname === base : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "border-gold-500 text-navy-900"
                : "border-transparent text-gray-500 hover:text-navy-900"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}