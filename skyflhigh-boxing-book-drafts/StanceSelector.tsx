"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, HelpCircle, Activity } from "lucide-react";

type StanceType = "orthodox" | "southpaw";

export default function StanceSelector() {
  const [stance, setStance] = useState<StanceType>("orthodox");
  const [weightDistribution, setWeightDistribution] = useState<number>(50); // 50 means 50/50 front/back
  const [activeLayer, setActiveLayer] = useState<"footwork" | "guard" | "centerline">("footwork");

  // Calculate weight percentages based on stance
  const rearWeight = weightDistribution;
  const leadWeight = 100 - weightDistribution;

  // Stance vectors (foot placement coordinates)
  // Orthodox: Lead Foot (Left) is front-left, Rear Foot (Right) is back-right
  // Southpaw: Lead Foot (Right) is front-right, Rear Foot (Left) is back-left
  const footPositions = {
    orthodox: {
      lead: { x: 130, y: 120, rotation: -15, label: "Lead Foot (Left)" },
      rear: { x: 270, y: 320, rotation: -45, label: "Rear Foot (Right)" },
      centerline: "M 130 120 L 270 320",
    },
    southpaw: {
      lead: { x: 270, y: 120, rotation: 15, label: "Lead Foot (Right)" },
      rear: { x: 130, y: 320, rotation: 45, label: "Rear Foot (Left)" },
      centerline: "M 270 120 L 130 320",
    },
  };

  const currentStance = footPositions[stance];

  return (
    <div className="bg-[#121212] border border-[#222] rounded-2xl p-6 md:p-8 shadow-xl max-w-2xl mx-auto my-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-[#FF3B30] uppercase font-mono">
            Interactive Visual Tool
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-white mt-1">Stance & Stance Alignment</h3>
        </div>

        {/* Toggle Button */}
        <div className="flex bg-[#1E1E1E] p-1 rounded-xl border border-[#2A2A2A] self-stretch md:self-auto">
          <button
            onClick={() => setStance("orthodox")}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg font-bold text-xs tracking-wider uppercase transition-all ${
              stance === "orthodox"
                ? "bg-[#FF3B30] text-white shadow-md shadow-[#FF3B30]/20"
                : "text-[#8E8E93] hover:text-white"
            }`}
          >
            Orthodox
          </button>
          <button
            onClick={() => setStance("southpaw")}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg font-bold text-xs tracking-wider uppercase transition-all ${
              stance === "southpaw"
                ? "bg-[#FF3B30] text-white shadow-md shadow-[#FF3B30]/20"
                : "text-[#8E8E93] hover:text-white"
            }`}
          >
            Southpaw
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Interactive SVG Canvas */}
        <div className="md:col-span-7 bg-[#0A0A0A] rounded-xl border border-[#222] relative overflow-hidden flex items-center justify-center p-4">
          {/* Stance Grid Markings */}
          <div className="absolute inset-0 bg-[radial-gradient(#1c1c1e_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

          {/* SVG Frame */}
          <svg
            viewBox="0 0 400 440"
            className="w-full h-auto max-w-[320px] relative z-10 select-none"
          >
            {/* Centerline Alignment Path */}
            {activeLayer === "centerline" && (
              <motion.path
                d={currentStance.centerline}
                fill="none"
                stroke="#FFD60A"
                strokeWidth="2"
                strokeDasharray="6,4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}

            {/* Target Ring Overlay for Stance Center of Gravity */}
            <motion.circle
              cx={stance === "orthodox" 
                ? 130 + (270 - 130) * (weightDistribution / 100)
                : 270 + (130 - 270) * (weightDistribution / 100)
              }
              cy={120 + (320 - 120) * (weightDistribution / 100)}
              r="24"
              fill="none"
              stroke="#FF3B30"
              strokeWidth="2"
              strokeDasharray="4,2"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            <circle
              cx={stance === "orthodox" 
                ? 130 + (270 - 130) * (weightDistribution / 100)
                : 270 + (130 - 270) * (weightDistribution / 100)
              }
              cy={120 + (320 - 120) * (weightDistribution / 100)}
              r="6"
              fill="#FF3B30"
            />

            {/* Lead Foot (Animated representation) */}
            <g>
              <motion.g
                animate={{
                  x: currentStance.lead.x,
                  y: currentStance.lead.y,
                  rotate: currentStance.lead.rotation,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                {/* Visual Foot Shape */}
                <path
                  d="M -18 -32 C -8 -50, 8 -50, 18 -32 C 24 -15, 20 25, 12 35 C 4 42, -4 42, -12 35 C -20 25, -24 -15, -18 -32 Z"
                  fill={activeLayer === "footwork" ? "#FF3B30" : "#222"}
                  fillOpacity={activeLayer === "footwork" ? 0.85 : 0.4}
                  stroke={activeLayer === "footwork" ? "#FF3B30" : "#444"}
                  strokeWidth="2"
                  className="transition-colors duration-300"
                />
                {/* Weight Indicator Bubble inside Foot */}
                <circle cx="0" cy="0" r="10" fill="#0A0A0A" />
                <text
                  x="0"
                  y="4"
                  fill="white"
                  fontSize="10"
                  textAnchor="middle"
                  fontWeight="bold"
                  className="font-mono"
                >
                  {leadWeight}%
                </text>
              </motion.g>
              {/* Text label underneath foot */}
              <motion.text
                animate={{ x: currentStance.lead.x, y: currentStance.lead.y + 55 }}
                fill="#8E8E93"
                fontSize="11"
                textAnchor="middle"
                fontWeight="semibold"
                className="font-sans"
              >
                Lead Foot
              </motion.text>
            </g>

            {/* Rear Foot */}
            <g>
              <motion.g
                animate={{
                  x: currentStance.rear.x,
                  y: currentStance.rear.y,
                  rotate: currentStance.rear.rotation,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <path
                  d="M -18 -32 C -8 -50, 8 -50, 18 -32 C 24 -15, 20 25, 12 35 C 4 42, -4 42, -12 35 C -20 25, -24 -15, -18 -32 Z"
                  fill={activeLayer === "footwork" ? "#FFD60A" : "#222"}
                  fillOpacity={activeLayer === "footwork" ? 0.85 : 0.4}
                  stroke={activeLayer === "footwork" ? "#FFD60A" : "#444"}
                  strokeWidth="2"
                  className="transition-colors duration-300"
                />
                <circle cx="0" cy="0" r="10" fill="#0A0A0A" />
                <text
                  x="0"
                  y="4"
                  fill="white"
                  fontSize="10"
                  textAnchor="middle"
                  fontWeight="bold"
                  className="font-mono"
                >
                  {rearWeight}%
                </text>
              </motion.g>
              <motion.text
                animate={{ x: currentStance.rear.x, y: currentStance.rear.y + 55 }}
                fill="#8E8E93"
                fontSize="11"
                textAnchor="middle"
                fontWeight="semibold"
                className="font-sans"
              >
                Rear Foot
              </motion.text>
            </g>

            {/* Guard Angle Overlay */}
            {activeLayer === "guard" && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#FF3B30]"
              >
                {/* Shoulder Line representation */}
                <line
                  x1={stance === "orthodox" ? 100 : 300}
                  y1="160"
                  x2={stance === "orthodox" ? 220 : 180}
                  y2="200"
                  stroke="#FF3B30"
                  strokeWidth="3"
                />
                <circle cx={stance === "orthodox" ? 100 : 300} cy="160" r="6" fill="#FF3B30" />
                <text
                  x={stance === "orthodox" ? 75 : 325}
                  y="164"
                  fill="#FF3B30"
                  fontSize="11"
                  fontWeight="bold"
                  textAnchor={stance === "orthodox" ? "end" : "start"}
                >
                  Lead Shoulder
                </text>
              </motion.g>
            )}
          </svg>

          {/* Indicator Info Overlay */}
          <div className="absolute bottom-3 left-3 bg-[#121212]/90 border border-[#222] py-1 px-2.5 rounded-lg text-[10px] font-mono text-[#8E8E93] z-20">
            Center of Gravity Tracker
          </div>
        </div>

        {/* Dynamic Controls */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* Layer Selector */}
          <div>
            <span className="text-xs font-semibold text-[#8E8E93] block mb-2 font-mono">
              SELECT VISUAL MATRIX
            </span>
            <div className="flex flex-col gap-1.5">
              {[
                { id: "footwork", label: "Foot Placement & Angles", icon: Activity },
                { id: "guard", label: "Shoulder & Guard Angle", icon: Shield },
                { id: "centerline", label: "Balance Centerline", icon: Eye },
              ].map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id as any)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    activeLayer === layer.id
                      ? "bg-[#1E1E1E] border-[#FF3B30] text-white"
                      : "border-transparent text-[#8E8E93] hover:bg-[#1E1E1E]/50 hover:text-white"
                  }`}
                >
                  <layer.icon size={16} className={activeLayer === layer.id ? "text-[#FF3B30]" : ""} />
                  <span className="text-xs font-semibold">{layer.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Weight distribution slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono text-[#8E8E93] mb-2">
              <span>WEIGHT MATRIX</span>
              <span className="text-[#FFD60A] font-bold">
                {leadWeight}% L / {rearWeight}% R
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="70"
              value={weightDistribution}
              onChange={(e) => setWeightDistribution(Number(e.target.value))}
              className="w-full h-1 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#FF3B30] border-none"
            />
            <div className="flex justify-between items-center text-[10px] font-mono text-[#8E8E93] mt-2">
              <span>{stance === "orthodox" ? "Front Loaded" : "Rear Loaded"}</span>
              <span>Balanced (50/50)</span>
              <span>{stance === "orthodox" ? "Rear Loaded" : "Front Loaded"}</span>
            </div>
          </div>

          {/* Tactical Insights Box */}
          <div className="bg-[#1E1E1E] border border-[#222] p-4 rounded-xl">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#FFD60A] font-mono">
              Tactical Mechanics
            </h4>
            <p className="text-xs text-[#8E8E93] mt-2 leading-relaxed">
              {stance === "orthodox"
                ? "Standing Orthodox places your Left Hand and Left foot forward. Keep your feet shoulder-width apart to preserve lateral balance while keeping your weight centered to slip punch trajectories."
                : "Standing Southpaw places your Right Hand and Right foot forward. This stance is typical for left-handed fighters and matches foot-to-foot matchups to establish lead foot dominance on the outside."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
