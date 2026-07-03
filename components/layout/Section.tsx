import { cn } from "@/lib/utils";
import React from "react";

export const Section = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <section ref={ref} className={cn("py-16 md:py-24 w-full", className)} {...props} />
  )
);
Section.displayName = "Section";
