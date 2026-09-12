"use client";

import React from "react";
import {
  MapPin,
  Sparkles,
  Compass,
  Footprints,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";
import { Section2MapTask, MapPin as MapPinType } from "@/data/mockListeningS1S2Data";
import { MapQuestionEvaluation } from "@/hooks/useMapNavigation";
import { cn } from "@/lib/utils";

interface InteractiveMapViewerProps {
  task: Section2MapTask;
  assignedLetters: Record<string, string>; // questionId -> letter
  activeQuestionId: string | null;
  evaluations?: MapQuestionEvaluation[];
  showBreadcrumbs: boolean;
  isSubmitted: boolean;
  onAssignLetter: (questionId: string, letter: string) => void;
  onSelectQuestion: (questionId: string) => void;
  onToggleBreadcrumbs: () => void;
  className?: string;
}

export function InteractiveMapViewer({
  task,
  assignedLetters,
  activeQuestionId,
  evaluations,
  showBreadcrumbs,
  isSubmitted,
  onAssignLetter,
  onSelectQuestion,
  onToggleBreadcrumbs,
  className,
}: InteractiveMapViewerProps) {
  // Check which question a letter is assigned to
  const getAssignedQuestion = (letter: string) => {
    const qId = Object.keys(assignedLetters).find(
      (id) => assignedLetters[id] === letter
    );
    return task.questions.find((q) => q.id === qId);
  };

  const handlePinClick = (letter: string) => {
    if (isSubmitted || !activeQuestionId) return;
    onAssignLetter(activeQuestionId, letter);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Top Header & Breadcrumb Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/80 pb-3">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {task.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            Bấm chọn 1 địa điểm ở cột phải, sau đó click vào chữ cái Pin (A - G) tương ứng trên bản đồ.
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleBreadcrumbs}
          className={cn(
            "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border shadow-sm self-start sm:self-auto",
            showBreadcrumbs
              ? "bg-emerald-600 text-white border-emerald-600 shadow-emerald-600/20"
              : "bg-secondary text-foreground border-border hover:bg-secondary/80"
          )}
        >
          <Footprints className="h-3.5 w-3.5" />
          <span>{showBreadcrumbs ? "Tắt Vết Đường Đi" : "Bật Vết Đường Đi (Hỗ Trợ)"}</span>
        </button>
      </div>

      {/* SVG Interactive Nature Reserve Map */}
      <div className="relative w-full aspect-[4/3] min-h-[380px] rounded-3xl border-2 border-border bg-gradient-to-b from-emerald-950/20 via-card to-emerald-950/10 overflow-hidden shadow-sm select-none">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full pointer-events-none"
        >
          <defs>
            <linearGradient id="pondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="forestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.25" />
            </linearGradient>
            <pattern id="pathPattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1.5" fill="#d97706" fillOpacity="0.6" />
            </pattern>
          </defs>

          {/* North Ancient Forest Area */}
          <path
            d="M 50 20 Q 400 60 750 20 L 750 200 Q 400 240 50 200 Z"
            fill="url(#forestGrad)"
            stroke="#059669"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <text x="400" y="80" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold" opacity="0.7">
            🌲 ANCIENT OAK FOREST 🌲
          </text>

          {/* East Children Play Meadow */}
          <rect
            x="580"
            y="360"
            width="180"
            height="160"
            rx="20"
            fill="#eab308"
            fillOpacity="0.1"
            stroke="#eab308"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text x="670" y="445" textAnchor="middle" fill="#d97706" fontSize="12" fontWeight="bold" opacity="0.8">
            Children's Meadow
          </text>

          {/* Central Water Pond */}
          <ellipse
            cx="400"
            cy="310"
            rx="140"
            ry="85"
            fill="url(#pondGrad)"
            stroke="#0284c7"
            strokeWidth="2.5"
          />
          <text x="400" y="315" textAnchor="middle" fill="#0284c7" fontSize="14" fontWeight="bold">
            🌊 CENTRAL POND 🌊
          </text>

          {/* Wooden Footbridge over Pond */}
          <rect
            x="260"
            y="285"
            width="50"
            height="18"
            rx="4"
            fill="#b45309"
            stroke="#78350f"
            strokeWidth="2"
          />
          <text x="285" y="275" textAnchor="middle" fill="#b45309" fontSize="10" fontWeight="bold">
            Bridge
          </text>

          {/* Main Walking Paths */}
          {/* Central spine path from Entrance */}
          <path
            d="M 400 570 L 400 400"
            stroke="#d97706"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 400 570 L 400 400"
            stroke="#fef3c7"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left fork to Bicycle Rental */}
          <path
            d="M 400 540 Q 250 540 160 500"
            stroke="#d97706"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right fork to Gift Shop */}
          <path
            d="M 400 470 Q 550 470 660 435"
            stroke="#d97706"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Path around pond to West Footbridge and North */}
          <path
            d="M 400 400 Q 250 380 260 295"
            stroke="#d97706"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 310 295 Q 360 210 400 200"
            stroke="#d97706"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 400 200 L 400 110"
            stroke="#d97706"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 400 110 Q 580 110 650 110"
            stroke="#d97706"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 400 110 Q 300 110 240 90"
            stroke="#d97706"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Main Entrance (South) Marker */}
          <rect
            x="320"
            y="560"
            width="160"
            height="35"
            rx="8"
            fill="#4f46e5"
            stroke="#312e81"
            strokeWidth="2"
          />
          <text x="400" y="582" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
            🚪 MAIN ENTRANCE (START)
          </text>

          {/* Western boundary fence */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="550"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="3"
            strokeDasharray="8 6"
          />
          <text x="60" y="300" fill="currentColor" opacity="0.3" fontSize="10" transform="rotate(-90 60 300)">
            Western Boundary Fence
          </text>

          {/* Compass rose in top-left */}
          <g transform="translate(100, 90)">
            <circle cx="0" cy="0" r="24" fill="none" stroke="currentColor" strokeOpacity="0.2" />
            <line x1="0" y1="-24" x2="0" y2="24" stroke="#6366f1" strokeWidth="2" />
            <line x1="-24" y1="0" x2="24" y2="0" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
            <text x="0" y="-28" textAnchor="middle" fill="#6366f1" fontSize="11" fontWeight="bold">N</text>
            <text x="0" y="36" textAnchor="middle" fill="currentColor" opacity="0.5" fontSize="10">S</text>
            <text x="32" y="4" textAnchor="middle" fill="currentColor" opacity="0.5" fontSize="10">E</text>
            <text x="-32" y="4" textAnchor="middle" fill="currentColor" opacity="0.5" fontSize="10">W</text>
          </g>

          {/* Animated Breadcrumb Route Path (if active) */}
          {showBreadcrumbs && (
            <path
              d="M 400 560 L 144 492 L 400 450 L 656 432 L 400 300 L 160 210 L 400 180 L 640 108 L 240 90"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="8 6"
              className="animate-pulse"
            />
          )}
        </svg>

        {/* Interactive Clickable Pins (A - G) */}
        {task.pins.map((pin) => {
          const assignedQ = getAssignedQuestion(pin.letter);
          const isSelected = activeQuestionId && assignedLetters[activeQuestionId] === pin.letter;
          const evalItem = assignedQ
            ? evaluations?.find((e) => e.questionId === assignedQ.id)
            : undefined;

          return (
            <button
              key={pin.letter}
              type="button"
              onClick={() => handlePinClick(pin.letter)}
              style={{ top: `${pin.y}%`, left: `${pin.x}%` }}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-full font-mono text-sm font-extrabold shadow-xl transition-all duration-200 cursor-pointer border-2 z-20 select-none",
                // Ready to assign
                activeQuestionId && !isSubmitted && !assignedQ && "hover:scale-125 hover:ring-4 hover:ring-indigo-500/50",
                // Currently assigned
                assignedQ && !isSubmitted && "bg-indigo-600 text-white border-white scale-110 shadow-indigo-600/50 ring-2 ring-indigo-400",
                // Unassigned
                !assignedQ && !isSubmitted && "bg-card text-foreground border-border hover:border-indigo-500",
                // Submitted & Correct
                isSubmitted && evalItem?.isCorrect && "bg-emerald-600 text-white border-emerald-300 shadow-emerald-600/40",
                // Submitted & Wrong
                isSubmitted && evalItem && !evalItem.isCorrect && "bg-rose-600 text-white border-rose-300 shadow-rose-600/40"
              )}
              title={`Vị trí ${pin.letter}: ${pin.description}`}
            >
              {pin.letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
