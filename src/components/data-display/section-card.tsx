import type { ReactNode } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  /** Tighter horizontal padding for tables and lists that manage their own rows. */
  flush?: boolean;
  className?: string;
  contentClassName?: string;
}

/** The standard titled surface every page section is built on. */
export function SectionCard({
  title,
  description,
  action,
  children,
  flush = false,
  className,
  contentClassName,
}: SectionCardProps) {
  return (
    <Card className={cn("gap-4 py-5", className)}>
      <CardHeader className="px-6">
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      <CardContent className={cn(flush ? "px-3" : "px-6", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
