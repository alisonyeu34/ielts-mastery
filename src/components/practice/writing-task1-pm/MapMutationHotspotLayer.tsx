"use client";

import React from "react";
import { MapMutationHotspot } from "@/data/mockProcessMapData";
import {
  MapPin,
  Sparkles,
  PlusCircle,
  Copy,
  Check,
  Building2,
  Trash2,
  RefreshCw,
  Maximize2,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MapMutationHotspotLayerProps {
  hotspots: MapMutationHotspot[];
  selectedHotspotId: string | null;
  onSelectHotspot: (id: string) => void;
  onInsertSentence?: (sentence: string) => void;
  className?: string;
}

export function MapMutationHotspotLayer({
  hotspots,
  selectedHotspotId,
  onSelectHotspot,
  onInsertSentence,
  className,
}: MapMutationHotspotLayerProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const activeHotspot =
    hotspots.find((h) => h.id === selectedHotspotId) || hotspots[0];

  const handleCopy = (sentence: string, id: string) => {
    navigator.clipboard.writeText(sentence);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "demolition":
        return {
          icon: <Trash2 className="h-3 w-3" />,
          color: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
        };
      case "construction":
        return {
          icon: <Building2 className="h-3 w-3" />,
          color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
        };
      case "conversion":
        return {
          icon: <RefreshCw className="h-3 w-3" />,
          color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
        };
      case "expansion":
        return {
          icon: <Maximize2 className="h-3 w-3" />,
          color: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
        };
      case "unaltered":
        return {
          icon: <ShieldCheck className="h-3 w-3" />,
          color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        };
      default:
        return {
          icon: <Sparkles className="h-3 w-3" />,
          color: "text-muted-foreground bg-secondary border-border",
        };
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Hotspots Selector Pills */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-emerald-500" />
          <span>Các Điểm Biến Đổi Không Gian Đô Thị ({hotspots.length} Điểm):</span>
        </span>

        <div className="flex flex-wrap gap-1.5">
          {hotspots.map((h) => {
            const isSelected = h.id === selectedHotspotId;
            const badge = getCategoryBadge(h.category);

            return (
              <button
                key={h.id}
                type="button"
                onClick={() => onSelectHotspot(h.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer",
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-card border-border hover:border-emerald-500/40 text-foreground hover:bg-secondary"
                )}
              >
                <span className={isSelected ? "text-white" : ""}>{badge.icon}</span>
                <span>{h.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Hotspot Detail Card */}
      {activeHotspot && (
        <div className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border/80 space-y-3.5 text-xs animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-foreground">
                  {activeHotspot.name}
                </h4>
                <span className="text-[11px] text-muted-foreground">
                  {activeHotspot.categoryLabelVi}
                </span>
              </div>
            </div>

            <span
              className={cn(
                "text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 self-start sm:self-auto",
                getCategoryBadge(activeHotspot.category).color
              )}
            >
              {getCategoryBadge(activeHotspot.category).icon}
              <span className="uppercase">{activeHotspot.category}</span>
            </span>
          </div>

          {/* Before vs After States */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-card border border-border/70 space-y-1">
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase block">
                TRƯỚC BIẾN ĐỔI (BEFORE):
              </span>
              <p className="text-foreground/90 leading-relaxed font-medium">
                {activeHotspot.beforeStateEn}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-card border border-border/70 space-y-1">
              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase block">
                SAU BIẾN ĐỔI (AFTER):
              </span>
              <p className="text-foreground/90 leading-relaxed font-medium">
                {activeHotspot.afterStateEn}
              </p>
            </div>
          </div>

          {/* Vocab Pair & Sample Sentence */}
          <div className="p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                  Cặp từ loại Band 8.0+:
                </span>
                <span className="font-mono font-bold text-foreground">
                  {activeHotspot.vocabPair.verb}
                </span>
                <span className="text-muted-foreground">⇄</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {activeHotspot.vocabPair.noun}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {onInsertSentence && (
                  <button
                    type="button"
                    onClick={() => onInsertSentence(activeHotspot.sampleSentence + " ")}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm cursor-pointer"
                    title="Chèn câu mẫu vào bài viết"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Chèn câu mẫu</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleCopy(activeHotspot.sampleSentence, activeHotspot.id)}
                  className="px-2.5 py-1 rounded-lg bg-card hover:bg-secondary text-foreground font-bold text-[11px] flex items-center gap-1 border border-border cursor-pointer"
                  title="Sao chép câu mẫu"
                >
                  {copiedId === activeHotspot.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="font-serif italic text-foreground text-xs leading-relaxed">
              "{activeHotspot.sampleSentence}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
