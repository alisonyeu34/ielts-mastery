"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Volume2,
  Filter,
  Search,
  BookOpen,
  Info,
  Smile,
  Layers,
} from "lucide-react";
import { MOCK_IPA_DATA, IPAPhoneme, PhonemeType } from "@/data/mockIPAData";
import { PhonemeCell } from "@/components/practice/pronunciation/PhonemeCell";
import { MouthPositionModal } from "@/components/practice/pronunciation/MouthPositionModal";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "vowels" | "consonants";

export function IPASoundboardGrid() {
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhoneme, setSelectedPhoneme] = useState<IPAPhoneme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { playSound, isPlaying, currentlyPlayingId } = useAudioPlayer();

  const handlePlayPhoneme = (phoneme: IPAPhoneme, e: React.MouseEvent) => {
    e.stopPropagation();
    playSound(phoneme.id, phoneme.sampleWord);
  };

  const handleSelectPhoneme = (phoneme: IPAPhoneme) => {
    setSelectedPhoneme(phoneme);
    setIsModalOpen(true);
  };

  // Filtered dataset
  const filteredPhonemes = MOCK_IPA_DATA.filter((p) => {
    const matchesTab =
      filterTab === "all" ||
      (filterTab === "vowels" && p.category === "vowel") ||
      (filterTab === "consonants" && p.category === "consonant");

    const matchesSearch =
      searchQuery === "" ||
      p.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sampleWord.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Boolean(p.sampleWordMeaningVi?.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  // Groupings
  const monophthongs = filteredPhonemes.filter((p) =>
    p.type.startsWith("monophthong")
  );
  const diphthongs = filteredPhonemes.filter((p) => p.type === "diphthong");
  const voicelessConsonants = filteredPhonemes.filter(
    (p) => p.type === "consonant_voiceless"
  );
  const voicedConsonants = filteredPhonemes.filter(
    (p) => p.type === "consonant_voiced"
  );

  return (
    <div className="space-y-6">
      {/* Top Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-3xl bg-card border border-border/80 shadow-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/60 border border-border/60">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
              filterTab === "all"
                ? "bg-card text-foreground shadow-sm border border-border/80"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Tất Cả (44 Âm)
          </button>

          <button
            type="button"
            onClick={() => setFilterTab("vowels")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
              filterTab === "vowels"
                ? "bg-card text-foreground shadow-sm border border-border/80"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Nguyên Âm (20 Vowels)
          </button>

          <button
            type="button"
            onClick={() => setFilterTab("consonants")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
              filterTab === "consonants"
                ? "bg-card text-foreground shadow-sm border border-border/80"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Phụ Âm (24 Consonants)
          </button>
        </div>

        {/* Search input */}
        <div className="relative min-w-[220px]">
          <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm âm (vd: iː, θ, ship)..."
            className="w-full rounded-2xl border border-border bg-secondary/30 pl-9 pr-3.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
          />
        </div>
      </div>

      {/* Group 1: Monophthongs (Nguyên âm đơn) */}
      {monophthongs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
              Nguyên Âm Đơn (Monophthongs - {monophthongs.length} âm)
            </h3>
            <span className="text-[11px] text-muted-foreground">
              Phân loại: Ngắn (Short) & Dài (Long có dấu hai chấm ':')
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {monophthongs.map((p) => (
              <PhonemeCell
                key={p.id}
                phoneme={p}
                isPlaying={currentlyPlayingId === p.id && isPlaying}
                onPlaySound={handlePlayPhoneme}
                onSelect={handleSelectPhoneme}
              />
            ))}
          </div>
        </div>
      )}

      {/* Group 2: Diphthongs (Nguyên âm đôi) */}
      {diphthongs.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
              Nguyên Âm Đôi (Diphthongs - {diphthongs.length} âm)
            </h3>
            <span className="text-[11px] text-muted-foreground">
              Âm lướt chuyển động liền mạch giữa 2 nguyên âm đơn
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-3">
            {diphthongs.map((p) => (
              <PhonemeCell
                key={p.id}
                phoneme={p}
                isPlaying={currentlyPlayingId === p.id && isPlaying}
                onPlaySound={handlePlayPhoneme}
                onSelect={handleSelectPhoneme}
              />
            ))}
          </div>
        </div>
      )}

      {/* Group 3: Voiceless Consonants (Phụ âm vô thanh) */}
      {voicelessConsonants.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              Phụ Âm Vô Thanh (Voiceless Consonants - {voicelessConsonants.length} âm)
            </h3>
            <span className="text-[11px] text-muted-foreground">
              Không rung dây thanh quản, đẩy luồng hơi bật gió sắc nét
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {voicelessConsonants.map((p) => (
              <PhonemeCell
                key={p.id}
                phoneme={p}
                isPlaying={currentlyPlayingId === p.id && isPlaying}
                onPlaySound={handlePlayPhoneme}
                onSelect={handleSelectPhoneme}
              />
            ))}
          </div>
        </div>
      )}

      {/* Group 4: Voiced Consonants (Phụ âm hữu thanh) */}
      {voicedConsonants.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Phụ Âm Hữu Thanh (Voiced Consonants - {voicedConsonants.length} âm)
            </h3>
            <span className="text-[11px] text-muted-foreground">
              Rung mạnh dây thanh quản khi phát âm
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {voicedConsonants.map((p) => (
              <PhonemeCell
                key={p.id}
                phoneme={p}
                isPlaying={currentlyPlayingId === p.id && isPlaying}
                onPlaySound={handlePlayPhoneme}
                onSelect={handleSelectPhoneme}
              />
            ))}
          </div>
        </div>
      )}

      {/* Detailed Modal */}
      <MouthPositionModal
        phoneme={selectedPhoneme}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
