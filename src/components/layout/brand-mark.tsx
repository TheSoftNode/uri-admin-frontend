import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  href = "/overview",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
        className,
      )}
    >
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={44}
        height={26}
        priority
        className="h-[22px] w-auto"
      />
      <span className="text-[13.5px] font-bold tracking-tight text-foreground">
        {siteConfig.name}
        <span className="font-medium text-subtle-foreground"> / Admin</span>
      </span>
    </Link>
  );
}
