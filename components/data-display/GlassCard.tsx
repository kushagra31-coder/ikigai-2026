'use client';

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

export const GlassCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    return (
      <div
        ref={(node) => {
          // @ts-ignore
          divRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative overflow-hidden glass group",
          "transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-1",
          className
        )}
        {...props}
      >
        <div className="relative z-10 p-6">{children}</div>

      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";
