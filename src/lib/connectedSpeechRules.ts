export interface ConnectedRuleDef {
  id: string;
  nameVi: string;
  symbol: string;
  description: string;
  example: string;
  phoneticNotation: string;
  colorClass: string;
}

export const CONNECTED_SPEECH_RULES: Record<string, ConnectedRuleDef> = {
  c_to_v: {
    id: "c_to_v",
    nameVi: "Nối Phụ âm sang Nguyên âm (Consonant to Vowel)",
    symbol: "‿",
    description: "Khi một từ kết thúc bằng phụ âm và từ kế tiếp bắt đầu bằng nguyên âm, phụ âm cuối nối liền sang nguyên âm tiếp theo.",
    example: "hold on -> /həʊld‿ɒn/",
    phoneticNotation: "C ‿ V",
    colorClass: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  intrusive_w: {
    id: "intrusive_w",
    nameVi: "Chèn âm /w/ (Intrusive /w/)",
    symbol: "^w",
    description: "Khi từ trước kết thúc bằng nguyên âm chu môi (/uː/, /əʊ/, /aʊ/) và từ sau bắt đầu bằng nguyên âm, tự động chèn âm lướt /w/.",
    example: "go out -> /ɡəʊ‿w‿aʊt/",
    phoneticNotation: "Rounded-V ^w V",
    colorClass: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  intrusive_j: {
    id: "intrusive_j",
    nameVi: "Chèn âm /j/ (Intrusive /j/)",
    symbol: "^j",
    description: "Khi từ trước kết thúc bằng nguyên âm mép bè (/iː/, /eɪ/, /aɪ/, /ɔɪ/) và từ sau bắt đầu bằng nguyên âm, tự động chèn âm lướt /j/.",
    example: "see it -> /siː‿j‿ɪt/",
    phoneticNotation: "Spread-V ^j V",
    colorClass: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  intrusive_r: {
    id: "intrusive_r",
    nameVi: "Chèn âm /r/ (Linking & Intrusive /r/)",
    symbol: "^r",
    description: "Trong giọng Anh-Anh (RP), khi từ kết thúc bằng /ə/, /ɔː/, /ɑː/ và từ sau bắt đầu bằng nguyên âm, âm /r/ được chèn vào để nối mạch.",
    example: "media attention -> /ˈmiːdiə‿r‿əˈtenʃn/",
    phoneticNotation: "V(ə/ɔː/ɑː) ^r V",
    colorClass: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  elision: {
    id: "elision",
    nameVi: "Nuốt âm /t/ và /d/ (Elision)",
    symbol: "×t/d",
    description: "Khi âm /t/ hoặc /d/ đứng ở cuối từ và kẹp giữa hai phụ âm, âm này bị triệt tiêu hoàn toàn.",
    example: "last night -> /lɑːs naɪt/, next door -> /neks dɔː/",
    phoneticNotation: "C + [t/d] + C -> C + C",
    colorClass: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
  assimilation: {
    id: "assimilation",
    nameVi: "Đồng hóa âm (Assimilation)",
    symbol: "➔",
    description: "Hai âm đứng cạnh nhau biến đổi thành một âm mới (ví dụ: /t/ + /j/ -> /tʃ/, /d/ + /j/ -> /dʒ/).",
    example: "don't you -> /ˈdəʊntʃu/, would you -> /ˈwʊdʒu/",
    phoneticNotation: "/t, d/ + /j/ -> /tʃ, dʒ/",
    colorClass: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
};
