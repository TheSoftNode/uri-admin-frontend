"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";

import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SheetOpenContext = React.createContext(false);

function Sheet({ open, ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return (
    <SheetOpenContext.Provider value={Boolean(open)}>
      <SheetPrimitive.Root data-slot="sheet" open={open} {...props} />
    </SheetOpenContext.Provider>
  );
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay asChild forceMount {...props}>
      <motion.div
        data-slot="sheet-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: duration.base, ease: ease.out }}
        className={cn("fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]", className)}
      />
    </SheetPrimitive.Overlay>
  );
}

const offscreen: Record<"top" | "right" | "bottom" | "left", { x?: string; y?: string }> = {
  right: { x: "100%" },
  left: { x: "-100%" },
  top: { y: "-100%" },
  bottom: { y: "100%" },
};

function SheetContent({
  className,
  children,
  side = "right",
  showClose = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
  showClose?: boolean;
}) {
  const open = React.useContext(SheetOpenContext);

  return (
    <AnimatePresence>
      {open ? (
        <SheetPortal forceMount>
          <SheetOverlay />
          <SheetPrimitive.Content asChild forceMount {...props}>
            <motion.div
              data-slot="sheet-content"
              initial={offscreen[side]}
              animate={{ x: 0, y: 0 }}
              exit={offscreen[side]}
              transition={{ duration: duration.base, ease: ease.out }}
              className={cn(
                "fixed z-50 flex flex-col gap-4 bg-background shadow-float",
                side === "right" && "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm",
                side === "left" && "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm",
                side === "top" && "inset-x-0 top-0 h-auto",
                side === "bottom" && "inset-x-0 bottom-0 h-auto",
                className,
              )}
            >
              {children}
              {showClose ? (
                <SheetPrimitive.Close className="absolute top-4 right-4 rounded-lg p-1 opacity-70 transition-opacity hover:opacity-100 focus:ring-[3px] focus:ring-ring/30 focus:outline-hidden disabled:pointer-events-none">
                  <XIcon className="size-4" />
                  <span className="sr-only">Close</span>
                </SheetPrimitive.Close>
              ) : null}
            </motion.div>
          </SheetPrimitive.Content>
        </SheetPortal>
      ) : null}
    </AnimatePresence>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
