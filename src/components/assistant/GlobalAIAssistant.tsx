"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle,
  X,
  Send,
  Image as ImageIcon,
  Sparkles,
  Bot,
  Trash2,
  Volume2,
  ChevronDown,
  Paperclip,
  ZoomIn,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  imageBase64?: string;
  timestamp: number;
  source?: string;
}

const STORAGE_KEY = "ielts_ai_assistant_chat_history_v1";

const INITIAL_GREETING: ChatMessage = {
  id: "msg_welcome",
  role: "assistant",
  text: `👋 **Chào bạn! Mình là IELTS Master AI Tutor.**

Mình ở đây để giải đáp mọi thắc mắc học thuật của bạn 24/7:
- 💡 **Giải ngố thuật ngữ:** Paraphrase, Scanning, Hard/Soft Keywords, Collocation, Distractor...
- 📸 **Đặc biệt: Hỗ trợ phân tích Ảnh!** Bạn chỉ cần bấm vào biểu tượng 📷 hoặc nhấn **Ctrl + V** để dán ảnh đề bài, bài tập, biểu đồ Task 1, mình sẽ đọc chữ và phân tích chi tiết từng bước cho bạn.
- ✍️ **Nâng cấp bài viết & bài nói:** Chỉ ra lỗi sai và đề xuất cách diễn đạt chuẩn Band 7.5+.

Bạn có câu hỏi nào hoặc muốn mình xem giúp ảnh bài tập nào không? 🎯`,
  timestamp: Date.now(),
  source: "assistant",
};

const QUICK_PROMPTS = [
  { label: "💡 Paraphrase là cgi?", query: "Paraphrase là cgi? Giải thích siêu dễ hiểu cho học sinh với!" },
  { label: "📸 Hướng dẫn gửi ảnh đề bài", query: "Làm sao để gửi ảnh đề thi cho bạn đọc và giải giúp mình?" },
  { label: "🔎 Not Given khác False chỗ nào?", query: "Bẫy Not Given và False trong Reading khác nhau thế nào, phân biệt ra sao?" },
  { label: "📊 Viết Overview Task 1", query: "Đoạn Overview trong Writing Task 1 viết thế nào để ăn điểm tối đa?" },
  { label: "🎙️ Nói Speaking không bị cộc lốc", query: "Làm sao để trả lời Speaking Part 1 không bị cộc lốc rồi im bặt?" },
];

