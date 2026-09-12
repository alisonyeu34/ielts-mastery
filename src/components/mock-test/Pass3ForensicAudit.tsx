"use client";

import React, { useState } from "react";
import {
  FullMockExamData,
  ExamQuestion,
  HarvestableVocabItem,
} from "@/data/mockFullExamData";
import { MockSkillType } from "@/hooks/useCDIELTSMockSession";
import {
  Microscope,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BookOpen,
  BookmarkPlus,
  Check,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Pass3ForensicAuditProps {
  examData: FullMockExamData;
  currentSkill: MockSkillType;
  pass1Answers: Record<string, string>;
  pass2Answers: Record<string, string>;
  onHarvestVocab: (items: HarvestableVocabItem[]) => Promise<void>;
  className?: string;
}

export function Pass3ForensicAudit({
  examData,
  currentSkill,
  pass1Answers,
  pass2Answers,
  onHarvestVocab,
  className,
}: Pass3ForensicAuditProps) {
  const [filterMode, setFilterMode] = useState<"all" | "wrong" | "improved">("all");
  const [harvestedSuccess, setHarvestedSuccess] = useState<boolean>(false);

  const questionsList: ExamQuestion[] =
    currentSkill === "listening"
      ? examData.listening.parts.flatMap((p) => p.questions)
      : examData.reading.passages.flatMap((p) => p.questions);

  const isAnswerCorrect = (q: ExamQuestion, ans: string | undefined) => {
    if (!ans) return false;
    const userVal = ans.trim().toLowerCase();
    const correct = q.correctAnswer.trim().toLowerCase();
    const acceptable = (q.acceptableAnswers || []).map((a) => a.trim().toLowerCase());
    return userVal === correct || acceptable.includes(userVal);
  };

  const filteredQuestions = questionsList.filter((q) => {
    const isPass1Correct = isAnswerCorrect(q, pass1Answers[q.id]);
    const isPass2Correct = isAnswerCorrect(q, pass2Answers[q.id] || pass1Answers[q.id]);

    if (filterMode === "wrong") {
      return !isPass1Correct;
    }
    if (filterMode === "improved") {
      return !isPass1Correct && isPass2Correct;
    }
    return true;
  });

  const handleHarvestAll = async () => {
    await onHarvestVocab(examData.harvestableVocab);
    setHarvestedSuccess(true);
    setTimeout(() => setHarvestedSuccess(false), 3000);
  };

  return (
    <div className={cn("space-y-5 select-none", className)}>
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30">
            <Microscope className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-foreground">
              Pass 3: Giải Phẫu Khảo Thí & Thu Hoạch Từ Vựng Toàn Diện
            </h4>
            <span className="text-muted-foreground">
              Mổ xẻ từng câu sai, bóc tách cơ chế bẫy gây nhiễu và định vị chính xác vùng dẫn chứng đáp án.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleHarvestAll}
          disabled={harvestedSuccess}
          className={cn(
            "px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-sm",
            harvestedSuccess
              ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
              : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500"
          )}
        >
          {harvestedSuccess ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Đã Thu Hoạch Vào Sổ Từ Vựng (FSRS)</span>
            </>
          ) : (
            <>
              <BookmarkPlus className="h-4 w-4" />
              <span>Thu Hoạch Toàn Bộ Từ Vựng Sang Vocab Matrix</span>
            </>
          )}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-2 text-xs">
        <button
          type="button"
          onClick={() => setFilterMode("all")}
          className={cn(
            "px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
            filterMode === "all"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          Tất Cả ({questionsList.length} Câu)
        </button>

        <button
          type="button"
          onClick={() => setFilterMode("wrong")}
          className={cn(
            "px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1",
            filterMode === "wrong"
              ? "bg-rose-600 text-white shadow-sm"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          <XCircle className="h-3.5 w-3.5" />
          <span>Chỉ Xem Câu Sai Ở Pass 1</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterMode("improved")}
          className={cn(
            "px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1",
            filterMode === "improved"
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Câu Đã Sửa Đúng Ở Pass 2</span>
        </button>
      </div>

      {/* Forensic Audit 3-Column Table / Card Grid */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="py-12 text-center text-xs text-muted-foreground">
            Không có câu hỏi nào khớp với bộ lọc đã chọn.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isPass1Correct = isAnswerCorrect(q, pass1Answers[q.id]);
            const isPass2Correct = isAnswerCorrect(q, pass2Answers[q.id] || pass1Answers[q.id]);
            const ans1 = pass1Answers[q.id] || "(Chưa làm)";
            const ans2 = pass2Answers[q.id] || pass1Answers[q.id] || "(Chưa làm)";

            return (
              <div
                key={q.id}
                className={cn(
                  "p-4 sm:p-5 rounded-2xl border transition-all space-y-4 text-xs bg-card",
                  isPass1Correct
                    ? "border-emerald-500/30 bg-emerald-500/[0.02]"
                    : "border-rose-500/30 bg-rose-500/[0.02]"
                )}
              >
                {/* Row Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-xl font-mono text-xs font-bold text-white shadow-sm",
                        isPass1Correct ? "bg-emerald-600" : "bg-rose-600"
                      )}
                    >
                      {q.questionNumber}
                    </span>

                    <div>
                      <h4 className="font-extrabold text-foreground text-sm">
                        Câu {q.questionNumber}: {q.prompt}
                      </h4>
                      <span className="text-[11px] text-muted-foreground">
                        Dạng bài: <strong className="uppercase font-mono">{q.type}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {isPass1Correct ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Đúng ở Pass 1</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-[10px] border border-rose-500/20 flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        <span>Sai ở Pass 1</span>
                      </span>
                    )}

                    {!isPass1Correct && isPass2Correct && (
                      <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] border border-indigo-500/20 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        <span>Sửa đúng ở Pass 2 (+Điểm)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* 3-Column Content Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {/* Col 1: Answer Comparison */}
                  <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/80 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase block">
                      1. ĐỐI SOÁT ĐÁP ÁN:
                    </span>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Đáp án Pass 1:</span>
                        <strong className={cn("font-mono", isPass1Correct ? "text-emerald-600" : "text-rose-600")}>
                          {ans1}
                        </strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Đáp án Pass 2:</span>
                        <strong className={cn("font-mono", isPass2Correct ? "text-emerald-600" : "text-amber-600")}>
                          {ans2}
                        </strong>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-border/60">
                        <span className="font-bold text-foreground">Đáp án chuẩn Cambridge:</span>
                        <strong className="font-mono text-emerald-600 font-extrabold text-sm">
                          {q.correctAnswer}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Col 2: Trap Classification & Forensic Explanation */}
                  <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">
                        2. GIẢI MÃ BẪY KHẢO THÍ:
                      </span>
                      {q.distractorTrapType && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20 uppercase font-mono">
                          {q.distractorTrapType}
                        </span>
                      )}
                    </div>

                    <p className="text-foreground/90 leading-relaxed font-medium">
                      {q.distractorExplanationVi}
                    </p>
                  </div>

                  {/* Col 3: Evidence Quote & Paraphrase Mapping */}
                  <div className="p-3.5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                        3. DẪN CHỨNG & PARAPHRASE:
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground font-bold">
                        Vị trí: {q.evidenceLocator}
                      </span>
                    </div>

                    <p className="font-serif italic text-foreground text-[11px] leading-relaxed">
                      "{q.evidenceQuote}"
                    </p>

                    {q.paraphraseMapping && (
                      <div className="pt-1.5 border-t border-emerald-500/20 text-[10px] font-mono flex items-center gap-1.5 flex-wrap">
                        <span className="text-muted-foreground font-medium">Câu hỏi:</span>
                        <strong className="text-foreground">{q.paraphraseMapping.questionKeyword}</strong>
                        <span className="text-muted-foreground">⇄</span>
                        <span className="text-muted-foreground font-medium">Bài đọc:</span>
                        <strong className="text-emerald-600 dark:text-emerald-400">{q.paraphraseMapping.targetKeyword}</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
