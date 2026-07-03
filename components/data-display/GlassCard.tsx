import { cn } from "@/lib/utils";
import React from "react";

export const GlassCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-card/40 backdrop-blur-md shadow-glow",
        "transition-all duration-300 hover:shadow-glow-purple hover:border-white/20",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10 p-6">{children}</div>
    </div>
  )
);
GlassCard.displayName = "GlassCard";
