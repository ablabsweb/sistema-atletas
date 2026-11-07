import { LucideIcon } from "lucide-react";
import Link from "next/link";

type HighlightCardProps = {
  label: string;
  count: number;
  countLabel: string;
  icon: LucideIcon;
  colorClass: string; // ex: "text-status-warning bg-status-warning/10"
  href?: string;
};

export function HighlightCard({
  label,
  count,
  countLabel,
  icon: Icon,
  colorClass,
  href,
}: HighlightCardProps) {
  const content = (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${colorClass}`}
      >
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-medium text-navy-900">{label}</p>
        <p className="text-xs text-gold-500">
          {count} {countLabel} →
        </p>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}