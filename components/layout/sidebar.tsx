"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Trophy,
  Calendar,
  UserRound,
  FileText,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Equipes", href: "/equipes", icon: Users },
  { label: "Competições", href: "/competicoes", icon: Trophy },
  { label: "Jogos", href: "/jogos", icon: Calendar },
  { label: "Atletas", href: "/atletas", icon: UserRound },
  { label: "Relatórios", href: "/relatorios", icon: FileText },
  { label: "Estatísticas", href: "/estatisticas", icon: BarChart3 },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* fundo escuro atrás do menu no celular/tablet */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-navy-950 text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-navy-800 px-5 py-5">
          <div className="flex items-center gap-3">
            <Image
  src="/logo.png"
  alt="Logo Arthur Bonini"
  width={40}
  height={40}
  className="rounded-full object-cover"
/>
            <div>
              <p className="text-sm font-semibold leading-tight">
                Arthur Bonini
              </p>
              <p className="text-xs leading-tight text-navy-700/0 text-gold-300">
                Gestão de Equipes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-navy-300 hover:text-white lg:hidden"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gold-500 text-navy-950"
                    : "text-navy-300 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 border-t border-navy-800 px-5 py-4">
          <Image
  src="/logo.png"
  alt="Logo Arthur Bonini"
  width={36}
  height={36}
  className="rounded-full object-cover"
/>
          <div>
            <p className="text-sm font-medium leading-tight">Arthur Bonini</p>
            <p className="text-xs leading-tight text-navy-300">
              Administrador
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}