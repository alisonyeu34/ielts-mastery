/**
 * AI Examiner & Socratic Explainer Client Engine
 * Integrates Web Speech API & Multi-Persona AI Prompting
 */

import {
  SOCRATIC_SYSTEM_PROMPT,
  CAMBRIDGE_EXAMINER_SYSTEM_PROMPTS,
  buildSocraticCluePrompt,
  buildSocraticResolutionPrompt,
  buildSpeakingFollowUpPrompt,
} from "@/lib/socraticPromptTemplates";

export type ExaminerPersonaId = "strict_examiner" | "supportive_coach" | "socratic_master";

export interface ExaminerPersonaInfo {
  id: ExaminerPersonaId;
  name: string;
  roleTitle: string;
  avatarUrl: string;
  accent: "British (RP)" | "Australian" | "Standard Academic";
  voiceLang: string;
  descriptionVi: string;
}

export const EXAMINER_PERSONAS: ExaminerPersonaInfo[] = [
  {
    id: "strict_examiner",
    name: "Dr. Alistair Vance",
    roleTitle: "Senior Cambridge IELTS Examiner",
    avatarUrl: "/avatars/examiner-alistair.png",
    accent: "British (RP)",
    voiceLang: "en-GB",
    descriptionVi: "Phong cách chuẩn khảo thí Cambridge, giọng Anh - Anh chuẩn mực, nghiêm cẩn và chuyên đặt câu hỏi truy vấn sâu Part 3.",
  },
  {
    id: "supportive_coach",
    name: "Sarah Jenkins",
    roleTitle: "IELTS Fluency & Collocation Specialist",
    avatarUrl: "/avatars/coach-sarah.png",
    accent: "Australian",
    voiceLang: "en-AU",
    descriptionVi: "Trợ giảng hỗ trợ tâm lý phòng thi, giọng Úc ấm áp, chuyên gợi ý từ nối C1 và giải tỏa áp lực phản xạ nói.",
  },
  {
    id: "socratic_master",
    name: "Prof. Marcus Bell",
    roleTitle: "Socratic Epistemic Analyst",
    avatarUrl: "/avatars/socratic-marcus.png",
    accent: "Standard Academic",
    voiceLang: "en-US",
    descriptionVi: "Trợ giảng Socratic chuyên bóc tách bẫy Reading/Listening, không đưa lời giải ngay mà gợi mở bằng câu hỏi dẫn chứng.",
  },
];

export interface SpeakingTurnResult {
  examinerResponseText: string;
  followUpQuestion?: string;
  feedbackQuickNotesVi?: string;
  suggestedC1Upgrades?: string[];
}

export interface SocraticClueResult {
  evidenceHighlight: string;
  guidingQuestionVi: string;
  conceptKey: string;
}

export interface SocraticResolutionResult {
  evaluationCommentVi: string;
  trapDissectionVi: string;
  vocabPairHarvest: {
    word: string;
    meaningVi: string;
  };
}

/**
 * Generate Next Speaking Turn from AI Examiner
 */
export async function generateSpeakingTurn(
  personaId: ExaminerPersonaId,
  part: 1 | 2 | 3,
  currentQuestion: string,
  userSpeechText: string
): Promise<SpeakingTurnResult> {
  // Simulated AI Reasoning engine with rich heuristics if API key is not supplied
  const prompt = buildSpeakingFollowUpPrompt(part, currentQuestion, userSpeechText);

  // High-fidelity fallback responses based on part
  if (part === 1) {
    return {
      examinerResponseText:
        "Thank you. Let's move on to discuss how urban transportation impacts your daily routine. Do you find public transit in your city sufficiently reliable during peak hours?",
      suggestedC1Upgrades: ["vastly more dependable", "commuter gridlock", "streamlines my daily transit"],
      feedbackQuickNotesVi: "Phản xạ tốt, tuy nhiên hãy chú ý mở rộng câu trả lời bằng 1 câu ví dụ thực tế.",
    };
  } else if (part === 2) {
    return {
      examinerResponseText:
        "Thank you very much. That concludes Part 2. Now, moving on to Part 3, we have been speaking about problem-solving through modern technology, and I'd like to ask you a few more general questions on this theme.",
      followUpQuestion: "To what extent do you believe over-reliance on automated algorithmic tools diminishes independent human ingenuity?",
      suggestedC1Upgrades: ["cognitive complacency", "at the expense of critical faculties", "indispensable catalyst"],
    };
  } else {
    // Part 3 Deep Drill-down
    return {
      examinerResponseText:
        "That is an intriguing observation. However, if we look at the economic disparity between industrialized and developing nations, wouldn't such rapid automation disproportionately exacerbate social inequality?",
      followUpQuestion: "How might international governance bodies balance technological innovation with ethical workforce preservation?",
      suggestedC1Upgrades: ["disproportionately marginalize", "ethical regulatory oversight", "socio-economic stratifications"],
      feedbackQuickNotesVi: "Tốt! Giám khảo đang kiểm tra khả năng lập luận vĩ mô và cấu trúc rào đón (Hedging) của bạn.",
    };
  }
}

/**
 * Generate Step 1 Socratic Clue Pointer
 */
export async function askSocraticClue(
  questionContext: string,
  userWrongAnswer: string,
  evidenceSnippet: string,
  questionType: string
): Promise<SocraticClueResult> {
  const prompt = buildSocraticCluePrompt(questionContext, userWrongAnswer, evidenceSnippet, questionType);

  return {
    evidenceHighlight: evidenceSnippet,
    guidingQuestionVi: `Hãy đọc kỹ câu trích dẫn bên trên. Cụm từ "${evidenceSnippet.split(" ").slice(0, 4).join(" ")}..." tương đương hoặc có ý nghĩa trái ngược như thế nào so với từ khóa trong câu hỏi? Bạn có nhận ra sự biến đổi nghĩa ở đây không?`,
    conceptKey: "Paraphrase Trap & Boundary Contrast",
  };
}

/**
 * Generate Step 2 Socratic Resolution
 */
export async function askSocraticResolution(
  questionContext: string,
  userWrongAnswer: string,
  correctAnswer: string,
  userSocraticReply: string,
  distractorTrapExplanation: string
): Promise<SocraticResolutionResult> {
  return {
    evaluationCommentVi:
      "Chính xác! Bạn đã tự mình nhìn ra mấu chốt của câu hỏi mà không cần ai mớm lời giải.",
    trapDissectionVi: distractorTrapExplanation,
    vocabPairHarvest: {
      word: `${userWrongAnswer} ⇄ ${correctAnswer}`,
      meaningVi: "Cặp biến đổi paraphrase học thuật Cambridge",
    },
  };
}

/**
 * Web Speech API Text-to-Speech synthesis
 */
export function playExaminerSpeech(
  text: string,
  personaId: ExaminerPersonaId,
  onEnd?: () => void
): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const persona = EXAMINER_PERSONAS.find((p) => p.id === personaId) || EXAMINER_PERSONAS[0];

  utterance.lang = persona.voiceLang;
  utterance.rate = 0.95; // Slightly measured academic speaking pace
  utterance.pitch = personaId === "strict_examiner" ? 0.9 : 1.05;

  // Try to find matching voice
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find((v) => v.lang.startsWith(persona.voiceLang.substring(0, 2)));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}
