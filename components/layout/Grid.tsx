import { cn } from "@/lib/utils";
import React from "react";

export const Grid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3", className)} {...props} />
  )
);
Grid.displayName = "Grid";
