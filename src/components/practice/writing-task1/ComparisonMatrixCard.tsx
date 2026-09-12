"use client";

import React from "react";
import { BookOpen, Sparkles, Scale, TrendingUp, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonMatrixCardProps {
  className?: string;
}

export function ComparisonMatrixCard({ className }: ComparisonMatrixCardProps) {
  const comparisonSections = [
    {
      title: "1. Bội Số & Tỷ Lệ (Multipliers & Ratios)",
      badge: "Band 7.5+",
      items: [
        {
          structure: "...nearly doubled / more than tripled...",
          example: "Internet adoption in Latin America nearly doubled from 34% to 65%.",
        },
        {
          structure: "...twice as high as / three times higher than...",
          example: "Figures for petroleum were more than twice as high as those of coal.",
        },
        {
          structure: "...witnessed a twofold / threefold escalation...",
          example: "Nuclear power witnessed a fivefold escalation over the four decades.",
        },
      ],
    },
    {
      title: "2. Vượt Mặt & Thống Trị (Surpassing & Dominance)",
      badge: "C1 Academic",
      items: [
        {
          structure: "outstripped / eclipsed / surpassed...",
          example: "Natural gas surpassed coal usage around the mid-1990s.",
        },
        {
          structure: "remained the predominant source / dominated...",
          example: "Petroleum remained the predominant source of energy throughout.",
        },
      ],
    },
    {
      title: "3. Tỷ Trọng & Đóng Góp (Proportion & Share)",
      badge: "High Accuracy",
      items: [
        {
          structure: "accounted for / constituted / comprised...",
          example: "Petroleum accounted for over 40% of the total energy portfolio.",
        },
        {
          structure: "in stark contrast to / while... conversely...",
          example: "In stark contrast to coal's decline, natural gas surged remarkably.",
        },
      ],
    },
  ];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Scale className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-foreground">
              Cẩm Nang Cú Pháp So Sánh & Tỷ Lệ Band 7.5+
            </h4>
            <span className="text-[10px] font-mono text-muted-foreground">
              Tối ưu tiêu chí Grammatical Range & Accuracy (GRA)
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-xs">
        {comparisonSections.map((sec, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold font-mono text-foreground text-xs">
                {sec.title}
              </span>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-secondary text-primary uppercase">
                {sec.badge}
              </span>
            </div>

            <div className="space-y-1.5">
              {sec.items.map((it, itemIdx) => (
                <div
                  key={itemIdx}
                  className="p-3 rounded-2xl bg-secondary/20 border border-border/60 space-y-1"
                >
                  <span className="font-mono font-bold text-primary text-[11px] block">
                    {it.structure}
                  </span>
                  <p className="text-[11px] text-muted-foreground italic font-serif">
                    "{it.example}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
