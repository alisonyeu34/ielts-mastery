'use client';

import React, { useRef } from 'react';
import {
  PromptComponentType,
  PromptHighlight,
  PROMPT_COMPONENTS
} from '@/lib/promptDeconstructionValidator';
import { PromptForensicCase } from '@/data/mockPromptForensicsData';
import { Layers, CheckCircle, Trash2, Wand2, Info } from 'lucide-react';

interface PromptHighlighterStudioProps {
  currentCase: PromptForensicCase;
  activeHighlightTool: PromptComponentType;
  setActiveHighlightTool: (tool: PromptComponentType) => void;
  highlights: PromptHighlight[];
  onAddHighlight: (start: number, end: number, text: string) => void;
  onRemoveHighlight: (id: string) => void;
  onResetHighlights: () => void;
  onLoadPreset: () => void;
}

export const PromptHighlighterStudio: React.FC<PromptHighlighterStudioProps> = ({
  currentCase,
  activeHighlightTool,
  setActiveHighlightTool,
  highlights,
  onAddHighlight,
  onRemoveHighlight,
  onResetHighlights,
  onLoadPreset
}) => {
  const promptContainerRef = useRef<HTMLDivElement>(null);

  // Handle text selection inside the prompt box
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !promptContainerRef.current) return;

    const selectedText = selection.toString().trim();
    if (!selectedText) return;

    const promptText = currentCase.promptText;
    const startIndex = promptText.indexOf(selectedText);
    if (startIndex !== -1) {
      const endIndex = startIndex + selectedText.length;
      onAddHighlight(startIndex, endIndex, selectedText);
    }
    selection.removeAllRanges();
  };

  // Render text segments with active highlights
  const renderHighlightedPrompt = () => {
    const text = currentCase.promptText;
    if (highlights.length === 0) {
      return <span>{text}</span>;
    }

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    highlights.forEach((hl) => {
      // Unhighlighted text before this highlight
      if (hl.startIndex > lastIndex) {
        elements.push(
          <span key={`text-${lastIndex}`}>{text.substring(lastIndex, hl.startIndex)}</span>
        );
      }

      const comp = PROMPT_COMPONENTS[hl.type];

      elements.push(
        <mark
          key={hl.id}
          className={`inline-block px-1.5 py-0.5 rounded mx-0.5 border ${comp.bgColor} ${comp.borderColor} ${comp.textColor} font-medium relative group cursor-pointer transition-all duration-150 hover:brightness-125`}
          onClick={() => onRemoveHighlight(hl.id)}
          title={`Click để xóa: ${comp.label}`}
        >
          {hl.selectedText}
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-xs px-2 py-0.5 rounded shadow border border-slate-700 whitespace-nowrap z-20 pointer-events-none">
            {comp.vietnameseLabel} (xóa)
          </span>
        </mark>
      );

      lastIndex = hl.endIndex;
    });

    if (lastIndex < text.length) {
      elements.push(
        <span key={`text-end-${lastIndex}`}>{text.substring(lastIndex)}</span>
      );
    }

    return elements;
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-6">
      {/* Header & Tool Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {currentCase.cambridgeRef}
            </span>
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {currentCase.topicCategory}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-2 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            4-Component Micro-Structural Dissector
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onLoadPreset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5" />
            Xem Phân Tích Mẫu Band 8.5+
          </button>
          <button
            onClick={onResetHighlights}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Đặt Lại
          </button>
        </div>
      </div>

      {/* Palette Tools */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          Chọn Bút Tô Thành Phần (Quét chuột lên văn bản đề bài):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.keys(PROMPT_COMPONENTS) as PromptComponentType[]).map((type) => {
            const comp = PROMPT_COMPONENTS[type];
            const isSelected = activeHighlightTool === type;
            const count = highlights.filter((h) => h.type === type).length;

            return (
              <button
                key={type}
                onClick={() => setActiveHighlightTool(type)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? `${comp.bgColor} ${comp.borderColor} shadow-lg ring-2 ring-offset-2 ring-offset-slate-900 ring-indigo-500`
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${comp.bgColor} border ${comp.borderColor}`} />
                    {comp.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {comp.vietnameseLabel}
                  </div>
                </div>
                {count > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${comp.badgeColor}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Text Dissection Box */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Văn bản Đề Bài (Kéo chuột chọn từ để gán nhãn thành phần):</span>
          <span className="flex items-center gap-1 text-indigo-400">
            <Info className="w-3.5 h-3.5" />
            Click vào vùng đã tô để xóa gán nhãn
          </span>
        </div>
        <div
          ref={promptContainerRef}
          onMouseUp={handleMouseUp}
          className="p-5 bg-slate-950/90 border border-slate-700/80 rounded-xl text-slate-100 text-lg leading-relaxed select-text font-serif tracking-wide shadow-inner transition-colors focus:outline-none focus:border-indigo-500"
        >
          {renderHighlightedPrompt()}
        </div>
      </div>

      {/* Active Highlights Legend Table */}
      {highlights.length > 0 && (
        <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800/80 space-y-2">
          <div className="text-xs font-semibold text-slate-400">Các thành phần đã bóc tách:</div>
          <div className="flex flex-wrap gap-2">
            {highlights.map((h) => {
              const comp = PROMPT_COMPONENTS[h.type];
              return (
                <div
                  key={h.id}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border ${comp.bgColor} ${comp.borderColor} ${comp.textColor}`}
                >
                  <span className="font-semibold">[{comp.label}]:</span>
                  <span className="italic truncate max-w-[240px]">"{h.selectedText}"</span>
                  <button
                    onClick={() => onRemoveHighlight(h.id)}
                    className="ml-1 text-slate-400 hover:text-rose-400"
                    title="Xóa"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
