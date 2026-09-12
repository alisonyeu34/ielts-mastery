"use client";

import React from "react";
import { SpeakerPathNode } from "@/data/mockListeningMapData";

interface ForensicPathOverlayProps {
  pathNodes: SpeakerPathNode[];
  activeLetter?: string | null;
  className?: string;
}

export function ForensicPathOverlay({
  pathNodes,
  activeLetter,
  className,
}: ForensicPathOverlayProps) {
  if (!pathNodes || pathNodes.length < 2) return null;

  // Generate SVG path string connecting all nodes
  const dString = pathNodes.reduce((acc, node, index) => {
    return index === 0 ? `M ${node.x} ${node.y}` : `${acc} L ${node.x} ${node.y}`;
  }, "");

  return (
    <g className={className}>
      {/* Glow shadow path */}
      <path
        d={dString}
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
        className="filter blur-[2px]"
      />

      {/* Main Animated Dashed Speaker Trajectory */}
      <path
        d={dString}
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="8 6"
        className="animate-[dash_2s_linear_infinite]"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="100"
          to="0"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>

      {/* Trajectory Nodes and Step Markers */}
      {pathNodes.map((node, index) => {
        const isTarget = activeLetter && node.targetLetter === activeLetter;

        return (
          <g key={node.nodeId} className="cursor-pointer">
            {/* Animated Pulse Circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isTarget ? "14" : "7"}
              fill="#8b5cf6"
              fillOpacity={isTarget ? "0.4" : "0.2"}
              className="animate-ping"
            />

            {/* Node Center Dot */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isTarget ? "8" : "5"}
              fill={isTarget ? "#f43f5e" : "#8b5cf6"}
              stroke="#ffffff"
              strokeWidth="2"
            />

            {/* Step sequence badge */}
            <rect
              x={node.x + 8}
              y={node.y - 18}
              width="20"
              height="14"
              rx="4"
              fill="#1e1b4b"
              stroke="#8b5cf6"
              strokeWidth="1"
            />
            <text
              x={node.x + 18}
              y={node.y - 8}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="9"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {index + 1}
            </text>
          </g>
        );
      })}
    </g>
  );
}
