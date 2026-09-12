"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Task2PromptData,
  MOCK_TASK2_PROMPTS,
  PEELBlockData,
  Task2EssayType,
} from "@/data/mockTask2Prompts";
import { db } from "@/lib/db";
import { ErrorItem, PracticeLog } from "@/types/database";

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export interface ThesisValidationResult {
  status: "strong" | "weak" | "missing";
  message: string;
  hasStanceMarker: boolean;
}

export function validateThesisStatement(
  thesis: string,
  essayType: Task2EssayType
): ThesisValidationResult {
  const clean = thesis.toLowerCase().trim();
  if (!clean || clean.length < 15) {
    return {
      status: "missing",
      message: "Chưa có Thesis Statement hoặc câu luận đề quá ngắn.",
      hasStanceMarker: false,
    };
  }

  // Strong stance markers indicating explicit position
  const stanceMarkers = [
    "i agree",
    "i disagree",
    "i strongly believe",
    "i firmly believe",
    "in my perspective",
    "in my view",
    "in my opinion",
    "this essay argues",
    "i contend that",
    "i maintain that",
    "while i acknowledge",
    "driven by",
    "can be resolved",
    "can be mitigated",
    "i believe that",
    "i am convinced that",
  ];

  const hasMarker = stanceMarkers.some((marker) => clean.includes(marker));

  // Vague thesis warnings
  const vagueMarkers = [
    "there are pros and cons",
    "there are advantages and disadvantages",
    "some agree and some disagree",
    "i will discuss both sides in this essay",
    "has both positive and negative",
  ];

  const hasVagueMarker = vagueMarkers.some((vague) => clean.includes(vague));

  if (hasVagueMarker) {
    return {
      status: "weak",
      message:
        "Luận đề quá mơ hồ (Band 5.0 - 5.5). Không nên chỉ viết 'có cả ưu và nhược điểm' mà phải nêu rõ lập trường nghiêng về bên nào.",
      hasStanceMarker: false,
    };
  }

  if (hasMarker) {
    return {
      status: "strong",
      message:
        "Thesis Statement xuất sắc (Band 7.5+). Có lập trường dứt khoát và trả lời trực diện câu hỏi của đề bài.",
      hasStanceMarker: true,
    };
  }

  return {
    status: "weak",
    message:
      "Cần bổ sung từ khóa thể hiện rõ quan điểm cá nhân (ví dụ: 'In my view', 'I strongly agree that...', 'While..., I contend that...').",
    hasStanceMarker: false,
  };
}

