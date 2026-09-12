/**
 * Memory Palace Pacer & Sensory Grid Architecture Engine
 * IELTS Speaking Part 2 Cognitive Mnemonics (Band 7.5 - 8.5+)
 */

export type PalaceRoomId = 1 | 2 | 3 | 4;

export type SensoryDimension = 'sight' | 'sound' | 'touch' | 'scent' | 'emotion';

export interface PalaceRoomDefinition {
  id: PalaceRoomId;
  name: string;
  vietnameseTitle: string;
  subtitle: string;
  timeRange: string;
  startSec: number;
  endSec: number;
  targetDuration: number;
  color: string;
  badgeColor: string;
  bgGlow: string;
  icon: string;
  starterPhrase: string;
  transitionPhrase: string;
  pedagogyNote: string;
}

export interface SensoryAdjective {
  dimension: SensoryDimension;
  word: string;
  ipa: string;
  meaningVi: string;
  example: string;
  band: 'C1' | 'C2';
}

export interface PacingBalanceAssessment {
  totalDuration: number;
  isUnderLength: boolean;
  isOverLength: boolean;
  isOptimal: boolean;
  roomDurations: Record<PalaceRoomId, number>;
  balanceScore: number; // 0 - 100
  fluencyBandEstimate: number; // 5.5 -> 8.5+
  warnings: string[];
  strengths: string[];
  omittedRooms: number[];
  recommendations: string[];
}

export const PALACE_ROOMS: PalaceRoomDefinition[] = [
  {
    id: 1,
    name: 'The Antechamber',
    vietnameseTitle: 'Phòng 1: Tiền Sảnh Xuất Phát',
    subtitle: 'Genesis, Background Context & Past Anchor',
    timeRange: '0:00 - 0:30',
    startSec: 0,
    endSec: 30,
    targetDuration: 30,
    color: 'emerald',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    bgGlow: 'from-emerald-950/40 to-emerald-900/10 border-emerald-500/40',
    icon: '🏛️',
    starterPhrase: 'To trace the genesis of this encounter, I must cast my mind back to...',
    transitionPhrase: 'This initially began as a seemingly mundane occasion, yet it soon unfolded into...',
    pedagogyNote: 'Khởi tạo bối cảnh không gian/thời gian trong quá khứ. Tuyệt đối không nói lan man quá 35s để tránh cạn kiệt ý tưởng ở các phòng sau.'
  },
  {
    id: 2,
    name: 'The Sensory Gallery',
    vietnameseTitle: 'Phòng 2: Không Gian Trải Nghiệm 5 Giác Quan',
    subtitle: '5D Sensory Immersion (Sight, Sound, Touch, Emotion)',
    timeRange: '0:30 - 1:00',
    startSec: 30,
    endSec: 60,
    targetDuration: 30,
    color: 'cyan',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    bgGlow: 'from-cyan-950/40 to-cyan-900/10 border-cyan-500/40',
    icon: '🎨',
    starterPhrase: 'Stepping into the immediate atmosphere, what struck me most vividly was...',
    transitionPhrase: 'The sensory tapestry was accentuated by...',
    pedagogyNote: 'Nạp tính từ giác quan sống động (ánh sáng, âm thanh, xúc cảm). Tránh lối liệt kê khô khan bằng cách lồng ghép ấn tượng nội tâm.'
  },
  {
    id: 3,
    name: 'The Crucible',
    vietnameseTitle: 'Phòng 3: Khúc Triết & Bước Ngoặt Kịch Tính',
    subtitle: 'Turning Point, Unexpected Friction & Resolution',
    timeRange: '1:00 - 1:30',
    startSec: 60,
    endSec: 90,
    targetDuration: 30,
    color: 'amber',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    bgGlow: 'from-amber-950/40 to-amber-900/10 border-amber-500/40',
    icon: '⚡',
    starterPhrase: 'However, the narrative took an unforeseen pivot when...',
    transitionPhrase: 'We were abruptly confronted with an impasse, demanding instantaneous composure...',
    pedagogyNote: 'Tạo nút thắt cốt truyện (khó khăn, thử thách hoặc xung đột bất ngờ) giúp bài nói thoát khỏi nhịp đều đều, đạt điểm Lexical & Grammatical Range vượt trội.'
  },
  {
    id: 4,
    name: 'The Balcony',
    vietnameseTitle: 'Phòng 4: Ban Công Chiêm Nghiệm & Tương Lai',
    subtitle: 'Philosophical Reflection, Weltanschauung & Future Anchor',
    timeRange: '1:30 - 2:00',
    startSec: 90,
    endSec: 120,
    targetDuration: 30,
    color: 'violet',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    bgGlow: 'from-violet-950/40 to-violet-900/10 border-violet-500/40',
    icon: '🔭',
    starterPhrase: 'Perched upon the balcony of hindsight, I now recognize that...',
    transitionPhrase: 'Looking ahead, this formative episode will undoubtedly continue to recalibrate my outlook on...',
    pedagogyNote: 'Đúc kết bài học triết lý nhân sinh, tác động biến chuyển thế giới quan và liên hệ tầm nhìn tương lai để chạm mốc 2 phút hoàn hảo mà không bị ngắt ngang.'
  }
];

