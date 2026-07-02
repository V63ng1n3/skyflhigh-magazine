"use client";

import React, { useState } from "react";
import { BookOpen, Menu, X, ArrowLeft, ArrowRight, Eye, Settings, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Chapter {
  id: string;
  title: string;
  category: string;
  completed: boolean;
}

export default function ReadingLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [textSize, setTextSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: "stance", title: "1. The Guard & Stance", category: "Basics", completed: true },
    { id: "footwork", title: "2. Footwork & Angles", category: "Movement", completed: false },
    { id: "punches", title: "3. The Six Core Punches", category: "Offense", completed: false },
    { id: "defense", title: "4. Defense & Countering", category: "Defense", completed: false },
    { id: "combos", title: "5. Tactical Combinations", category: "Tactics", completed: false },
  ]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const completedCount = chapters.filter((c) => c.completed).length;
  const progressPercent = Math.round((completedCount / chapters.length) * 100);

  const handleNext = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const toggleChapterComplete = (id: string) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  const sizeClasses = {
    sm: "text-sm leading-relaxed",
    base: "text-base leading-relaxed md:text-lg",
    lg: "text-lg leading-relaxed md:text-xl",
    xl: "text-xl leading-relaxed md:text-2xl",
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-[#FF3B30] selection:text-white">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-[#222] z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF3B30] via-[#FF9500] to-[#FFD60A]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-[3px] left-0 right-0 h-16 bg-[#121212]/90 backdrop-blur-md border-b border-[#222] flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-[#222] rounded-lg transition-colors text-[#8E8E93] hover:text-white"
            aria-label="Toggle Navigation Sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="font-extrabold tracking-widest text-lg bg-gradient-to-r from-white to-[#8E8E93] bg-clip-text text-transparent">
            SKYFLHIGH
          </span>
          <span className="hidden sm:inline-block text-xs bg-[#222] text-[#FFD60A] px-2 py-0.5 rounded border border-[#FFD60A]/30 font-mono">
            DIGITAL MANUAL
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Text Size Controls */}
          <div className="flex bg-[#1E1E1E] p-1 rounded-lg border border-[#2A2A2A] text-xs">
            {(["sm", "base", "lg", "xl"] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => setTextSize(sz)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  textSize === sz
                    ? "bg-[#FF3B30] text-white shadow-sm"
                    : "text-[#8E8E93] hover:text-white"
                }`}
              >
                {sz.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Progress Badge */}
          <div className="flex items-center gap-1.5 text-xs text-[#8E8E93] font-mono">
            <Award size={14} className="text-[#FFD60A]" />
            <span>{progressPercent}% Done</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16 h-screen overflow-hidden">
        {/* Sidebar Navigation */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="border-r border-[#222] bg-[#121212] flex flex-col shrink-0 h-full overflow-y-auto"
            >
              <div className="p-4 border-b border-[#222]">
                <h2 className="text-xs uppercase tracking-widest text-[#8E8E93] font-bold">Chapters</h2>
              </div>
              <nav className="flex-1 p-3 space-y-1">
                {chapters.map((chap, index) => (
                  <button
                    key={chap.id}
                    onClick={() => setCurrentChapterIndex(index)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border ${
                      currentChapterIndex === index
                        ? "bg-[#1E1E1E] border-[#FF3B30] text-white"
                        : "border-transparent text-[#8E8E93] hover:bg-[#1E1E1E]/50 hover:text-white"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#FF3B30]/80">
                        {chap.category}
                      </span>
                      <span className="font-semibold text-sm mt-0.5">{chap.title}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={chap.completed}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleChapterComplete(chap.id);
                      }}
                      className="w-4 h-4 rounded border-gray-600 text-[#FF3B30] focus:ring-[#FF3B30] accent-[#FF3B30] cursor-pointer"
                    />
                  </button>
                ))}
              </nav>
              <div className="p-4 border-t border-[#222] bg-[#0E0E0E] flex flex-col gap-2">
                <div className="h-2 bg-[#222] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF3B30] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-[#8E8E93]">
                  <span>PROGRESS</span>
                  <span>{completedCount}/{chapters.length} COMPLETED</span>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Reading Main Workspace */}
        <main className="flex-1 overflow-y-auto bg-[#0A0A0A] flex flex-col">
          <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 md:py-16">
            {/* Main Article Body */}
            <article className={`prose prose-invert max-w-none ${sizeClasses[textSize]}`}>
              {children}
            </article>

            {/* Pagination Controls */}
            <div className="mt-16 pt-8 border-t border-[#222] flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentChapterIndex === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#222] text-[#8E8E93] hover:text-white hover:border-[#444] disabled:opacity-30 disabled:pointer-events-none transition-all font-semibold text-sm"
              >
                <ArrowLeft size={16} />
                Previous Chapter
              </button>
              <button
                onClick={handleNext}
                disabled={currentChapterIndex === chapters.length - 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF3B30] to-[#E02424] text-white hover:brightness-110 disabled:opacity-30 disabled:pointer-events-none transition-all font-semibold text-sm shadow-lg shadow-[#FF3B30]/10"
              >
                Next Chapter
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Footer brand footer */}
          <footer className="py-8 border-t border-[#1C1C1E] bg-[#0E0E0E] mt-auto">
            <div className="max-w-3xl mx-auto w-full px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm font-extrabold tracking-widest text-[#FF3B30]">SKYFLHIGH</p>
                <p className="text-xs text-[#8E8E93] mt-1">© 2026 SkyFlHigh. Elevating the Art of Boxing.</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#8E8E93] font-mono">
                <a href="#terms" className="hover:text-white transition-colors">TERMS</a>
                <span>•</span>
                <a href="#privacy" className="hover:text-white transition-colors">PRIVACY</a>
                <span>•</span>
                <a href="#support" className="hover:text-white transition-colors">SUPPORT</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
