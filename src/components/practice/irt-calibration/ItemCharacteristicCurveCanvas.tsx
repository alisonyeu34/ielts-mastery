'use client';

import React, { useRef, useEffect } from 'react';
import { IRTItemParameters, calculate3PLProbability } from '@/lib/irtEngine';
import { Activity, Sparkles } from 'lucide-react';

interface ItemCharacteristicCurveCanvasProps {
  item: IRTItemParameters;
  studentTheta: number;
}

export const ItemCharacteristicCurveCanvas: React.FC<ItemCharacteristicCurveCanvasProps> = ({
  item,
  studentTheta
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth || 560;
    const displayHeight = canvas.clientHeight || 280;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    ctx.scale(dpr, dpr);

    const padLeft = 45;
    const padRight = 25;
    const padTop = 25;
    const padBottom = 35;

    const plotWidth = displayWidth - padLeft - padRight;
    const plotHeight = displayHeight - padTop - padBottom;

    // Clear background
    ctx.fillStyle = '#020617'; // slate-950
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Draw Grid Lines & Axes
    ctx.strokeStyle = '#1e293b'; // slate-800
    ctx.lineWidth = 1;

    // Horizontal grid lines (P = 0.0, 0.25, 0.5, 0.75, 1.0)
    for (let p = 0; p <= 1.0; p += 0.25) {
      const y = padTop + (1.0 - p) * plotHeight;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(padLeft + plotWidth, y);
      ctx.stroke();

      ctx.fillStyle = '#64748b'; // slate-500
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(p.toFixed(2), padLeft - 6, y + 3);
    }

    // Vertical grid lines (Theta = -3, -2, -1, 0, +1, +2, +3)
    for (let th = -3; th <= 3; th += 1) {
      const x = padLeft + ((th + 3) / 6) * plotWidth;
      ctx.beginPath();
      ctx.moveTo(x, padTop);
      ctx.lineTo(x, padTop + plotHeight);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText((th > 0 ? `+${th}` : `${th}`), x, padTop + plotHeight + 15);
    }

    // Lower Asymptote line (c parameter)
    if (item.c > 0) {
      const cy = padTop + (1.0 - item.c) * plotHeight;
      ctx.strokeStyle = '#f59e0b';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(padLeft, cy);
      ctx.lineTo(padLeft + plotWidth, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#f59e0b';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`c = ${item.c} (Đoán mò)`, padLeft + plotWidth - 5, cy - 4);
    }

    // Draw 3PL Sigmoid Curve
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#818cf8'; // indigo-400

    const step = 0.05;
    let isFirst = true;

    for (let th = -3.0; th <= 3.0; th += step) {
      const p = calculate3PLProbability(th, item.a, item.b, item.c);
      const x = padLeft + ((th + 3.0) / 6.0) * plotWidth;
      const y = padTop + (1.0 - p) * plotHeight;

      if (isFirst) {
        ctx.moveTo(x, y);
        isFirst = false;
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Student Theta Vertical Indicator
    const clampedStudentTheta = Math.max(-3.0, Math.min(3.0, studentTheta));
    const studentX = padLeft + ((clampedStudentTheta + 3.0) / 6.0) * plotWidth;
    const studentProb = calculate3PLProbability(clampedStudentTheta, item.a, item.b, item.c);
    const studentY = padTop + (1.0 - studentProb) * plotHeight;

    ctx.strokeStyle = '#10b981'; // emerald-500
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(studentX, padTop);
    ctx.lineTo(studentX, padTop + plotHeight);
    ctx.stroke();
    ctx.setLineDash([]);

    // Intersection Dot
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(studentX, studentY, 5, 0, 2 * Math.PI);
    ctx.fill();

    // Text Badge for Student Intersection
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`P(θ) = ${(studentProb * 100).toFixed(1)}%`, studentX + 8, studentY - 6);

    // Difficulty (b) Point on curve
    const bx = padLeft + ((item.b + 3.0) / 6.0) * plotWidth;
    const bp = calculate3PLProbability(item.b, item.a, item.b, item.c);
    const by = padTop + (1.0 - bp) * plotHeight;

    ctx.fillStyle = '#f43f5e'; // rose-500
    ctx.beginPath();
    ctx.arc(bx, by, 4, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#f43f5e';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`b = ${item.b.toFixed(2)} (Độ khó)`, bx - 6, by - 4);
  }, [item, studentTheta]);

  const studentProb = calculate3PLProbability(studentTheta, item.a, item.b, item.c);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            Item Characteristic Curve (Đường Đặc Trưng Câu Hỏi ICC)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Mô hình toán học 3PL biểu diễn xác suất làm đúng P(θ) theo năng lực tiềm ẩn.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-mono">
            Item #{item.itemNumber} ({item.skillSection.toUpperCase()})
          </span>
        </div>
      </div>

      {/* HTML5 Canvas */}
      <div className="w-full h-64 relative rounded-2xl overflow-hidden border border-slate-800">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Telemetry Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Độ Phân Cách (a)</span>
          <span className="text-sm font-bold text-indigo-400 font-mono">{item.a.toFixed(2)}</span>
          <span className="text-[10px] text-slate-500 block">Độ dốc của đường cong</span>
        </div>

        <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Độ Khó (b)</span>
          <span className="text-sm font-bold text-rose-400 font-mono">{item.b.toFixed(2)}</span>
          <span className="text-[10px] text-slate-500 block">Điểm uốn 50% xác suất</span>
        </div>

        <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Đoán Mò (c)</span>
          <span className="text-sm font-bold text-amber-400 font-mono">{item.c.toFixed(2)}</span>
          <span className="text-[10px] text-slate-500 block">Tiệm cận xác suất tối thiểu</span>
        </div>

        <div className="p-2.5 bg-slate-950/70 border border-emerald-900/50 rounded-xl">
          <span className="text-emerald-400 block text-[10px] uppercase font-semibold">Xác Suất Làm Đúng Của Bạn</span>
          <span className="text-sm font-bold text-emerald-300 font-mono">{(studentProb * 100).toFixed(1)}%</span>
          <span className="text-[10px] text-emerald-500 block">Tại θ = {studentTheta.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
