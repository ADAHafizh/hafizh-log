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
  collapsedHeight = 68,
  expandedHeight = 320,
  className,
}: HoverExpandProps) {
  // Initialize with 0 so the first item is open on load
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(0);

  return (
    <div 
      className={cn("flex flex-col w-full", className)}
      // NEW: When the mouse leaves the entire component area, collapse everything
      onMouseLeave={() => setHoveredIndex(null)}
    >
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
            >
              {/* Background Image Layer */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </motion.div>

              {/* Layout: Number - Label - Description - Sublabel */}
              <div className="absolute inset-0 flex items-end px-5 pb-4">
                <div className="flex w-full items-baseline justify-between gap-4">
                  
                  <div className="flex items-baseline gap-3 min-w-0">
                    <motion.span
                      className="text-xs tabular-nums shrink-0 opacity-40"
                      animate={{
                        color: isHovered ? "#ffffff" : "currentColor",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>

                    <motion.span
                      className="font-semibold tracking-tight whitespace-nowrap"
                      style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}
                      animate={{
                        color: isHovered ? "#ffffff" : "currentColor",
                      }}
                    >
                      {item.label}
                    </motion.span>

                    {item.description && (
                      <motion.span
                        className="text-sm text-white/70 truncate hidden sm:block"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          x: isHovered ? 0 : -8,
                        }}
                        transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
                      >
                        — {item.description}
                      </motion.span>
                    )}
                  </div>

                  {item.sublabel && (
                    <motion.span
                      className="text-xs tracking-widest uppercase shrink-0"
                      animate={{
                        color: isHovered ? "rgba(255,255,255,0.7)" : "currentColor",
                        opacity: isHovered ? 1 : 0.45,
                      }}
                    >
                      {item.sublabel}
                    </motion.span>
                  )}
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