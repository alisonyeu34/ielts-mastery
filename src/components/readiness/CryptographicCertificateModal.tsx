'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Download,
  Share2,
  X,
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';
import { ReadinessCertificateRecord } from '@/types/database';

interface CryptographicCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: ReadinessCertificateRecord | null;
}

export const CryptographicCertificateModal: React.FC<CryptographicCertificateModalProps> = ({
  isOpen,
  onClose,
  certificate
}) => {
  if (!isOpen || !certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Glow behind */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-emerald-500/15 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold uppercase tracking-wider">
                  Cryptographic Seal Verified
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Chứng Chỉ Sẵn Sàng Khảo Thí Band 7.5+
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Card Design */}
        <div className="relative bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-amber-500/30 rounded-2xl p-6 text-center space-y-4 shadow-inner">
          <div className="flex items-center justify-center gap-2 text-xs font-serif uppercase tracking-widest text-amber-400/90 font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            IELTS FOR ME • CAMBRIDGE 165-DAY MASTERY ACCREDITATION
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-400 font-sans">Chứng nhận thí sinh</p>
            <h3 className="text-2xl font-black text-white font-serif tracking-wide">
              {certificate.studentName}
            </h3>
          </div>

          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
            Đã hoàn thành xuất sắc lộ trình 165 ngày (Band 4.5 ➔ 7.5), hội tụ đủ 5 vector năng lực học thuật với chỉ số sẵn sàng khảo thí{' '}
            <strong className="text-emerald-400 font-mono">CRI = {certificate.criScore}%</strong>. Dự báo năng lực thực tế đạt chuẩn{' '}
            <strong className="text-amber-400 font-mono">Band {certificate.predictedOverallBand.toFixed(1)}</strong>.
          </p>

          {/* 5-Vector Summary Row */}
          <div className="grid grid-cols-5 gap-1.5 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
            <div className="p-1.5 bg-slate-900 rounded-lg">
              <span className="text-[9px] text-slate-500 block">V_th</span>
              <strong className="text-indigo-400">{certificate.vectorBreakdown.theoryMastery}%</strong>
            </div>
            <div className="p-1.5 bg-slate-900 rounded-lg">
              <span className="text-[9px] text-slate-500 block">V_voc</span>
              <strong className="text-purple-400">{certificate.vectorBreakdown.fsrsStability}%</strong>
            </div>
            <div className="p-1.5 bg-slate-900 rounded-lg">
              <span className="text-[9px] text-slate-500 block">V_err</span>
              <strong className="text-rose-400">{certificate.vectorBreakdown.errorExtinction}%</strong>
            </div>
            <div className="p-1.5 bg-slate-900 rounded-lg">
              <span className="text-[9px] text-slate-500 block">V_mock</span>
              <strong className="text-amber-400">{certificate.vectorBreakdown.mockConvergence}%</strong>
            </div>
            <div className="p-1.5 bg-slate-900 rounded-lg">
              <span className="text-[9px] text-slate-500 block">V_stm</span>
              <strong className="text-emerald-400">{certificate.vectorBreakdown.staminaScore}%</strong>
            </div>
          </div>

          {/* SHA-256 Hash Verification */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>SHA-256 Hash:</span>
            </div>
            <span className="text-emerald-400/90 truncate max-w-xs">{certificate.verificationHash}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors"
          >
            Đóng
          </button>

          <Link
            href="/exam-day-protocol"
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
          >
            <span>Kích Hoạt Nghi Thức Ngày Thi Thứ 165 (Step 100)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
