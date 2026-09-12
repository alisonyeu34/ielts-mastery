'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db';
import {
  exportEncryptedVault,
  importEncryptedVault,
  EncryptedVaultPayload
} from '@/lib/cryptoVaultEngine';
import {
  Lock,
  Download,
  Upload,
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck
} from 'lucide-react';

export const EncryptedVaultManager: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleExportVault = async () => {
    if (!password || password.length < 6) {
      setStatusMessage({
        type: 'error',
        text: 'Vui lòng nhập mật khẩu bảo vệ két sắt tối thiểu 6 ký tự.'
      });
      return;
    }

    try {
      setIsProcessing(true);
      setStatusMessage({ type: 'info', text: 'Đang trích xuất và mã hóa toàn bộ dữ liệu 165 ngày bằng AES-GCM 256-bit...' });

      const [userProgress, theoryLessons, vocabMatrix, errorBank, practiceLogs, aiSubmissions] =
        await Promise.all([
          db.user_progress.toArray(),
          db.theory_lessons.toArray(),
          db.vocab_matrix.toArray(),
          db.error_bank.toArray(),
          db.practice_logs.toArray(),
          db.ai_submissions.toArray()
        ]);

      const payload: EncryptedVaultPayload = {
        metadata: {
          version: '1.0.0',
          exportedAt: new Date().toISOString(),
          studentName: 'IELTS Mastery Candidate',
          dayCount: 165,
          tablesIncluded: ['user_progress', 'theory_lessons', 'vocab_matrix', 'error_bank', 'practice_logs', 'ai_submissions']
        },
        tables: {
          user_progress: userProgress,
          theory_lessons: theoryLessons,
          vocab_matrix: vocabMatrix,
          error_bank: errorBank,
          practice_logs: practiceLogs,
          ai_submissions: aiSubmissions
        }
      };

      const result = await exportEncryptedVault(payload, password);

      // Trigger browser download
      const url = URL.createObjectURL(result.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatusMessage({
        type: 'success',
        text: `Đã xuất két sắt mã hóa thành công (${Math.round(result.sizeBytes / 1024)} KB). Tệp .ieltsvault sẵn sàng lưu trữ ngoại tuyến!`
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: `Lỗi xuất két sắt: ${err.message || err}` });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!password) {
      setStatusMessage({
        type: 'error',
        text: 'Vui lòng nhập mật khẩu giải mã trước khi tải tệp lên.'
      });
      return;
    }

    try {
      setIsProcessing(true);
      setStatusMessage({ type: 'info', text: 'Đang giải mã két sắt và phục hồi dữ liệu vào IndexedDB...' });

      const buffer = await file.arrayBuffer();
      const payload = await importEncryptedVault(buffer, password);

      // Hydrate Dexie DB
      if (payload.tables.user_progress) await db.user_progress.bulkPut(payload.tables.user_progress as any);
      if (payload.tables.theory_lessons) await db.theory_lessons.bulkPut(payload.tables.theory_lessons as any);
      if (payload.tables.vocab_matrix) await db.vocab_matrix.bulkPut(payload.tables.vocab_matrix as any);
      if (payload.tables.error_bank) await db.error_bank.bulkPut(payload.tables.error_bank as any);
      if (payload.tables.practice_logs) await db.practice_logs.bulkPut(payload.tables.practice_logs as any);
      if (payload.tables.ai_submissions) await db.ai_submissions.bulkPut(payload.tables.ai_submissions as any);

      setStatusMessage({
        type: 'success',
        text: `Phục hồi thành công toàn bộ dữ liệu 165 ngày từ bản sao lưu ${new Date(payload.metadata.exportedAt).toLocaleDateString('vi-VN')}!`
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Mật khẩu giải mã không đúng hoặc tệp bị lỗi.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Két Sắt Dữ Liệu Mã Hóa Quân Sự (.ieltsvault)</h3>
            <p className="text-xs text-slate-400">Chuẩn mã hóa AES-GCM 256-Bit & PBKDF2 (100.000 iterations) bảo mật tuyệt đối</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
          Zero Server Leak
        </span>
      </div>

      {/* Password Input */}
      <div className="space-y-2 max-w-md">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Key className="w-3.5 h-3.5 text-amber-400" />
          Mật khẩu két sắt (Dùng để mã hóa & giải mã):
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu an toàn (>= 6 ký tự)..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-indigo-500 focus:outline-none font-mono"
        />
      </div>

      {/* Status Feedback */}
      {statusMessage && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : statusMessage.type === 'error'
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Export Button */}
        <button
          type="button"
          disabled={isProcessing}
          onClick={handleExportVault}
          className="p-4 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>Sao Lưu Két Sắt (.ieltsvault)</span>
        </button>

        {/* Import File Button */}
        <label className="p-4 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-slate-600 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer">
          <Upload className="w-4 h-4 text-emerald-400" />
          <span>Phục Hồi Dữ Liệu Từ File</span>
          <input
            type="file"
            accept=".ieltsvault"
            onChange={handleImportFile}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};
