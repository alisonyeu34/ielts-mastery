"use client";

import React, { useState } from "react";
import {
  Bug,
  ShieldAlert,
  Zap,
  CheckCircle2,
  X,
  ArrowRight,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ErrorItem } from "@/types/database";

interface RecurringBug {
  id: string;
  name: string;
  count: number;
  description: string;
  antidoteQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

const DEFAULT_RECURRING_BUGS: RecurringBug[] = [
  {
    id: "bug_ending_sound",
    name: "Nuốt Âm Đuôi Sống Còn (-s / -es / -ed)",
    count: 4,
    description: "Bạn đã bỏ quên âm đuôi 4 lần trong các bài Shadowing và Dictation. Đây là lỗi trừ điểm phát âm nặng nhất ở người Việt.",
    antidoteQuestions: [
      {
        question: "Chọn cách phát âm đuôi chuẩn cho từ 'increases' trong câu: 'Traffic congestion increases daily.'",
        options: ["/ɪnˈkriːs/", "/ɪnˈkriːsɪz/ (phải bật âm gió 'iz')", "/ɪnˈkriːst/"],
        correctIndex: 1,
        explanation: "Từ kết thúc bằng âm xì /s/ ('increase'), khi thêm -es bắt buộc phải đọc thêm một âm tiết là /ɪz/.",
      },
      {
        question: "Từ 'developed' trong thì quá khứ đơn có âm đuôi được phát âm là gì?",
        options: ["/t/ (chặn hơi sắc bén)", "/ɪd/", "/d/"],
        correctIndex: 0,
        explanation: "Sau âm vô thanh /p/, đuôi '-ed' đọc là /t/: /dɪˈvel.əpt/. Hãy bật rõ âm /t/!",
      },
      {
        question: "Trong câu: 'Many student prefer online learning', lỗi sai nằm ở đâu?",
        options: [
          "Phải là 'Many students' (thiếu -s danh từ số nhiều)",
          "Phải đổi 'prefer' thành 'prefers'",
          "Không có lỗi sai nào",
        ],
        correctIndex: 0,
        explanation: "Sau 'Many' bắt buộc phải là danh từ số nhiều đếm được có đuôi '-s': 'Many students'.",
      },
    ],
  },
  {
    id: "bug_past_tense_task1",
    name: "Quên Thì Quá Khứ Trong Writing Task 1",
    count: 3,
    description: "Nhầm lẫn dùng thì hiện tại đơn cho số liệu mốc năm 2010 - 2020. Dữ liệu quá khứ bắt buộc chia V2/ed.",
    antidoteQuestions: [
      {
        question: "Đoạn văn miêu tả: 'In 2015, car sales _____ by 15%'. Chọn động từ chuẩn:",
        options: ["rose (Quá khứ đơn)", "rise", "has risen"],
        correctIndex: 0,
        explanation: "Mốc thời gian 'In 2015' là thời điểm xác định trong quá khứ, bắt buộc chia quá khứ đơn 'rose'.",
      },
      {
        question: "Khi miêu tả xu hướng giữa năm 2000 và 2010, cấu trúc nào sau đây là CHUẨN XÁC?",
        options: [
          "Figures experience a gradual upward trend.",
          "Figures experienced a gradual upward trend.",
          "Figures have experienced a gradual upward trend.",
        ],
        correctIndex: 1,
        explanation: "Cả giai đoạn đã kết thúc hoàn toàn trong quá khứ, động từ 'experienced' phải có đuôi '-ed'.",
      },
      {
        question: "Đâu là trường hợp duy nhất trong Task 1 dùng thì hiện tại đơn?",
        options: [
          "Câu mở bài giới thiệu biểu đồ (The chart illustrates...) và bản đồ hiện tại",
          "Tất cả các số liệu của năm 2010",
          "Không bao giờ được dùng hiện tại đơn",
        ],
        correctIndex: 0,
        explanation: "Câu mở bài (Overview/Introduction) nói về sự tồn tại của biểu đồ trước mắt nên chia hiện tại đơn.",
      },
    ],
  },
];

interface RecurringErrorTrackerProps {
  errors?: ErrorItem[];
  className?: string;
}

export function RecurringErrorTracker({ errors, className }: RecurringErrorTrackerProps) {
  const [activeBug, setActiveBug] = useState<RecurringBug | null>(null);
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [correctStreak, setCorrectStreak] = useState<number>(0);
  const [detoxCompleted, setDetoxCompleted] = useState<boolean>(false);

  const bugs = DEFAULT_RECURRING_BUGS;

  const handleStartDetox = (bug: RecurringBug) => {
    setActiveBug(bug);
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectStreak(0);
    setDetoxCompleted(false);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !activeBug) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === activeBug.antidoteQuestions[currentQuizIdx].correctIndex;
    if (isCorrect) {
      setCorrectStreak((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!activeBug) return;
    if (currentQuizIdx < activeBug.antidoteQuestions.length - 1) {
      setCurrentQuizIdx((p) => p + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setDetoxCompleted(true);
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-red-500/30 bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-700 text-white shadow-xs">
            <Bug className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-foreground">
                Radar Bắt Bệnh Ký Sinh (Recurring Error Tracker)
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30">
                Lặp lại ≥ 3 lần
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Phát hiện các lỗi ngữ pháp & phát âm lặp đi lặp lại để tiêu diệt dứt điểm.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 self-start sm:self-auto">
          🚨 Phát hiện {bugs.length} ổ bọ ký sinh
        </span>
      </div>

      {/* Bugs List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {bugs.map((bug) => (
          <div
            key={bug.id}
            className="p-4 rounded-2xl border border-red-500/30 bg-red-500/[0.04] space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-black text-foreground flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
                  <span>{bug.name}</span>
                </h4>
                <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-red-600 text-white shrink-0">
                  {bug.count} lần mắc
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-normal">
                {bug.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleStartDetox(bug)}
              className="w-full py-2 px-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-red-700/20 transition-all cursor-pointer"
            >
              <Zap className="h-3.5 w-3.5 fill-white" />
              <span>Uống Thuốc Giải Độc 1 Phút (3 Câu)</span>
            </button>
          </div>
        ))}
      </div>

      {/* 1-Minute Detox Interactive Modal */}
      {activeBug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl border border-red-500/40 bg-card p-6 shadow-2xl space-y-5 select-none">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/70 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-red-600" />
                <h4 className="text-sm font-black text-foreground">
                  Liều Thuốc Giải Độc 1 Phút • {activeBug.name}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveBug(null)}
                className="p-1 rounded-lg border border-border text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!detoxCompleted ? (
              <div className="space-y-4">
                {/* Question progress */}
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>
                    Câu hỏi {currentQuizIdx + 1} / {activeBug.antidoteQuestions.length}
                  </span>
                  <span>Đúng liên tiếp: {correctStreak} câu</span>
                </div>

                {/* Question text */}
                <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border text-xs sm:text-sm font-bold text-foreground">
                  {activeBug.antidoteQuestions[currentQuizIdx].question}
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {activeBug.antidoteQuestions[currentQuizIdx].options.map((opt, oIdx) => {
                    const isCorrect = oIdx === activeBug.antidoteQuestions[currentQuizIdx].correctIndex;
                    const isPicked = selectedOption === oIdx;

                    let btnStyle = "border-border bg-card hover:bg-secondary/60 text-foreground";
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = "border-emerald-500/50 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold";
                      } else if (isPicked) {
                        btnStyle = "border-rose-500/50 bg-rose-500/15 text-rose-700 dark:text-rose-400 font-bold";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelectOption(oIdx)}
                        disabled={isAnswered}
                        className={cn(
                          "w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between",
                          btnStyle
                        )}
                      >
                        <span>{opt}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isAnswered && (
                  <div className="p-3 rounded-xl bg-red-500/[0.06] border border-red-500/20 text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-red-700 dark:text-red-400 block mb-0.5">
                      Bản chất cốt lõi:
                    </strong>
                    {activeBug.antidoteQuestions[currentQuizIdx].explanation}
                  </div>
                )}

                {/* Next button */}
                {isAnswered && (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="w-full py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>
                      {currentQuizIdx < activeBug.antidoteQuestions.length - 1
                        ? "Câu Kế Tiếp ➔"
                        : "Hoàn Tất Liều Giải Độc 🎉"}
                    </span>
                  </button>
                )}
              </div>
            ) : (
              /* Success screen */
              <div className="py-4 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 border border-emerald-500/30">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h4 className="text-base font-black text-foreground">
                  Đã Uống Thuốc Giải Độc Thành Công!
                </h4>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Bạn đã nắm vững bản chất cốt lõi và khắc phục dứt điểm tật sai <strong>{activeBug.name}</strong>. Cố gắng duy trì phản xạ này trong các bài tập tới nhé!
                </p>
                <button
                  type="button"
                  onClick={() => setActiveBug(null)}
                  className="px-6 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  Xong & Đóng Lại
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
