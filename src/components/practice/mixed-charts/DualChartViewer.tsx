"use client";

import React from "react";
import { ChartSpecification } from "@/data/mockMixedChartsData";
import { BarChart3, LineChart, PieChart, Table2 } from "lucide-react";

interface DualChartViewerProps {
  chart1: ChartSpecification;
  chart2: ChartSpecification;
  selectedPoints: { chart1: string[]; chart2: string[] };
  onTogglePoint: (chartId: "chart1" | "chart2", label: string) => void;
}

export const DualChartViewer: React.FC<DualChartViewerProps> = ({
  chart1,
  chart2,
  selectedPoints,
  onTogglePoint
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1 Card */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-semibold text-xs border border-indigo-500/30">
              CHART 1 ({chart1.type.toUpperCase()})
            </span>
            <h3 className="font-semibold text-slate-200 text-sm">{chart1.title}</h3>
          </div>
          <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
            Unit: {chart1.unit}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center min-h-[260px] bg-slate-950/60 rounded-xl p-4 border border-slate-800/60">
          {renderChartGraphic(chart1, "chart1", selectedPoints.chart1, onTogglePoint)}
        </div>
      </div>

      {/* Chart 2 Card */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-xs border border-emerald-500/30">
              CHART 2 ({chart2.type.toUpperCase()})
            </span>
            <h3 className="font-semibold text-slate-200 text-sm">{chart2.title}</h3>
          </div>
          <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
            Unit: {chart2.unit}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center min-h-[260px] bg-slate-950/60 rounded-xl p-4 border border-slate-800/60">
          {renderChartGraphic(chart2, "chart2", selectedPoints.chart2, onTogglePoint)}
        </div>
      </div>
    </div>
  );
};

function renderChartGraphic(
  chart: ChartSpecification,
  chartId: "chart1" | "chart2",
  selectedList: string[],
  onToggle: (chartId: "chart1" | "chart2", label: string) => void
) {
  if (chart.type === "bar") {
    const maxValue = Math.max(
      ...chart.data.map((d) => Math.max(d.value, d.secondaryValue || 0))
    );

    return (
      <div className="w-full space-y-4">
        <div className="flex justify-end gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block" />
            <span className="text-slate-300">Initial Period (2010/2018)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" />
            <span className="text-slate-300">Final Period (2020/2023)</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {chart.data.map((item) => {
            const isSelected = selectedList.includes(item.label);
            const pct1 = Math.round((item.value / maxValue) * 100);
            const pct2 = item.secondaryValue
              ? Math.round((item.secondaryValue / maxValue) * 100)
              : 0;

            return (
              <div
                key={item.label}
                onClick={() => onToggle(chartId, item.label)}
                className={`p-2.5 rounded-lg cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-indigo-950/50 border-indigo-500/80 shadow-md shadow-indigo-500/10"
                    : "hover:bg-slate-800/50 border-transparent"
                }`}
              >
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-200">{item.label}</span>
                  <span className="text-slate-400">
                    {item.value} {chart.unit.includes("%") ? "%" : ""} &rarr;{" "}
                    {item.secondaryValue} {chart.unit.includes("%") ? "%" : ""}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${pct1}%` }}
                    />
                  </div>
                  {item.secondaryValue !== undefined && (
                    <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-emerald-400 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${pct2}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (chart.type === "line") {
    // Group line data by category
    const categories = Array.from(new Set(chart.data.map((d) => d.category || "Main")));
    const colors = ["#38bdf8", "#4ade80", "#f43f5e", "#fbbf24"];

    return (
      <div className="w-full space-y-4">
        <div className="flex flex-wrap justify-end gap-3 text-xs">
          {categories.map((cat, idx) => (
            <div key={cat} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: colors[idx % colors.length] }}
              />
              <span className="text-slate-300">{cat}</span>
            </div>
          ))}
        </div>

        {/* SVG Multi-line Graph */}
        <div className="relative h-48 w-full">
          <svg className="w-full h-full" viewBox="0 0 360 160">
            {/* Gridlines */}
            <line x1="40" y1="20" x2="340" y2="20" stroke="#334155" strokeDasharray="3 3" />
            <line x1="40" y1="70" x2="340" y2="70" stroke="#334155" strokeDasharray="3 3" />
            <line x1="40" y1="120" x2="340" y2="120" stroke="#334155" strokeDasharray="3 3" />
            <line x1="40" y1="140" x2="340" y2="140" stroke="#475569" strokeWidth="1.5" />
            <line x1="40" y1="10" x2="40" y2="140" stroke="#475569" strokeWidth="1.5" />

            {/* Labels */}
            <text x="15" y="25" fill="#94a3b8" fontSize="9">50%</text>
            <text x="15" y="75" fill="#94a3b8" fontSize="9">25%</text>
            <text x="15" y="125" fill="#94a3b8" fontSize="9">0%</text>

            <text x="70" y="154" fill="#94a3b8" fontSize="10">2010</text>
            <text x="190" y="154" fill="#94a3b8" fontSize="10">2015</text>
            <text x="310" y="154" fill="#94a3b8" fontSize="10">2020</text>

            {/* Category Lines */}
            {categories.map((cat, idx) => {
              const pts = chart.data.filter((d) => (d.category || "Main") === cat);
              if (pts.length < 2) return null;
              const coords = pts.map((p, pIdx) => {
                const x = 70 + pIdx * 120;
                const y = 140 - (p.value / 55) * 120;
                return `${x},${y}`;
              });
              const polylineStr = coords.join(" ");

              return (
                <g key={cat}>
                  <polyline
                    points={polylineStr}
                    fill="none"
                    stroke={colors[idx % colors.length]}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {pts.map((p, pIdx) => {
                    const x = 70 + pIdx * 120;
                    const y = 140 - (p.value / 55) * 120;
                    return (
                      <circle
                        key={pIdx}
                        cx={x}
                        cy={y}
                        r="4"
                        fill={colors[idx % colors.length]}
                        stroke="#0f172a"
                        strokeWidth="2"
                        className="cursor-pointer hover:r-6 transition-all"
                        onClick={() => onToggle(chartId, `${cat}-${p.label}`)}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    );
  }

  if (chart.type === "pie") {
    const colors = ["#6366f1", "#06b6d4", "#f59e0b", "#ec4899"];
    let accumulatedAngle = 0;

    return (
      <div className="w-full flex flex-col md:flex-row items-center justify-around gap-6">
        <div className="relative w-44 h-44">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {chart.data.map((item, idx) => {
              const percentage = item.value;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -accumulatedAngle;
              accumulatedAngle += percentage;

              const isSelected = selectedList.includes(item.label);

              return (
                <circle
                  key={item.label}
                  cx="50"
                  cy="50"
                  r="15.915"
                  fill="transparent"
                  stroke={colors[idx % colors.length]}
                  strokeWidth={isSelected ? "18" : "15"}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="cursor-pointer transition-all duration-300 hover:opacity-80"
                  onClick={() => onToggle(chartId, item.label)}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className="text-xs text-slate-400 font-medium">100%</span>
            <span className="text-[10px] text-slate-500">Total Share</span>
          </div>
        </div>

        <div className="space-y-2.5 flex-1 max-w-xs">
          {chart.data.map((item, idx) => {
            const isSelected = selectedList.includes(item.label);
            return (
              <div
                key={item.label}
                onClick={() => onToggle(chartId, item.label)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer border text-xs transition-all ${
                  isSelected
                    ? "bg-indigo-950/60 border-indigo-500/80"
                    : "hover:bg-slate-800/40 border-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[idx % colors.length] }}
                  />
                  <span className="text-slate-200">{item.label}</span>
                </div>
                <span className="font-bold text-slate-100">{item.value}%</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (chart.type === "table") {
    return (
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/60">
              {chart.tableHeaders?.map((h, i) => (
                <th key={i} className="p-2.5 font-semibold text-slate-200">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {chart.tableRows?.map((row, idx) => {
              const isSelected = selectedList.includes(row.entity);
              return (
                <tr
                  key={idx}
                  onClick={() => onToggle(chartId, row.entity)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? "bg-indigo-950/60 text-indigo-200" : "hover:bg-slate-800/40 text-slate-300"
                  }`}
                >
                  <td className="p-2.5 font-medium text-slate-200">{row.entity}</td>
                  <td className="p-2.5 font-mono text-emerald-400">{row.col1}</td>
                  <td className="p-2.5 font-mono text-cyan-400">{row.col2}</td>
                  {row.col3 && <td className="p-2.5 font-mono text-amber-400">{row.col3}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}
