"use client";

import React from "react";
import Link from "next/link";
import { useMapProcessSession } from "@/hooks/useMapProcessSession";
import { DualMapViewer } from "@/components/practice/map-process/DualMapViewer";
import { CompassRoseTool } from "@/components/practice/map-process/CompassRoseTool";
import { ProcessFlowViewer } from "@/components/practice/map-process/ProcessFlowViewer";
import { PassiveVoiceSentinelInput } from "@/components/practice/map-process/PassiveVoiceSentinelInput";
import { SpatialPrepositionHelper } from "@/components/practice/map-process/SpatialPrepositionHelper";
import { MapProcessEvaluationModal } from "@/components/practice/map-process/MapProcessEvaluationModal";

export default function MapProcessPage() {
  const {
    currentTask,
    allTasks,
    selectedTaskId,
    handleSelectTask,
    essayText,
    handleUpdateEssay,
    handleLoadSampleEssay,
    handleResetEssay,
    activeQuadrant,
    setActiveQuadrant,
    activeStage,
    setActiveStage,
    overallScore,
    isEvaluationModalOpen,
    setIsEvaluationModalOpen,
    isPrepositionHelperOpen,
    setIsPrepositionHelperOpen,
    handleEvaluateEssay,
    isSaved,
    saveResultsToDatabase
  } = useMapProcessSession();

  const handleNextTask = () => {
    const currentIndex = allTasks.findIndex((t) => t.id === selectedTaskId);
    const nextIndex = (currentIndex + 1) % allTasks.length;
    handleSelectTask(allTasks[nextIndex].id);
  };

  const isMap = currentTask.type === 'map';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Link
              href="/practice"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all text-xs font-semibold"
            >
              ← Trung Tâm Luyện Tập
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Step 91/100
                </span>
                <span className="text-xs text-slate-400">
                  Writing Task 1 Non-Numeric Cartography & Process Flow
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Xưởng Giải Phẫu Biểu Đồ Phi Số Liệu: Map & Process
              </h1>
            </div>
          </div>

          {/* Task Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 whitespace-nowrap hidden md:inline">
              Chọn Dạng Bài:
            </span>
            <select
              value={selectedTaskId}
              onChange={(e) => handleSelectTask(e.target.value)}
              className="bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              {allTasks.map((t, idx) => (
                <option key={t.id} value={t.id}>
                  #{idx + 1} [{t.type.toUpperCase()}] - {t.title.length > 40 ? t.title.substring(0, 38) + "..." : t.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Prompt Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
              isMap
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
            }`}>
              {isMap ? 'Bản Đồ Quy Hoạch Đô Thị (Map)' : 'Quy Trình Tuyến Tính / Tuần Hoàn (Process)'}
            </span>
            <span className="text-xs text-slate-400">Thời gian làm bài khuyến nghị: 20 phút</span>
          </div>

          <h2 className="text-lg font-bold text-white">
            {currentTask.title}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentTask.prompt}
          </p>

          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs text-amber-300/90">
            <span className="font-bold">📌 Công thức Overview:</span>
            <span className="italic font-serif">{currentTask.overviewFormula}</span>
          </div>
        </div>

        {/* Task Visual Component: Map or Process */}
        {isMap ? (
          <>
            {currentTask.timeFrames && currentTask.mapFeatures && (
              <DualMapViewer
                timeFrames={currentTask.timeFrames}
                mapFeatures={currentTask.mapFeatures}
                activeQuadrant={activeQuadrant}
                onSelectQuadrant={setActiveQuadrant}
              />
            )}
            <CompassRoseTool />
          </>
        ) : (
          <>
            {currentTask.processStages && (
              <ProcessFlowViewer
                processStages={currentTask.processStages}
                activeStage={activeStage}
                onSelectStage={setActiveStage}
              />
            )}
          </>
        )}

        {/* Text Editor with Passive Voice Sentinel */}
        <PassiveVoiceSentinelInput
          taskType={currentTask.type}
          essayText={essayText}
          onUpdateEssay={handleUpdateEssay}
          onLoadSample={handleLoadSampleEssay}
          onReset={handleResetEssay}
          onEvaluate={handleEvaluateEssay}
          onOpenPrepositionHelper={() => setIsPrepositionHelperOpen(true)}
        />

        {/* Pedagogical Principle Footer Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-xs text-slate-400 space-y-2">
          <h4 className="font-bold text-slate-200 flex items-center gap-2">
            <span>📐</span>
            <span>Nguyên Lý Khảo Thí Dạng Bài Phi Số Liệu Task 1:</span>
          </h4>
          <p className="leading-relaxed">
            Đối với <strong className="text-amber-300">Bản đồ (Map)</strong>, tuyệt đối không dùng phương hướng tương đối (trái/phải/trên/dưới) mà bắt buộc dùng 4 phương 8 hướng la bàn kết hợp chuẩn xác giới từ <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-200 font-mono">in the north</code> (bên trong) vs <code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-200 font-mono">to the north</code> (bên ngoài). Đối với <strong className="text-purple-300">Quy trình (Process)</strong> cơ khí, duy trì 100% thể bị động khách quan và không bỏ sót bất kỳ công đoạn trung gian nào để tối ưu hóa Task Achievement.
          </p>
        </div>

        {/* Modals */}
        <SpatialPrepositionHelper
          isOpen={isPrepositionHelperOpen}
          onClose={() => setIsPrepositionHelperOpen(false)}
        />

        <MapProcessEvaluationModal
          isOpen={isEvaluationModalOpen}
          onClose={() => setIsEvaluationModalOpen(false)}
          overallScore={overallScore}
          isSaved={isSaved}
          onSaveToDatabase={saveResultsToDatabase}
          onNextTask={handleNextTask}
        />
      </div>
    </div>
  );
}
