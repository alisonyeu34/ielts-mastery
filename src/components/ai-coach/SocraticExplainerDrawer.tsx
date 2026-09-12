"use client";

import React, { useState } from "react";
import {
  askSocraticClue,
  askSocraticResolution,
  SocraticClueResult,
  SocraticResolutionResult,
} from "@/lib/aiExaminerClient";
import { db } from "@/lib/db";
import { VocabCard } from "@/types/database";
import {
  Microscope,
  HelpCircle,
  Sparkles,
  Send,
  CheckCircle2,
  BookmarkPlus,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SocraticExplainerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  questionContext: string;
  userWrongAnswer: string;
  correctAnswer: string;
  evidenceSnippet: string;
  questionType?: string;
  distractorTrapExplanation?: string;
  className?: string;
}

export function SocraticExplainerDrawer({
  isOpen,
  onClose,
  questionContext,
  userWrongAnswer,
  correctAnswer,
  evidenceSnippet,
  questionType = "Reading Completion / TFNG",
  distractorTrapExplanation = "Bẫy từ đồng nghĩa (Paraphrase Trap) và mâu thuẫn phạm vi điều kiện.",
  className,
}: SocraticExplainerDrawerProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [userReply, setUserReply] = useState<string>("");
  const [clueResult, setClueResult] = useState<SocraticClueResult | null>(null);
  const [resolutionResult, setResolutionResult] = useState<SocraticResolutionResult | null>(null);
  const [isHarvested, setIsHarvested] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load Step 1 on open
  React.useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setUserReply("");
      setIsHarvested(false);
      setIsLoading(true);

      askSocraticClue(questionContext, userWrongAnswer, evidenceSnippet, questionType).then((res) => {
        setClueResult(res);
        setIsLoading(false);
      });
    }
  }, [isOpen, questionContext, userWrongAnswer, evidenceSnippet, questionType]);

  const handleSubmitStep1 = async () => {
    if (!userReply.trim()) return;
    setIsLoading(true);

    const res = await askSocraticResolution(
      questionContext,
      userWrongAnswer,
      correctAnswer,
      userReply.trim(),
      distractorTrapExplanation
    );

    setResolutionResult(res);
    setCurrentStep(2);
    setIsLoading(false);
  };

  const handleHarvestVocab = async () => {
    if (!resolutionResult) return;
    try {
      const card: VocabCard = {
        id: `vocab_socratic_${Date.now()}`,
        word: resolutionResult.vocabPairHarvest.word,
        ipa: "/ˈpær.ə.freɪz/",
        meaning: resolutionResult.vocabPairHarvest.meaningVi,
        definitionEn: resolutionResult.vocabPairHarvest.word,
        collocations: [],
        originalContext: evidenceSnippet,
        category: "c1_academic",
        status: "learning",
        stepInterval: 1,
        nextReviewDate: new Date().toISOString(),
        repetitionCount: 0,
        lapsesCount: 0,
        bandLevel: "7.5+",
        sourceModule: "reading",
        createdAt: new Date().toISOString(),
      };
      await db.vocab_matrix.put(card);
      setIsHarvested(true);
    } catch (e) {
      console.error("Failed to harvest socratic vocab:", e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
              <Microscope className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-foreground">
                Trợ Giảng Socratic: Tự Nhận Diện Bẫy Khảo Thí
              </h3>
              <span className="text-xs text-muted-foreground font-mono">
                Phương pháp 2 Bước Gợi Mở (Guided Epiphany)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground hover:bg-secondary cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold">
          <span
            className={cn(
              "px-3 py-1 rounded-xl transition-all",
              currentStep === 1
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-emerald-500/10 text-emerald-600"
            )}
          >
            Bước 1: Manh Mối Dẫn Chứng
          </span>
          <span>➔</span>
          <span
            className={cn(
              "px-3 py-1 rounded-xl transition-all",
              currentStep === 2
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-secondary text-muted-foreground"
            )}
          >
            Bước 2: Giải Mã & Thu Hoạch
          </span>
        </div>

        {/* STEP 1 CONTENT */}
        {currentStep === 1 && (
          <div className="space-y-4 text-xs">
            {/* Context & Mistake */}
            <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/80 space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase block">
                CÂU HỎI VÀ LỰA CHỌN CỦA BẠN:
              </span>
              <p className="font-bold text-foreground">{questionContext}</p>
              <div className="text-rose-600 dark:text-rose-400 font-mono font-bold">
                Đáp án bạn chọn: "{userWrongAnswer}" (Chưa chính xác)
              </div>
            </div>

            {/* Clue Pointer Box */}
            {clueResult && (
              <div className="p-4 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/30 space-y-2.5">
                <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold font-mono text-[10px] uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Dẫn chứng trong bài (Evidence Pointer):</span>
                </div>

                <p className="font-serif italic text-foreground text-xs leading-relaxed p-2.5 rounded-xl bg-card border border-indigo-500/20">
                  "{clueResult.evidenceHighlight}"
                </p>

                <p className="text-foreground font-medium leading-relaxed">
                  💡 <strong>Câu hỏi gợi mở từ Socratic AI:</strong> {clueResult.guidingQuestionVi}
                </p>
              </div>
            )}

            {/* User Input Field */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-foreground block">
                Phản hồi của bạn (Bạn nhận ra điều gì từ dẫn chứng trên?):
              </label>
              <textarea
                value={userReply}
                onChange={(e) => setUserReply(e.target.value)}
                placeholder="Ví dụ: Tôi nhận ra cụm từ trong bài đọc là từ trái nghĩa / đồng nghĩa với từ khóa trong câu hỏi..."
                rows={3}
                className="w-full p-3 rounded-xl border border-border bg-secondary/20 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-medium"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmitStep1}
              disabled={isLoading || !userReply.trim()}
              className={cn(
                "w-full py-2.5 rounded-xl text-xs font-bold text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all",
                userReply.trim()
                  ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25"
                  : "bg-secondary text-muted-foreground cursor-not-allowed opacity-50"
              )}
            >
              <span>Kiểm Tra Lập Luận Cùng Trợ Giảng AI</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* STEP 2 CONTENT */}
        {currentStep === 2 && resolutionResult && (
          <div className="space-y-4 text-xs">
            {/* Epiphany Assessment */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold font-mono">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>ĐÁNH GIÁ CỦA TRỢ GIẢNG SOCRATIC:</span>
              </div>
              <p className="text-foreground leading-relaxed font-medium">
                {resolutionResult.evaluationCommentVi}
              </p>
            </div>

            {/* Trap Dissection */}
            <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-2">
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase block">
                BÓC TÁCH MÁNH KHÓE BẪY CAMBRIDGE:
              </span>
              <p className="text-foreground leading-relaxed">
                {resolutionResult.trapDissectionVi}
              </p>
            </div>

            {/* Harvestable Pair */}
            <div className="p-4 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/30 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase block">
                  CẶP TỪ PARAPHRASE THU HOẠCH:
                </span>
                <span className="text-sm font-black font-mono text-foreground">
                  {resolutionResult.vocabPairHarvest.word}
                </span>
              </div>

              <button
                type="button"
                onClick={handleHarvestVocab}
                disabled={isHarvested}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-sm",
                  isHarvested
                    ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-500"
                )}
              >
                {isHarvested ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Đã Lưu Vào Vocab Matrix</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="h-3.5 w-3.5" />
                    <span>Lưu Vào Sổ Từ Vựng (FSRS)</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border cursor-pointer"
            >
              Đã Hiểu & Đóng Ngăn Kéo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
