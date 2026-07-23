'use client';

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { Card } from "../primitives/card";

export const GlassCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { isGlass?: boolean }>(
  ({ className, children, isGlass = false, ...props }, ref) => {
    
    if (isGlass) {
      // Retained strictly for layered elements like Dialogs/Panels where glass is beneficial
      return (
        <div
          ref={ref}
          className={cn(
            "relative overflow-hidden glass",
            className
          )}
          {...props}
        >
          <div className="relative z-10 p-6">{children}</div>
        </div>
      );
    }

    // Default: Return the solid premium surface card standard across the app
    return (
      <Card ref={ref} className={cn("p-6", className)} {...props}>
        {children}
      </Card>
    );
  }
);
GlassCard.displayName = "GlassCard";
