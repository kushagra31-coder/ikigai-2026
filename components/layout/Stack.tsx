import { cn } from "@/lib/utils";
import React from "react";

export const Stack = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-4", className)} {...props} />
  )
);
Stack.displayName = "Stack";
