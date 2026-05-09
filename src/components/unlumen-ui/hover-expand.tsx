"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface HoverExpandItem {
  label: string;
  sublabel?: string;
  image: string;
  imageAlt?: string;
  description?: string;
  /** The URL path for the blog post */
  href?: string; 
}

export interface HoverExpandProps {
  items: HoverExpandItem[];
  collapsedHeight?: number;
  expandedHeight?: number;
  className?: string;
}

export function HoverExpand({
  items,
  collapsedHeight = 80, // Slightly increased to prevent text cutoff
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
              // IMPLEMENTED: Navigation on click
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </motion.div>

              {/* Text Layout */}
              <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6">
                <div className="flex flex-col gap-1">
                  
                  {/* 1. SUBLABEL (The "Capstone" tag) */}
                  {item.sublabel && (
                    <motion.span
                      className="text-[10px] tracking-[0.2em] uppercase font-bold"
                      animate={{
                        color: isHovered ? "#ea580c" : "currentColor", 
                        opacity: isHovered ? 1 : 0.6,
                      }}
                    >
                      {item.sublabel}
                    </motion.span>
                  )}

                  {/* 2. LABEL (NO TRUNCATION) */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs tabular-nums opacity-40 text-zinc-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <motion.h4
                      // Removed 'truncate', added 'text-zinc-200' for dark mode visibility by default
                      className="font-bold tracking-tight text-zinc-200"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                      animate={{
                        color: isHovered ? "#ffffff" : "#e4e4e7",
                      }}
                    >
                      {item.label}
                    </motion.h4>
                  </div>

                  {/* 3. DESCRIPTION (Still Truncated) */}
                  <motion.p
                    className="text-sm text-zinc-300 max-w-[90%] leading-relaxed line-clamp-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      height: isHovered ? "auto" : 0,
                      marginTop: isHovered ? 8 : 0,
                    }}
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