export const SENSORY_PALETTE_ITEMS: Record<SensoryDimension, SensoryAdjective[]> = {
  sight: [
    { dimension: 'sight', word: 'incandescent', ipa: '/ˌɪn.kænˈdes.ənt/', meaningVi: 'sáng rực rỡ, phát quang', example: 'The incandescent skyline of Singapore at dusk', band: 'C2' },
    { dimension: 'sight', word: 'luminescent', ipa: '/ˌluː.mɪˈnes.ənt/', meaningVi: 'phát sáng dịu nhẹ kỳ ảo', example: 'A luminescent haze lingering over the misty valley', band: 'C1' },
    { dimension: 'sight', word: 'picturesque', ipa: '/ˌpɪk.tʃərˈesk/', meaningVi: 'đẹp như tranh vẽ', example: 'A picturesque cobblestone hamlet tucked between hills', band: 'C1' },
    { dimension: 'sight', word: 'kaleidoscopic', ipa: '/kəˌlaɪ.dəˈskɑː.pɪk/', meaningVi: 'muôn màu muôn vẻ, biến ảo', example: 'A kaleidoscopic spectrum of market stalls', band: 'C2' },
    { dimension: 'sight', word: 'labyrinthine', ipa: '/ˌlæb.əˈrɪn.θaɪn/', meaningVi: 'chằng chịt như mê cung', example: 'Labyrinthine alleys teeming with artisan vendors', band: 'C2' }
  ],
  sound: [
    { dimension: 'sound', word: 'cacophonous', ipa: '/kəˈkɑː.fə.nəs/', meaningVi: 'chát chúa, hỗn tạp huyên náo', example: 'The cacophonous clamor of rush-hour traffic', band: 'C2' },
    { dimension: 'sound', word: 'melodious', ipa: '/məˈloʊ.di.əs/', meaningVi: 'du dương, êm tai', example: 'Melodious birdsong filtering through the pine canopy', band: 'C1' },
    { dimension: 'sound', word: 'hushed', ipa: '/hʌʃt/', meaningVi: 'thì thầm, tĩnh mịch trang nghiêm', example: 'A hushed reverent silence fell across the auditorium', band: 'C1' },
    { dimension: 'sound', word: 'thunderous', ipa: '/ˈθʌn.dər.əs/', meaningVi: 'vang dội như sấm truyền', example: 'A thunderous ovation reverberated through the hall', band: 'C1' },
    { dimension: 'sound', word: 'sonorous', ipa: '/ˈsɑː.nər.əs/', meaningVi: 'trầm ấm, vang vọng sâu sắc', example: 'His sonorous voice resonated with authoritative calm', band: 'C2' }
  ],
  touch: [
    { dimension: 'touch', word: 'velvety', ipa: '/ˈvel.və.t̬i/', meaningVi: 'mịn màng như nhung', example: 'The velvety texture of handcrafted Japanese paper', band: 'C1' },
    { dimension: 'touch', word: 'biting', ipa: '/ˈbaɪ.t̬ɪŋ/', meaningVi: 'buốt giá cắt da cắt thịt', example: 'A biting sub-zero gale whipping across the ridge', band: 'C1' },
    { dimension: 'touch', word: 'sweltering', ipa: '/ˈswel.tɚ.ɪŋ/', meaningVi: 'nóng oi ả ngột ngạt', example: 'The sweltering tropical humidity enveloping the harbor', band: 'C1' },
    { dimension: 'touch', word: 'tactile', ipa: '/ˈtæk.taɪl/', meaningVi: 'thuộc xúc giác, đậm chất xúc chạm', example: 'The rustic tactile sensation of weathered timber', band: 'C2' },
    { dimension: 'touch', word: 'crystalline', ipa: '/ˈkrɪs.tə.lɪn/', meaningVi: 'trong trẻo, sắc lạnh như pha lê', example: 'Crystalline crisp mountain air invigorating my lungs', band: 'C2' }
  ],
  scent: [
    { dimension: 'scent', word: 'petrichor', ipa: '/ˈpet.rɪ.kɔːr/', meaningVi: 'mùi đất ẩm tươi mới sau cơn mưa rào', example: 'The intoxicating scent of petrichor rising from dry asphalt', band: 'C2' },
    { dimension: 'scent', word: 'aromatic', ipa: '/ˌær.əˈmæt̬.ɪk/', meaningVi: 'nồng nàn thơm phức', example: 'Aromatic roasted coffee beans wafting from the roastery', band: 'C1' },
    { dimension: 'scent', word: 'pungent', ipa: '/ˈpʌn.dʒənt/', meaningVi: 'cay nồng, xốc mạnh vào khứu giác', example: 'The pungent aroma of aged wood and antique leather', band: 'C1' },
    { dimension: 'scent', word: 'fragrant', ipa: '/ˈfreɪ.ɡrənt/', meaningVi: 'thơm ngát thanh tao', example: 'Fragrant jasmine petals scattered along the colonnade', band: 'C1' },
    { dimension: 'scent', word: 'savory', ipa: '/ˈseɪ.vɚ.i/', meaningVi: 'đậm đà dậy mùi hấp dẫn', example: 'Savory broths simmering in brass cauldrons', band: 'C1' }
  ],
  emotion: [
    { dimension: 'emotion', word: 'euphoric', ipa: '/juːˈfɔːr.ɪk/', meaningVi: 'hân hoan phấn chấn tột cùng', example: 'A euphoric sense of triumph washed over our entire team', band: 'C2' },
    { dimension: 'emotion', word: 'bittersweet', ipa: '/ˌbɪt̬.ɚˈswiːt/', meaningVi: 'vui buồn lẫn lộn, bùi ngùi', example: 'A bittersweet nostalgia as we bid farewell to the campus', band: 'C1' },
    { dimension: 'emotion', word: 'visceral', ipa: '/ˈvɪs.ər.əl/', meaningVi: 'bản năng, sâu thẳm trong tâm can', example: 'A visceral surge of adrenaline when navigating the rapid', band: 'C2' },
    { dimension: 'emotion', word: 'apprehensive', ipa: '/ˌæp.rəˈhen.sɪv/', meaningVi: 'thấp thỏm bồn chồn âu lo', example: 'Felt genuinely apprehensive prior to taking the podium', band: 'C1' },
    { dimension: 'emotion', word: 'exhilarating', ipa: '/ɪɡˈzɪl.ə.reɪ.t̬ɪŋ/', meaningVi: 'phấn khích tràn đầy năng lượng', example: 'An exhilarating journey that expanded my cognitive horizons', band: 'C1' }
  ]
};

