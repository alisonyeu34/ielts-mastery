/**
 * Bio-Acoustic Speech Interruption & Fluency Recovery Engine
 * IELTS Speaking Part 3 High-Stakes Tactical Interruption & Paradox Navigation (Band 7.5 - 8.5+)
 */

export interface SpeechMetrics {
  durationSeconds: number;
  speakingTimeSeconds: number;
  pauseTimeSeconds: number;
  averageVolume: number; // 0 - 100
  speechPaceWpm: number;
  fluencyRecoveryLatencyMs: number | null; // Latency after interruption
  interruptionDisruptionScore: number; // 0 - 100 (100 = perfectly seamless)
  isCurrentlySpeaking: boolean;
  frequencyData: Uint8Array;
}

export interface InterruptionEvent {
  id: string;
  triggerSecond: number;
  interruptionAudioText: string;
  examinerStance: string;
  paradoxTrap: string;
  delivered: boolean;
  deliveryTimestamp: number | null;
  recoveryTimestamp: number | null;
  latencyMs: number | null;
}

export type InterruptionStage =
  | 'idle'
  | 'listening_to_candidate'
  | 'examiner_interrupting'
  | 'awaiting_recovery'
  | 'recovered'
  | 'completed';

export interface InterruptionEvaluation {
  latencyBand: 'band_8_5_plus' | 'band_7_5' | 'band_6_5' | 'band_5_5_below';
  latencyMs: number;
  ratingLabel: string;
  feedbackVi: string;
  fluencyImpact: string;
  colorClass: string;
}

/**
 * Evaluates Fluency Recovery Latency (FRL) in milliseconds
 */
export function evaluateFluencyRecovery(latencyMs: number): InterruptionEvaluation {
  if (latencyMs < 1200) {
    return {
      latencyBand: 'band_8_5_plus',
      latencyMs,
      ratingLabel: 'Seamless Pivot (Band 8.5+)',
      feedbackVi: 'Phản xạ phi thường! Bạn tiếp nhận lời ngắt của giám khảo và xoay chuyển luận điểm (pivot) dưới 1.2 giây mà không hề sụp đổ ngữ điệu hay đơ cứng.',
      fluencyImpact: 'Không bị trừ điểm Fluency & Coherence; thể hiện năng lực đàm thoại tự nhiên của người bản xứ.',
      colorClass: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10'
    };
  }
  if (latencyMs <= 2500) {
    return {
      latencyBand: 'band_7_5',
      latencyMs,
      ratingLabel: 'Competent Recovery (Band 7.0 - 7.5)',
      feedbackVi: 'Phục hồi tốt (1.2s - 2.5s). Có độ trễ ngập ngừng nhẹ hoặc filler word trước khi xử lý câu truy vấn nghịch lý.',
      fluencyImpact: 'Giữ vững band 7.0 - 7.5, nhưng cần giảm filler "uhm/ah" trong 1 giây đầu sau ngắt lời.',
      colorClass: 'text-amber-400 border-amber-500/40 bg-amber-500/10'
    };
  }
  if (latencyMs <= 4000) {
    return {
      latencyBand: 'band_6_5',
      latencyMs,
      ratingLabel: 'Noticeable Hesitation (Band 6.0 - 6.5)',
      feedbackVi: 'Độ trễ cao (2.5s - 4.0s). Bị sốc tâm lý khi giám khảo ngắt lời, mất mạch lập luận và tốn thời gian tái cấu trúc ý tưởng.',
      fluencyImpact: 'Nguy cơ tụt Fluency xuống Band 6.0 do ngắt mạch tư duy đột ngột.',
      colorClass: 'text-orange-400 border-orange-500/40 bg-orange-500/10'
    };
  }
  return {
    latencyBand: 'band_5_5_below',
    latencyMs,
    ratingLabel: 'Cognitive Freeze (Band 5.5-)',
    feedbackVi: 'Đóng băng tư duy (> 4.0s). Khoảng lặng kéo dài (prolonged silence) gây cảm giác bối rối và mất kiểm soát chủ đề.',
    fluencyImpact: 'Bị trừ nặng điểm Fluency & Coherence.',
    colorClass: 'text-rose-400 border-rose-500/40 bg-rose-500/10'
  };
}

/**
 * 3-Second Seamless Pivot Phrases
 */
export const PIVOT_PHRASE_TEMPLATES = [
  {
    type: 'counter_concession',
    label: 'Conceding & Nuancing',
    vietnamese: 'Nhượng Bộ Chiến Thuật & Tinh Chỉnh',
    template: 'That is indeed a legitimate caveat; however, when examining the long-term empirical evidence...',
    exampleUse: 'Khi giám khảo đưa ra ngoại lệ thực tế phản bác lại ý kiến tuyệt đối của bạn.'
  },
  {
    type: 'paradox_resolution',
    label: 'Resolving Paradox',
    vietnamese: 'Tháo Gỡ Nghịch Lý Đối Lập',
    template: 'While that apparent contradiction certainly exists on the surface, the underlying distinction lies in...',
    exampleUse: 'Khi giám khảo chỉ ra mâu thuẫn trực tiếp giữa 2 phát biểu trước đó của bạn.'
  },
  {
    type: 'qualifier_reframe',
    label: 'Reframing Boundary',
    vietnamese: 'Tái Định Hình Phạm Vi Phán Xét',
    template: 'Precisely for that reason, my argument hinges strictly on developing economies rather than mature markets...',
    exampleUse: 'Khi giám khảo bẫy bạn vào phạm vi quá rộng khiến luận điểm bị sai lệch.'
  }
];

/**
 * Web Speech Synthesis trigger for examiner tactical interruption
 */
export function playExaminerVoice(
  text: string,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onStart) onStart();
    setTimeout(() => {
      if (onEnd) onEnd();
    }, 2800);
    return false;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB'; // British English for authentic examiner demeanor
    utterance.rate = 1.05;
    utterance.pitch = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const britishVoice = voices.find(
      (v) => v.lang.includes('en-GB') || v.name.includes('British') || v.name.includes('UK') || v.name.includes('English')
    );
    if (britishVoice) {
      utterance.voice = britishVoice;
    }

    if (onStart) utterance.onstart = () => onStart();
    if (onEnd) utterance.onend = () => onEnd();
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (e) {
    console.error('Speech synthesis error:', e);
    if (onStart) onStart();
    setTimeout(() => {
      if (onEnd) onEnd();
    }, 2500);
    return false;
  }
}
