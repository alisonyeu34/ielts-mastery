"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useCDIELTSMockSession } from "@/hooks/useCDIELTSMockSession";
import { CDIELTSHeaderBar } from "@/components/mock-test/CDIELTSHeaderBar";
import { CDIELTSFooterNavigator } from "@/components/mock-test/CDIELTSFooterNavigator";
import { ThreePassProtocolSwitcher } from "@/components/mock-test/ThreePassProtocolSwitcher";
import { Pass1TimedRunner } from "@/components/mock-test/Pass1TimedRunner";
import { Pass2UntimedExplorer } from "@/components/mock-test/Pass2UntimedExplorer";
import { Pass3ForensicAudit } from "@/components/mock-test/Pass3ForensicAudit";
import { OfficialScoreReportModal } from "@/components/mock-test/OfficialScoreReportModal";
import {
  StickyNote,
  X,
  HelpCircle,
  Award,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  AlertCircle,
} from "lucide-react";

export default function CDIELTSMockTestSessionPage() {
  const params = useParams();
  const testId = params.testId as string;

  const {
    examData,
    currentSkill,
    setCurrentSkill,
    currentPass,
    setCurrentPass,
    activeQuestionNumber,
    selectQuestionNumber,
    activeQuestionItem,
    activeQuestionsList,
    goToNextQuestion,
    goToPrevQuestion,

    // Answers
    pass1Answers,
    pass2Answers,
    setAnswer,
    writingSubmissions,
    setWritingSubmissions,
    speakingSubmissions,
    setSpeakingSubmissions,

    // Flags
    flaggedQuestions,
    toggleFlagQuestion,

    // Timer
    timeLeftSeconds,
    effectiveTimeHidden,
    isTimeCriticallyLow,
    toggleHideTime,

    // Notes
    notes,
    addNote,
    removeNote,

    // Scores & Modals
    isScoreReportOpen,
    setIsScoreReportOpen,
    scoreReportData,
    gapAnalysis,
    submitPass1,
    submitPass2AndSaveDb,
    harvestVocabToMatrix,
  } = useCDIELTSMockSession();

  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [noteInput, setNoteInput] = useState("");

  const handleSetWriting = (task: "task1" | "task2", text: string) => {
    setWritingSubmissions((prev) => ({ ...prev, [task]: text }));
  };

  const handleSetSpeaking = (id: string, text: string) => {
    setSpeakingSubmissions((prev) => ({ ...prev, [id]: text }));
  };

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    addNote(noteInput.trim());
    setNoteInput("");
  };

  // Submit flow
  const handleSubmitSkill = () => {
    if (currentPass === "pass1") {
      submitPass1();
    } else if (currentPass === "pass2") {
      submitPass2AndSaveDb();
    } else {
      setIsScoreReportOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between select-none">
      {/* 1. Official CD-IELTS Top Header Bar */}
      <CDIELTSHeaderBar
        currentSkill={currentSkill}
        onSelectSkill={setCurrentSkill}
        timeLeftSeconds={timeLeftSeconds}
        isTimeHidden={effectiveTimeHidden}
        isTimeCriticallyLow={isTimeCriticallyLow}
        onToggleHideTime={toggleHideTime}
        notesCount={notes.length}
        onOpenNotes={() => setIsNotesOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onSubmitCurrentSkill={handleSubmitSkill}
        testCode={examData.code}
      />

      {/* 2. Main Exam Canvas Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-5">
        {/* Three Pass Protocol Switcher */}
        <ThreePassProtocolSwitcher
          currentPass={currentPass}
          onSelectPass={setCurrentPass}
          isPass1Completed={scoreReportData !== null || currentPass !== "pass1"}
          isPass2Completed={currentPass === "pass3"}
        />

        {/* Dynamic Pass Mode Runner */}
        {currentPass === "pass1" && (
          <Pass1TimedRunner
            examData={examData}
            currentSkill={currentSkill}
            activeQuestionNumber={activeQuestionNumber}
            onSelectQuestionNumber={selectQuestionNumber}
            userAnswers={pass1Answers}
            onSetAnswer={setAnswer}
            writingSubmissions={writingSubmissions}
            onSetWriting={handleSetWriting}
            speakingSubmissions={speakingSubmissions}
            onSetSpeaking={handleSetSpeaking}
          />
        )}

        {currentPass === "pass2" && (
          <Pass2UntimedExplorer
            examData={examData}
            currentSkill={currentSkill}
            activeQuestionNumber={activeQuestionNumber}
            onSelectQuestionNumber={selectQuestionNumber}
            pass1Answers={pass1Answers}
            pass2Answers={pass2Answers}
            onSetPass2Answer={setAnswer}
            onSubmitPass2={submitPass2AndSaveDb}
          />
        )}

        {currentPass === "pass3" && (
          <Pass3ForensicAudit
            examData={examData}
            currentSkill={currentSkill}
            pass1Answers={pass1Answers}
            pass2Answers={pass2Answers}
            onHarvestVocab={harvestVocabToMatrix}
          />
        )}
      </main>

      {/* 3. Bottom Question Palette Footer (for Listening & Reading in Pass 1/2) */}
      {(currentSkill === "listening" || currentSkill === "reading") && currentPass !== "pass3" && (
        <CDIELTSFooterNavigator
          totalQuestions={activeQuestionsList.length || 40}
          activeQuestionNumber={activeQuestionNumber}
          onSelectQuestionNumber={selectQuestionNumber}
          answeredQuestionIds={currentPass === "pass1" ? pass1Answers : pass2Answers}
          questionsList={activeQuestionsList}
          flaggedQuestions={flaggedQuestions}
          onToggleFlag={toggleFlagQuestion}
          onPrev={goToPrevQuestion}
          onNext={goToNextQuestion}
        />
      )}

      {/* Notes Drawer Modal */}
      {isNotesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <StickyNote className="h-4 w-4 text-amber-400" />
                <h4 className="font-extrabold text-white text-sm">Ghi Chú Phòng Thi (Exam Notes)</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsNotesOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
                placeholder={`Ghi chú cho câu ${activeQuestionNumber}...`}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <button
                type="button"
                onClick={handleAddNote}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
              >
                Thêm
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {notes.length === 0 ? (
                <p className="text-slate-500 py-4 text-center">Chưa có ghi chú nào.</p>
              ) : (
                notes.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex items-start justify-between gap-2"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-amber-400 font-bold block">
                        Câu {n.questionNumber} • {n.timestamp}
                      </span>
                      <p className="text-slate-200 mt-0.5">{n.text}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeNote(n.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-indigo-400" />
                <h4 className="font-extrabold text-white text-sm">Hướng Dẫn Thi Máy Computer-Delivered IELTS</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsHelpOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-slate-300 leading-relaxed">
              <p>
                • <strong>Phím tắt điều hướng:</strong> Dùng <code className="text-amber-400 font-bold">Alt + N</code> (Next), <code className="text-amber-400 font-bold">Alt + B</code> (Back), <code className="text-amber-400 font-bold">Alt + F</code> (Gắn cờ Review), hoặc phím <code className="text-amber-400 font-bold">Tab</code> / <code className="text-amber-400 font-bold">Shift+Tab</code>.
              </p>
              <p>
                • <strong>Đồng hồ đếm ngược:</strong> Bấm <code className="text-amber-400 font-bold">Hide Time</code> để ẩn đồng hồ nếu cảm thấy áp lực. Đồng hồ sẽ tự động hiện cố định ở 5 phút cuối bài thi.
              </p>
              <p>
                • <strong>Quy trình 1 Đề Làm 3 Lần:</strong>
                <br />- <strong>Pass 1:</strong> Làm nghiêm ngặt theo giờ chuẩn.
                <br />- <strong>Pass 2:</strong> Không giới hạn giờ, tra cứu ngữ cảnh và sửa đáp án.
                <br />- <strong>Pass 3:</strong> Mổ xẻ bẫy khảo thí và nạp từ vựng vào Sổ Từ Vựng (FSRS).
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsHelpOpen(false)}
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              Đã Hiểu & Tiếp Tục Bài Thi
            </button>
          </div>
        </div>
      )}

      {/* Official Score Report Modal */}
      <OfficialScoreReportModal
        isOpen={isScoreReportOpen}
        onClose={() => setIsScoreReportOpen(false)}
        scores={scoreReportData}
        gapAnalysis={gapAnalysis}
        testTitle={examData.title}
        testCode={examData.code}
        onProceedToPass3={() => {
          setCurrentPass("pass3");
        }}
      />
    </div>
  );
}
