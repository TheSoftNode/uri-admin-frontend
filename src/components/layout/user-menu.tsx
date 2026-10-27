"use client";

import { LogOut, Settings, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentOperator } from "@/config/site";

export function UserMenu() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label="Account menu"
        className="flex size-10 items-center justify-center rounded-full bg-linear-to-br from-brand to-brand-deep text-xs font-bold text-white shadow-brand transition-transform outline-none hover:scale-[1.04] focus-visible:ring-[3px] focus-visible:ring-ring/30"
      >
        {currentOperator.initials}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="text-[13px] font-bold">{currentOperator.name}</span>
          <span className="text-xs font-normal text-muted-foreground">{currentOperator.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserRound />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShieldCheck />
            Security & devices
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings />
              Console settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild variant="destructive">
          <Link href="/login">
            <LogOut />
            Sign out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
