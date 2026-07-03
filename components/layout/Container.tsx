import { cn } from "@/lib/utils";
import React from "react";

export const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mx-auto w-full max-w-7xl px-4 md:px-8", className)} {...props} />
  )
);
Container.displayName = "Container";
