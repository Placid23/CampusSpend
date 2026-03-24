
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ 
  className, 
  children, 
  glowColor = "primary", 
  hoverEffect = true,
  ...props 
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-morphism rounded-3xl p-6 transition-all duration-500",
        hoverEffect && "hover:shadow-[0_0_40px_rgba(239,26,184,0.15)] hover:border-primary/40 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
