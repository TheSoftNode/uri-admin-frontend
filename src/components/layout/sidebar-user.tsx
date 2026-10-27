import { currentOperator } from "@/config/site";

export function SidebarUser() {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-muted p-2.5">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand to-brand-deep text-[11px] font-bold text-white">
        {currentOperator.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12.5px] font-bold text-foreground">{currentOperator.name}</p>
        <p className="truncate text-[11px] text-subtle-foreground">{currentOperator.role}</p>
      </div>
    </div>
  );
}
