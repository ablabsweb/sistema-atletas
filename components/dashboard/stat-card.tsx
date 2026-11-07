import { LucideIcon } from "lucide-react";
import Link from "next/link";

type StatCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  href?: string;
};

export function StatCard({ label, value, icon: Icon, href }: StatCardProps) {
  const content = (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-navy-900">{value}</p>
        {href && (
          <span className="mt-1 inline-block text-xs font-medium text-gold-500">
            Ver todas →
          </span>
        )}
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-950/5 text-navy-900">
        <Icon size={22} />
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}