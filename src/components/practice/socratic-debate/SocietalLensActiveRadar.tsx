"use client";

import React from "react";
import {
  SocietalLensKey,
  SOCIETAL_LENSES,
} from "@/lib/socraticDebateEngine";
import {
  User,
  Building2,
  Landmark,
  FlaskConical,
  Users,
  Globe,
  Radar,
} from "lucide-react";

interface SocietalLensActiveRadarProps {
  activeLenses: SocietalLensKey[];
}

export const SocietalLensActiveRadar: React.FC<SocietalLensActiveRadarProps> = ({
  activeLenses,
}) => {
  const getIcon = (key: SocietalLensKey) => {
    switch (key) {
      case "individual":
        return <User className="w-4 h-4" />;
      case "corporate":
        return <Building2 className="w-4 h-4" />;
      case "governmental":
        return <Landmark className="w-4 h-4" />;
      case "scientific":
        return <FlaskConical className="w-4 h-4" />;
      case "communal":
        return <Users className="w-4 h-4" />;
      case "global":
        return <Globe className="w-4 h-4" />;
    }
  };

  const keys: SocietalLensKey[] = [
    "individual",
    "corporate",
    "governmental",
    "scientific",
    "communal",
    "global",
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl mb-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Radar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
              <span>Radar 6 Lăng Kính Chủ Thể Xã Hội (6 Societal Lenses)</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
                {activeLenses.length}/6 Đang kích hoạt
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Đạt Band 8.0+ Speaking Part 3 & Writing Task 2 khi lập luận đa chiều từ ít nhất 3 lăng kính.
            </p>
          </div>
        </div>
      </div>

      {/* 6 Lenses Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {keys.map((k) => {
          const cfg = SOCIETAL_LENSES[k];
          const isActive = activeLenses.includes(k);

          return (
            <div
              key={k}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                isActive
                  ? "bg-cyan-950/60 border-cyan-500 text-cyan-100 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-400/50"
                  : "bg-slate-950/40 border-slate-800 text-slate-500"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div
                  className={`p-1.5 rounded-lg ${
                    isActive ? "bg-cyan-500 text-slate-950" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {getIcon(k)}
                </div>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive ? "bg-cyan-400 animate-ping" : "bg-slate-700"
                  }`}
                />
              </div>
              <div className="text-xs font-bold truncate">{cfg.labelEn.split(" &")[0]}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                {cfg.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