export function usePEELEditor() {
  const [activePromptId, setActivePromptId] = useState<string>("task2_opinion_car_ban");

  const [deconstruction, setDeconstruction] = useState<{
    selectedType: string;
    selectedLimiters: string[];
    isVerified: boolean;
  }>({
    selectedType: "",
    selectedLimiters: [],
    isVerified: false,
  });

  const [intro, setIntro] = useState<{ background: string; thesis: string }>({
    background: "",
    thesis: "",
  });

  const [body1, setBody1] = useState<PEELBlockData>({
    point: "",
    explain: "",
    example: "",
    link: "",
  });

  const [body2, setBody2] = useState<PEELBlockData>({
    point: "",
    explain: "",
    example: "",
    link: "",
  });

  const [conclusion, setConclusion] = useState<string>("");
  const [isAssembled, setIsAssembled] = useState<boolean>(false);

  const activePrompt = useMemo(() => {
    return (
      MOCK_TASK2_PROMPTS.find((p) => p.id === activePromptId) ||
      MOCK_TASK2_PROMPTS[0]
    );
  }, [activePromptId]);

  // Word counts
  const introWordCount = useMemo(
    () => countWords(intro.background) + countWords(intro.thesis),
    [intro]
  );
  const body1WordCount = useMemo(
    () =>
      countWords(body1.point) +
      countWords(body1.explain) +
      countWords(body1.example) +
      countWords(body1.link),
    [body1]
  );
  const body2WordCount = useMemo(
    () =>
      countWords(body2.point) +
      countWords(body2.explain) +
      countWords(body2.example) +
      countWords(body2.link),
    [body2]
  );
  const conclusionWordCount = useMemo(() => countWords(conclusion), [conclusion]);
  const totalWordCount =
    introWordCount + body1WordCount + body2WordCount + conclusionWordCount;

  // Thesis validation
  const thesisValidation = useMemo(() => {
    return validateThesisStatement(intro.thesis, activePrompt.essayType);
  }, [intro.thesis, activePrompt.essayType]);

  const setIntroField = useCallback(
    (field: "background" | "thesis", value: string) => {
      setIntro((prev) => ({ ...prev, [field]: value }));
      setIsAssembled(false);
    },
    []
  );

  const setBody1Field = useCallback(
    (field: keyof PEELBlockData, value: string) => {
      setBody1((prev) => ({ ...prev, [field]: value }));
      setIsAssembled(false);
    },
    []
  );

  const setBody2Field = useCallback(
    (field: keyof PEELBlockData, value: string) => {
      setBody2((prev) => ({ ...prev, [field]: value }));
      setIsAssembled(false);
    },
    []
  );

  const loadModelEssay = useCallback(() => {
    setIntro({
      background: activePrompt.modelIntro.background,
      thesis: activePrompt.modelIntro.thesis,
    });
    setBody1({ ...activePrompt.modelPEELBody1 });
    setBody2({ ...activePrompt.modelPEELBody2 });
    setConclusion(activePrompt.modelConclusion);
  }, [activePrompt]);

  const assembleFullEssay = useCallback(() => {
    setIsAssembled(true);
  }, []);

  const saveEssayDraft = useCallback(
    async (prompt: Task2PromptData) => {
      setIsAssembled(true);

      // Check thesis quality and log to error bank if weak
      if (thesisValidation.status === "weak") {
        try {
          const errorItem: ErrorItem = {
            id: `err_thesis_${Date.now()}`,
            sourceModule: "writing",
            errorType: "careless_reading",
            questionContext: `[Writing Task 2 Thesis Statement - ${prompt.topicTitle}]`,
            userWrongAnswer: intro.thesis || "Chưa có Thesis Statement",
            correctAnswer: prompt.modelIntro.thesis,
            deepExplanation: `[Lỗi Luận Đề Mơ Hồ] ${thesisValidation.message}`,
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          };
          await db.error_bank.put(errorItem);
        } catch (e) {
          console.error("Failed to save Thesis mistake to DB:", e);
        }
      }

      // Check for missing PEEL blocks
      const hasMissingPEEL =
        !body1.point || !body1.explain || !body2.point || !body2.explain;
      if (hasMissingPEEL) {
        try {
          const errorItem: ErrorItem = {
            id: `err_peel_${Date.now()}`,
            sourceModule: "writing",
            errorType: "grammar",
            questionContext: `[Writing Task 2 PEEL Structure - ${prompt.topicTitle}]`,
            userWrongAnswer: "Thiếu thành phần giải thích (Explain) hoặc câu chủ đề (Point)",
            correctAnswer: "Mỗi đoạn thân bài phải có đủ 4 khối: Point, Explanation, Example, Link.",
            deepExplanation:
              "Đoạn văn thiếu cấu trúc PEEL chặt chẽ sẽ bị trừ điểm tiêu chí Coherence & Cohesion và Task Response (không phát triển đầy đủ luận điểm).",
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          };
          await db.error_bank.put(errorItem);
        } catch (e) {
          console.error("Failed to save PEEL mistake to DB:", e);
        }
      }

      // Save to practice_logs
      try {
        const log: PracticeLog = {
          id: `prac_w2_${Date.now()}`,
          type: "writing",
          materialId: prompt.id,
          score:
            totalWordCount >= 250 && thesisValidation.status === "strong"
              ? 8
              : 6,
          timeSpentSeconds: 2400,
          accuracyPercentage: Math.min(
            100,
            Math.round((totalWordCount / 250) * 100)
          ),
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (logErr) {
        console.error("Failed to save Task 2 practice log:", logErr);
      }
    },
    [intro.thesis, body1, body2, thesisValidation, totalWordCount]
  );

  const resetAll = useCallback(() => {
    setDeconstruction({
      selectedType: "",
      selectedLimiters: [],
      isVerified: false,
    });
    setIntro({ background: "", thesis: "" });
    setBody1({ point: "", explain: "", example: "", link: "" });
    setBody2({ point: "", explain: "", example: "", link: "" });
    setConclusion("");
    setIsAssembled(false);
  }, []);

  return {
    activePromptId,
    activePrompt,
    deconstruction,
    intro,
    body1,
    body2,
    conclusion,
    isAssembled,
    introWordCount,
    body1WordCount,
    body2WordCount,
    conclusionWordCount,
    totalWordCount,
    thesisValidation,
    setActivePromptId,
    setDeconstruction,
    setIntroField,
    setBody1Field,
    setBody2Field,
    setConclusion,
    loadModelEssay,
    assembleFullEssay,
    saveEssayDraft,
    resetAll,
  };
}
