"use client";

import React from "react";
import {
  Layers,
  User,
  Building2,
  Scale,
  Microscope,
  Users,
  Globe2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import {
  SocialPerspectiveKey,
  SOCIETAL_LENSES_METADATA,
  SpeakingP3Topic,
} from "@/data/mockSpeakingP3Data";
import { cn } from "@/lib/utils";

interface SocietalHexagonSelectorProps {
  topic: SpeakingP3Topic;
  selectedKeys: SocialPerspectiveKey[];
  onToggleKey: (key: SocialPerspectiveKey) => void;
  className?: string;
}

export function SocietalHexagonSelector({
  topic,
  selectedKeys,
  onToggleKey,
  className,
}: SocietalHexagonSelectorProps) {
  const getLensIcon = (key: SocialPerspectiveKey) => {
    switch (key) {
      case "individual":
        return <User className="h-4 w-4" />;
      case "corporate":
        return <Building2 className="h-4 w-4" />;
      case "government":
        return <Scale className="h-4 w-4" />;
      case "scientific":
        return <Microscope className="h-4 w-4" />;
      case "civil_society":
        return <Users className="h-4 w-4" />;
      case "global":
        return <Globe2 className="h-4 w-4" />;
    }
  };

  const isRequirementMet = selectedKeys.length >= 2;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase">
              Bước 1 • Đa Chiều Hóa Lập Luận
            </span>
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-foreground">
            Mô Hình 6 Lăng Kính Chủ Thể Xã Hội
          </h4>
        </div>

        <span
          className={cn(
            "font-mono text-xs font-bold px-3 py-1 rounded-xl border flex items-center gap-1.5 self-start sm:self-auto",
            isRequirementMet
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
          )}
        >
          {isRequirementMet ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <span className="flex h-2 w-2 rounded-full bg-amber-500" />
          )}
          <span>Đã chọn: {selectedKeys.length} / 2 lăng kính tối thiểu</span>
        </span>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Triệt tiêu bẫy kể chuyện cá nhân vụn vặt (Personal Anecdote Trap). Chọn <strong>ít nhất 2 lăng kính bổ trợ</strong> dưới đây để mở rộng góc nhìn vĩ mô:
      </p>

      {/* 6 Lenses Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {(Object.keys(SOCIETAL_LENSES_METADATA) as SocialPerspectiveKey[]).map((key) => {
          const meta = SOCIETAL_LENSES_METADATA[key];
          const lensDetail = topic.lenses[key];
          const isSelected = selectedKeys.includes(key);

          return (
            <div
              key={key}
              onClick={() => onToggleKey(key)}
              className={cn(
                "p-4 rounded-2xl border transition-all duration-200 cursor-pointer space-y-2.5 shadow-2xs flex flex-col justify-between",
                isSelected
                  ? "border-primary bg-primary/[0.04] ring-1 ring-primary/30"
                  : "border-border bg-secondary/15 hover:bg-secondary/30"
              )}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      style={{ backgroundColor: `${meta.color}20`, color: meta.color }}
                      className="flex h-7 w-7 items-center justify-center rounded-xl font-bold"
                    >
                      {getLensIcon(key)}
                    </div>
                    <span className="font-bold text-xs text-foreground">
                      {meta.labelVi}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-colors",
                      isSelected
                        ? "bg-primary text-white border-primary"
                        : "border-muted-foreground/30 bg-card"
                    )}
                  >
                    {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground leading-snug">
                  {lensDetail.coreAngleVi}
                </p>
              </div>

              {/* Sample Key Arguments Preview */}
              <div className="pt-2 border-t border-border/50 text-[10px] space-y-1 font-mono">
                <span className="text-primary font-bold block">Luận cứ cốt lõi:</span>
                <p className="text-muted-foreground line-clamp-2">
                  • {lensDetail.keyArguments[0]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
