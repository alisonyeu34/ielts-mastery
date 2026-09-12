"use client";

import React from "react";
import {
  BookOpen,
  Sparkles,
  Layers,
  ChevronRight,
  Award,
} from "lucide-react";
import { GRAMMAR_TOPICS, GrammarTopicId } from "@/data/mockGrammarDrills";
import { cn } from "@/lib/utils";

interface GrammarTopicSelectorProps {
  selectedTopicId: GrammarTopicId;
  onSelectTopic: (id: GrammarTopicId) => void;
  className?: string;
}

export function GrammarTopicSelector({
  selectedTopicId,
  onSelectTopic,
  className,
}: GrammarTopicSelectorProps) {
  const currentTopic =
    GRAMMAR_TOPICS.find((t) => t.id === selectedTopicId) || GRAMMAR_TOPICS[0];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Topic Horizontal Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {GRAMMAR_TOPICS.map((topic) => {
          const isSelected = topic.id === selectedTopicId;

          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => onSelectTopic(topic.id)}
              className={cn(
                "px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 cursor-pointer flex items-center gap-1.5 shadow-sm",
                isSelected
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-600/20 scale-[1.02]"
                  : "bg-card hover:bg-secondary text-muted-foreground border-border"
              )}
            >
              <span>{topic.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Topic Description Card */}
      <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-card shadow-sm space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
              {currentTopic.tag}
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-foreground">
              {currentTopic.name}
            </h3>
          </div>

          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Award className="h-3.5 w-3.5" /> {currentTopic.targetBandBenefit}
          </span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {currentTopic.description}
        </p>
      </div>
    </div>
  );
}
