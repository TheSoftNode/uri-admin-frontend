import { Bell } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function NotificationsButton({ unread }: { unread: number }) {
  return (
    <Button
      asChild
      variant="secondary"
      size="icon"
      className="relative"
      aria-label={`Platform alerts, ${unread} unread`}
    >
      <Link href="/alerts">
        <Bell className="size-[17px]" strokeWidth={1.9} />
        {unread > 0 ? (
          <span className="absolute top-2.5 right-2.5 flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-brand" />
          </span>
        ) : null}
      </Link>
    </Button>
  );
}