export const TRANSITION_FORMULAS = [
  {
    fromRoom: 'Room 1 (Genesis)',
    toRoom: 'Room 2 (Sensory)',
    formula: 'Having laid the chronological groundwork, what engraved this vividly into my memory was the sheer sensory ambience...',
    function: 'Chuyển mượt mà từ bối cảnh sang chi tiết giác quan 5D'
  },
  {
    fromRoom: 'Room 2 (Sensory)',
    toRoom: 'Room 3 (Crucible)',
    formula: 'Just as everything seemed to proceed without a hitch, an unscripted turn of events dramatically altered the trajectory...',
    function: 'Kích hoạt nút thắt kịch tính và thử thách bất ngờ'
  },
  {
    fromRoom: 'Room 3 (Crucible)',
    toRoom: 'Room 4 (Balcony)',
    formula: 'Synthesizing this entire saga from a more reflective vantage point, the enduring significance lies not in the ordeal itself, but...',
    function: 'Thăng hoa triết lý và liên hệ thế giới quan tương lai'
  }
];

/**
 * Evaluates the pacing balance of a 2-minute Speaking Part 2 monologue
 */
export function evaluatePacingBalance(
  totalDuration: number,
  roomTransitions: number[], // timestamp markers when candidate entered room 2, 3, 4
  roomNotes: Record<PalaceRoomId, string[]>
): PacingBalanceAssessment {
  const isUnderLength = totalDuration < 100; // Under 1m40s is penalized in IELTS
  const isOverLength = totalDuration > 125;
  const isOptimal = totalDuration >= 105 && totalDuration <= 122;

  // Approximate duration spent in each room based on recorded transition stamps or default distribution
  const roomDurations: Record<PalaceRoomId, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };

  if (roomTransitions && roomTransitions.length >= 3) {
    const t1 = Math.min(roomTransitions[0] || 30, totalDuration);
    const t2 = Math.min(roomTransitions[1] || 60, totalDuration);
    const t3 = Math.min(roomTransitions[2] || 90, totalDuration);

    roomDurations[1] = Math.round(t1);
    roomDurations[2] = Math.max(0, Math.round(t2 - t1));
    roomDurations[3] = Math.max(0, Math.round(t3 - t2));
    roomDurations[4] = Math.max(0, Math.round(totalDuration - t3));
  } else {
    // Pro-rata estimation if transitions were auto-tracked
    const quarter = totalDuration / 4;
    roomDurations[1] = Math.round(quarter);
    roomDurations[2] = Math.round(quarter);
    roomDurations[3] = Math.round(quarter);
    roomDurations[4] = Math.round(quarter);
  }

  const warnings: string[] = [];
  const strengths: string[] = [];
  const omittedRooms: number[] = [];
  const recommendations: string[] = [];

  let balanceScore = 100;

  // Check notes population
  for (let r = 1; r <= 4; r++) {
    const notes = roomNotes[r as PalaceRoomId] || [];
    if (notes.length === 0) {
      omittedRooms.push(r);
      balanceScore -= 15;
    }
  }

  // Duration checks
  if (isUnderLength) {
    balanceScore -= 30;
    warnings.push(`Thời lượng bài nói chỉ đạt ${totalDuration}s (< 100s). Khảo thí IELTS Part 2 đòi hỏi duy trì độc thoại 110s - 120s để không bị trừ điểm Fluency & Coherence.`);
    recommendations.push('Hãy tận dụng Room 2 (5 Giác quan) và Room 4 (Chiêm nghiệm tương lai) để nạp thêm chi tiết mô tả và mở rộng góc nhìn triết lý.');
  } else if (isOptimal) {
    strengths.push(`Thời lượng vàng ${totalDuration}s (1m45s - 2m02s) giúp tối ưu hóa điểm số độ trôi chảy và hoàn tất trọn vẹn 4 phòng không gian.`);
  }

  // Room 1 bottleneck check (over 45s on Room 1 is a classic Band 5.5 trap)
  if (roomDurations[1] > 45) {
    balanceScore -= 20;
    warnings.push(`Bạn đã dành tới ${roomDurations[1]}s ở Phòng 1 (Tiền sảnh quá khứ). Đây là bẫy sa đà bối cảnh khiến bạn cạn kiệt thời gian cho bước ngoặt và chiêm nghiệm.`);
    recommendations.push('Giới hạn phần giới thiệu bối cảnh trong đúng 25 - 30s bằng công thức: "To trace the genesis of this...".');
  } else if (roomDurations[1] >= 20 && roomDurations[1] <= 35) {
    strengths.push(`Phân bổ thời lượng Phòng 1 hoàn hảo (${roomDurations[1]}s), tạo nền tảng vững chắc cho câu chuyện.`);
  }

  // Check Room 4 reflection presence
  if (roomDurations[4] < 15 && !isUnderLength) {
    balanceScore -= 15;
    warnings.push('Phòng 4 (Ban công chiêm nghiệm) bị kết thúc quá vội vàng (< 15s), làm mất đi cơ hội thể hiện tư duy trừu tượng Band 8.0+.');
    recommendations.push('Sử dụng cấu trúc "Perched upon the balcony of hindsight..." để mở rộng bài học nhân sinh ít nhất 25s.');
  }

  if (omittedRooms.length > 0) {
    warnings.push(`Chưa nạp từ khóa cho ${omittedRooms.length} phòng trong 60s chuẩn bị (Phòng ${omittedRooms.join(', ')}).`);
  }

  balanceScore = Math.max(20, Math.min(100, balanceScore));

  // Fluency band estimation
  let fluencyBandEstimate = 6.0;
  if (balanceScore >= 90) fluencyBandEstimate = 8.5;
  else if (balanceScore >= 80) fluencyBandEstimate = 8.0;
  else if (balanceScore >= 70) fluencyBandEstimate = 7.5;
  else if (balanceScore >= 60) fluencyBandEstimate = 7.0;
  else if (balanceScore >= 50) fluencyBandEstimate = 6.5;

  return {
    totalDuration,
    isUnderLength,
    isOverLength,
    isOptimal,
    roomDurations,
    balanceScore,
    fluencyBandEstimate,
    warnings,
    strengths,
    omittedRooms,
    recommendations
  };
}

export function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function getRoomByTime(seconds: number): PalaceRoomId {
  if (seconds < 30) return 1;
  if (seconds < 60) return 2;
  if (seconds < 90) return 3;
  return 4;
}
