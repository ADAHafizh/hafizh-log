"use client";

import * as React from "react";
import { motion } from "framer-motion"; // Changed to framer-motion for standard compatibility
import { cn } from "@/lib/utils";

export interface HoverExpandItem {
  label: string;
  sublabel?: string;
  image: string;
  imageAlt?: string;
  description?: string;
  href?: string; // Added href for click navigation
}

export interface HoverExpandProps {
  items: HoverExpandItem[];
  collapsedHeight?: number;
  expandedHeight?: number;
  className?: string;
}

export function HoverExpand({
  items,
  collapsedHeight = 68,
  expandedHeight = 320,
  className,
}: HoverExpandProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div className="w-full border-t border-current opacity-15" />

      {items.map((item, i) => {
        const isHovered = hoveredIndex === i;
        const isOtherHovered = hoveredIndex !== null && !isHovered;

        return (
          <React.Fragment key={i}>
            <motion.div
              className="relative w-full overflow-hidden cursor-pointer group"
              onClick={() => item.href && (window.location.href = item.href)}
              animate={{
                height: isHovered ? expandedHeight : collapsedHeight,
                opacity: isOtherHovered ? 0.38 : 1,
              }}
              transition={{
                height: { type: "spring", stiffness: 280, damping: 32, mass: 0.9 },
                opacity: { duration: 0.22, ease: "easeOut" },
              }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Background Image & Gradient */}
              <motion.div
                className="absolute inset-0 w-full h-full"
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 1.06,
                }}
                transition={{
                  opacity: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
                  scale: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
                }}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt ?? ""}
                  className="w-full h-full object-cover"
                />
                {/* Darker gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </motion.div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6">
                <div className="flex flex-col gap-1">
                  
                  {/* 1. SUBLABEL (The "Capstone" tag) */}
                  {item.sublabel && (
                    <motion.span
                      className="text-[10px] tracking-[0.2em] uppercase font-bold"
                      animate={{
                        color: isHovered ? "#ea580c" : "currentColor", // Primary orange on hover
                        opacity: isHovered ? 1 : 0.5,
                      }}
                    >
                      {item.sublabel}
                    </motion.span>
                  )}

                  {/* 2. LABEL (The Title) */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs tabular-nums opacity-40 text-white/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <motion.h4
                      className="font-bold tracking-tight text-white"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                    >
                      {item.label}
                    </motion.h4>
                  </div>

                  {/* 3. DESCRIPTION (Fades in on hover) */}
                  <motion.p
                    className="text-sm text-zinc-300 max-w-[80%] leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : 10,
                    }}
                    transition={{ delay: 0.1 }}
                  >
                    {item.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
            <div className="w-full border-t border-current opacity-15" />
          </React.Fragment>
        );
      })}
    </div>
  );
}