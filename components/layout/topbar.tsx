"use client";

import { Bell, Menu } from "lucide-react";

type TopbarProps = {
  onMenuClick: () => void;
};

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
      <button
        onClick={onMenuClick}
        className="text-navy-900 hover:text-gold-500 lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu size={24} />
      </button>

      {/* espaço reservado pra breadcrumb/título da página, no futuro */}
      <div className="hidden lg:block" />

      <div className="flex items-center gap-4">
        <button
          className="relative text-navy-900 hover:text-gold-500"
          aria-label="Notificações"
        >
          <Bell size={20} />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-status-danger text-[10px] font-bold text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-950 text-xs font-semibold text-gold-400">
            AB
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-tight text-navy-900">
              Arthur Bonini
            </p>
            <p className="text-xs leading-tight text-gray-500">
              Administrador
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}