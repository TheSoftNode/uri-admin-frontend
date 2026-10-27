"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";

import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const DialogOpenContext = React.createContext(false);

function Dialog({ open, ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return (
    <DialogOpenContext.Provider value={Boolean(open)}>
      <DialogPrimitive.Root data-slot="dialog" open={open} {...props} />
    </DialogOpenContext.Provider>
  );
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay asChild forceMount {...props}>
      <motion.div
        data-slot="dialog-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: duration.base, ease: ease.out }}
        className={cn("fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]", className)}
      />
    </DialogPrimitive.Overlay>
  );
}

function DialogContent({
  className,
  children,
  showClose = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { showClose?: boolean }) {
  const open = React.useContext(DialogOpenContext);

  return (
    <AnimatePresence>
      {open ? (
        <DialogPortal forceMount>
          <DialogOverlay />
          <DialogPrimitive.Content asChild forceMount {...props}>
            <motion.div
              data-slot="dialog-content"
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: duration.base, ease: ease.out }}
              className={cn(
                "fixed top-[12%] left-1/2 z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-float outline-none",
                className,
              )}
            >
              {children}
              {showClose ? (
                <DialogPrimitive.Close className="absolute top-3.5 right-3.5 rounded-lg p-1 opacity-70 transition-opacity hover:opacity-100 focus:ring-[3px] focus:ring-ring/30 focus:outline-hidden disabled:pointer-events-none">
                  <XIcon className="size-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              ) : null}
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPortal>
      ) : null}
    </AnimatePresence>
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogTitle, DialogDescription };
