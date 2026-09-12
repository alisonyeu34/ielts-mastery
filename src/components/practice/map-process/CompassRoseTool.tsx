"use client";

import React, { useState } from "react";

interface DirectionData {
  direction: string;
  abbreviation: string;
  inFormula: string;
  toFormula: string;
  onFormula: string;
  vietnameseMeaning: string;
}

const DIRECTIONS: DirectionData[] = [
  {
    direction: 'North',
    abbreviation: 'N',
    inFormula: 'in the north of the town',
    toFormula: 'to the north of the main settlement',
    onFormula: 'on the northern coastline',
    vietnameseMeaning: 'Phía Bắc'
  },
  {
    direction: 'North-East',
    abbreviation: 'NE',
    inFormula: 'in the north-eastern quadrant of the city',
    toFormula: 'to the north-east of the riverbank',
    onFormula: 'on the north-eastern periphery',
    vietnameseMeaning: 'Phía Đông Bắc'
  },
  {
    direction: 'East',
    abbreviation: 'E',
    inFormula: 'in the east of the district',
    toFormula: 'to the east of the central motorway',
    onFormula: 'along the eastern boundary',
    vietnameseMeaning: 'Phía Đông'
  },
  {
    direction: 'South-East',
    abbreviation: 'SE',
    inFormula: 'in the south-eastern sector',
    toFormula: 'to the south-east of the woodland',
    onFormula: 'on the south-eastern waterfront',
    vietnameseMeaning: 'Phía Đông Nam'
  },
  {
    direction: 'South',
    abbreviation: 'S',
    inFormula: 'in the south of the campus',
    toFormula: 'to the south of the industrial park',
    onFormula: 'on the southern shoreline',
    vietnameseMeaning: 'Phía Nam'
  },
  {
    direction: 'South-West',
    abbreviation: 'SW',
    inFormula: 'in the south-western zone',
    toFormula: 'to the south-west of the high street',
    onFormula: 'on the south-western perimeter',
    vietnameseMeaning: 'Phía Tây Nam'
  },
  {
    direction: 'West',
    abbreviation: 'W',
    inFormula: 'in the west of the urban centre',
    toFormula: 'to the west of the railway freightline',
    onFormula: 'along the western riverbank',
    vietnameseMeaning: 'Phía Tây'
  },
  {
    direction: 'North-West',
    abbreviation: 'NW',
    inFormula: 'in the north-western corner',
    toFormula: 'to the north-west of the residential zone',
    onFormula: 'on the north-western ridge',
    vietnameseMeaning: 'Phía Tây Bắc'
  }
];

export const CompassRoseTool: React.FC = () => {
  const [selectedDir, setSelectedDir] = useState<DirectionData>(DIRECTIONS[0]);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-base">
            🧭
          </span>
          <div>
            <h3 className="text-base font-bold text-white">
              La Bàn 8 Hướng & Ma Trận Giới Từ Không Gian (8-Point Compass Rose)
            </h3>
            <p className="text-xs text-slate-400">
              Nhấp vào bất kỳ hướng nào để xem công thức giới từ học thuật C1/C2
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
          Đang chọn: {selectedDir.direction} ({selectedDir.vietnameseMeaning})
        </span>
      </div>

      {/* Interactive 8-Point Compass Rose Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
        {DIRECTIONS.map((dir) => {
          const isSelected = selectedDir.abbreviation === dir.abbreviation;
          return (
            <button
              key={dir.abbreviation}
              onClick={() => setSelectedDir(dir)}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-1 ${
                isSelected
                  ? 'bg-cyan-950/80 border-cyan-400 text-white ring-2 ring-cyan-500/50 shadow-lg scale-105'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="text-xs font-mono font-bold block text-cyan-400">
                {dir.abbreviation}
              </span>
              <span className="text-[11px] font-bold text-white truncate">
                {dir.direction}
              </span>
              <span className="text-[9px] text-slate-500">
                {dir.vietnameseMeaning}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Direction Formula Inspector */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
          <span className="font-bold text-slate-300">
            Mẫu câu học thuật chuẩn khảo thí cho hướng {selectedDir.direction}:
          </span>
          <span className="text-slate-500">Nhấp vào nút để sao chép</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* IN THE */}
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                1. Nằm Bên Trong Địa Giới (In the...):
              </span>
              <p className="text-slate-200 font-mono mt-1">
                &ldquo;{selectedDir.inFormula}&rdquo;
              </p>
            </div>
            <button
              onClick={() => handleCopy(selectedDir.inFormula)}
              className="mt-2 py-1 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold self-start"
            >
              {copiedText === selectedDir.inFormula ? '✓ Đã Chép' : 'Sao Chép'}
            </button>
          </div>

          {/* TO THE */}
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                2. Nằm Tách Biệt Bên Ngoài (To the...):
              </span>
              <p className="text-slate-200 font-mono mt-1">
                &ldquo;{selectedDir.toFormula}&rdquo;
              </p>
            </div>
            <button
              onClick={() => handleCopy(selectedDir.toFormula)}
              className="mt-2 py-1 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold self-start"
            >
              {copiedText === selectedDir.toFormula ? '✓ Đã Chép' : 'Sao Chép'}
            </button>
          </div>

          {/* ON THE / ALONG THE */}
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                3. Dọc Theo Bờ / Biên Giới (On/Along):
              </span>
              <p className="text-slate-200 font-mono mt-1">
                &ldquo;{selectedDir.onFormula}&rdquo;
              </p>
            </div>
            <button
              onClick={() => handleCopy(selectedDir.onFormula)}
              className="mt-2 py-1 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold self-start"
            >
              {copiedText === selectedDir.onFormula ? '✓ Đã Chép' : 'Sao Chép'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