export function GlobalAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewZoomImage, setPreviewZoomImage] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 1. Load history from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn("Failed to load chat history:", e);
    }
    setMessages([INITIAL_GREETING]);
  }, []);

  // 2. Save history to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (e) {
        console.warn("Failed to save chat history:", e);
      }
    }
  }, [messages]);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, scrollToBottom]);

  // Handle File Upload
  const processImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chỉ chọn tệp hình ảnh (PNG, JPG, WEBP).");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert("Kích thước ảnh tối đa là 8MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setSelectedImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
    // reset
    e.target.value = "";
  };

  // Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Clipboard Paste support (Ctrl + V with image)
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          processImageFile(file);
          e.preventDefault();
          break;
        }
      }
    }
  };

  // Read Aloud Text using Web Speech
  const handleReadAloud = (id: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Trình duyệt của bạn chưa hỗ trợ phát âm thanh trực tiếp.");
      return;
    }

    if (speakingMsgId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setSpeakingMsgId(id);

    // Clean markdown symbols for cleaner TTS
    const cleanText = text
      .replace(/[#*_`>-]/g, "")
      .replace(/https?:\/\/[^\s]+/g, "")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "vi-VN";
    utterance.rate = 1.0;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Clear chat history
  const handleClearHistory = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện này không?")) {
      window.speechSynthesis?.cancel();
      setMessages([INITIAL_GREETING]);
      setSelectedImage(null);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    }
  };

  // Send Message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : inputMessage).trim();
    if (!text && !selectedImage) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      text: text || "Hãy phân tích hình ảnh đính kèm này giúp em.",
      imageBase64: selectedImage || undefined,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    const imagePayload = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          imageBase64: imagePayload,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: "assistant",
          text: data.reply || "Mình đã nhận được câu hỏi, bạn cần tìm hiểu kỹ hơn phần nào?",
          timestamp: Date.now(),
          source: data.source || "ai",
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setMessages((prev) => [
          ...prev,
          {
            id: `err_${Date.now()}`,
            role: "assistant",
            text: errorData.error || "Có chút gián đoạn kết nối, bạn vui lòng thử lại nhé!",
            timestamp: Date.now(),
            source: "error",
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: "assistant",
          text: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại đường truyền mạng.",
          timestamp: Date.now(),
          source: "error",
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* 1. Floating Action Button (FAB) at Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-md border border-blue-500/30 shadow-lg text-xs font-bold text-foreground cursor-pointer hover:border-blue-500 transition-all animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Hỏi Trợ lý IELTS 24/7 (Có gửi ảnh 📸)</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Mở Trợ lý ảo IELTS"
          className={cn(
            "relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-all duration-300 cursor-pointer",
            isOpen
              ? "bg-rose-500 hover:bg-rose-600 rotate-90 scale-95"
              : "bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 hover:scale-105 hover:shadow-blue-500/50"
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <Bot className="h-7 w-7" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-background" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* 2. Floating Chat Window */}
      {isOpen && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[430px] h-[580px] max-h-[82vh]",
            "bg-card/95 backdrop-blur-xl border border-blue-500/30 shadow-2xl rounded-3xl flex flex-col overflow-hidden",
            "animate-in fade-in slide-in-from-bottom-6 duration-200"
          )}
        >
          {/* Drag Overlay */}
          {isDragOver && (
            <div className="absolute inset-0 z-40 bg-blue-600/20 backdrop-blur-sm border-2 border-dashed border-blue-500 rounded-3xl flex flex-col items-center justify-center text-blue-600 dark:text-blue-400 pointer-events-none space-y-2">
              <ImageIcon className="h-12 w-12 animate-bounce" />
              <p className="text-sm font-bold">Thả ảnh vào đây để gửi cho Trợ lý AI</p>
            </div>
          )}

          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-transparent border-b border-border/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-500/20">
                <Bot className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-card" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black text-foreground">IELTS Master AI Tutor</h3>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-600 dark:text-blue-400">
                    Multimodal
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Sẵn sàng • Trả lời tức thì • Đọc ảnh</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearHistory}
                title="Xóa lịch sử chat"
                className="p-2 rounded-xl text-muted-foreground hover:text-rose-500 hover:bg-secondary cursor-pointer transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Thu nhỏ"
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer transition-colors"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 text-xs leading-relaxed">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col space-y-1.5",
                  msg.role === "user" ? "items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[88%] rounded-2xl p-3 shadow-xs space-y-2 select-text",
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-xs"
                      : "bg-secondary/70 border border-border/80 text-foreground rounded-bl-xs"
                  )}
                >
                  {/* Uploaded Image Thumbnail */}
                  {msg.imageBase64 && (
                    <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-white/20">
                      <img
                        src={msg.imageBase64}
                        alt="Ảnh đính kèm"
                        className="max-h-48 w-full object-cover group-hover:scale-105 transition-transform"
                        onClick={() => setPreviewZoomImage(msg.imageBase64 || null)}
                      />
                      <div
                        onClick={() => setPreviewZoomImage(msg.imageBase64 || null)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity font-bold gap-1 text-[11px]"
                      >
                        <ZoomIn className="h-4 w-4" />
                        <span>Xem ảnh lớn</span>
                      </div>
                    </div>
                  )}

                  {/* Message Text with Simple Markdown Formatting */}
                  <div className="whitespace-pre-line leading-relaxed break-words font-sans">
                    {msg.text}
                  </div>
                </div>

                {/* Sub-actions for assistant message */}
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground px-1">
                    <button
                      type="button"
                      onClick={() => handleReadAloud(msg.id, msg.text)}
                      className={cn(
                        "flex items-center gap-1 hover:text-blue-500 cursor-pointer transition-colors",
                        speakingMsgId === msg.id && "text-blue-500 font-bold"
                      )}
                    >
                      <Volume2 className="h-3 w-3" />
                      <span>{speakingMsgId === msg.id ? "Đang đọc..." : "Đọc to"}</span>
                    </button>
                    {msg.source && msg.source.includes("vision") && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-mono">
                        📸 Đã phân tích ảnh
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-secondary/70 border border-border/80 max-w-[80%]">
                <Bot className="h-4 w-4 text-blue-500 animate-spin" />
                <span className="text-xs text-muted-foreground animate-pulse">
                  Gia sư AI đang đọc nội dung và suy nghĩ...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions (if only 1 greeting message) */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-3.5 py-1.5 border-t border-border/60 bg-secondary/30">
              <p className="text-[10px] text-muted-foreground font-bold mb-1.5 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-500" />
                <span>Gợi ý hỏi nhanh:</span>
              </p>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(prompt.query)}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-card border border-border hover:border-blue-500/50 hover:bg-blue-500/10 text-foreground/90 whitespace-nowrap cursor-pointer transition-all"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input & Image Attachment Area */}
          <div className="p-3 border-t border-border/80 bg-card space-y-2 shrink-0">
            {/* Image Preview Thumbnail */}
            {selectedImage && (
              <div className="relative inline-flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <img
                  src={selectedImage}
                  alt="Ảnh đã chọn"
                  className="h-10 w-10 object-cover rounded-lg border border-blue-500/40"
                />
                <div className="text-[11px] leading-tight">
                  <p className="font-bold text-blue-600 dark:text-blue-400">Đã đính kèm ảnh 📸</p>
                  <p className="text-muted-foreground text-[10px]">AI sẽ đọc chữ & biểu đồ trong ảnh</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  title="Hủy ảnh"
                  className="ml-2 p-1 rounded-full bg-secondary hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-end gap-1.5">
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {/* Attach Image Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Đính kèm ảnh bài tập hoặc đề thi (Ctrl+V để dán ảnh)"
                className={cn(
                  "p-2.5 rounded-xl border border-border hover:bg-secondary text-muted-foreground hover:text-blue-500 cursor-pointer transition-colors shrink-0",
                  selectedImage && "border-blue-500 text-blue-600 bg-blue-500/10"
                )}
              >
                <ImageIcon className="h-5 w-5" />
              </button>

              {/* Text Input Area */}
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  placeholder={
                    selectedImage
                      ? "Nhập câu hỏi về bức ảnh này..."
                      : "Hỏi thắc mắc hoặc dán ảnh (Ctrl + V)..."
                  }
                  rows={1}
                  className="w-full resize-none rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500 max-h-24"
                />
              </div>

              {/* Send Button */}
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={(!inputMessage.trim() && !selectedImage) || isLoading}
                title="Gửi câu hỏi (Enter)"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-all cursor-pointer shrink-0 shadow-sm",
                  (!inputMessage.trim() && !selectedImage) || isLoading
                    ? "bg-secondary text-muted-foreground cursor-not-allowed opacity-50"
                    : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-blue-500/30"
                )}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            <p className="text-[10px] text-muted-foreground text-center">
              Nhấn <strong>Enter</strong> để gửi • <strong>Shift + Enter</strong> để xuống dòng • Hỗ trợ dán ảnh <strong>Ctrl + V</strong>
            </p>
          </div>
        </div>
      )}

      {/* 3. Image Zoom Modal */}
      {previewZoomImage && (
        <div
          onClick={() => setPreviewZoomImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-150"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
            <img
              src={previewZoomImage}
              alt="Phóng to ảnh"
              className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setPreviewZoomImage(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
