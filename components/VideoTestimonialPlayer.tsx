"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Building2,
  Video,
  Award,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HOME_CONTENT } from "@/content/site";

export const VideoTestimonialPlayer: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOnScreen, setIsOnScreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const playlist = HOME_CONTENT.voices.playlist;
  const currentStory = playlist[activeStoryIndex];

  // Only run the carousel while the player is actually on screen. The timer
  // previously ticked for the entire session even with the section scrolled
  // far out of view, waking the main thread every 8s to re-render it.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsOnScreen(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Auto-advance every 8s only when visible, not playing and not hovered.
  useEffect(() => {
    if (isPlaying || isHovered || !isOnScreen || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveStoryIndex((prev) => (prev + 1) % playlist.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, isOnScreen, prefersReducedMotion, playlist.length]);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const selectStory = (idx: number) => {
    setActiveStoryIndex(idx);
    setIsPlaying(false);
    if (playlist[idx]?.hasVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-6xl mx-auto rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 p-5 sm:p-8 lg:p-10 shadow-xl dark:shadow-2xl overflow-hidden relative text-slate-900 dark:text-white"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-lime/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
        {/* Left: Dynamic Media Container (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-xl group">
            {currentStory.hasVideo ? (
              /* REAL ON-CAMPUS VIDEO TESTIMONIAL (Gabriel Samraj) */
              <>
                <video
                  ref={videoRef}
                  src={currentStory.videoSrc || HOME_CONTENT.voices.videoSrc}
                  poster={currentStory.poster || HOME_CONTENT.voices.poster}
                  className="relative z-10 w-full h-full object-contain"
                  playsInline
                  // The clip is ~1.2 MB and sits well below the fold. Without
                  // this, browsers prefetch it on page load for every visitor,
                  // most of whom never press play. The poster still renders.
                  preload="none"
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Custom Overlay Controls */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-black/25 to-black/35 flex flex-col justify-between p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime text-[#071A10] text-xs font-heading font-extrabold uppercase tracking-wider shadow-md">
                      <span className="w-2 h-2 rounded-full bg-[#071A10] animate-ping" />
                      {isPlaying ? "Playing Video" : "Verified Video Story"}
                    </span>

                    <button
                      onClick={handleMuteToggle}
                      className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                      aria-label="Toggle audio"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="self-center">
                    <button
                      onClick={handlePlayToggle}
                      className="w-16 h-16 rounded-2xl bg-lime hover:bg-[#05D96B] text-[#071A10] flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause className="w-7 h-7 fill-[#071A10]" />
                      ) : (
                        <Play className="w-7 h-7 fill-[#071A10] ml-1" />
                      )}
                    </button>
                  </div>

                  <div className="text-white">
                    <p className="text-[11px] uppercase tracking-wider text-lime font-mono font-bold mb-1">
                      Karka Campus Spotlight
                    </p>
                    <p className="text-sm sm:text-base font-bold font-heading">
                      {currentStory.name} · {currentStory.role} @ {currentStory.company}
                    </p>
                  </div>
                </div>

                {!isPlaying && (
                  <button
                    onClick={handlePlayToggle}
                    className="absolute inset-0 m-auto z-20 w-16 h-16 rounded-2xl bg-lime text-[#071A10] flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95 pointer-events-auto cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                    aria-label="Play testimonial video"
                  >
                    <Play className="w-7 h-7 fill-[#071A10] ml-1" />
                  </button>
                )}
              </>
            ) : (
              /* DEDICATED ALUMNI CAREER SPOTLIGHT CARD (Distinct for each graduate) */
              <div className="relative w-full h-full flex flex-col justify-between p-5 sm:p-7 bg-gradient-to-br from-slate-900 via-[#0B1428] to-[#0A1020] text-white">
                {/* Top header chips */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime/15 border border-lime/30 text-lime text-xs font-heading font-extrabold uppercase tracking-wider">
                      <Award className="w-3.5 h-3.5" />
                      Verified Career Outcome
                    </span>
                    <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-mono text-slate-300">
                      CTC {currentStory.package}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
                    {currentStory.companyLogo && (
                      <div className="relative w-5 h-5 rounded overflow-hidden">
                        <Image
                          src={currentStory.companyLogo}
                          alt={currentStory.company}
                          fill
                          sizes="20px"
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span className="text-xs font-bold text-white font-heading">
                      {currentStory.company}
                    </span>
                  </div>
                </div>

                {/* Center Content: Portrait + Name & Details */}
                <div className="flex items-center gap-4 sm:gap-6 my-auto z-10">
                  <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-lime/40 shadow-xl shrink-0">
                    {currentStory.avatar ? (
                      <Image
                        src={currentStory.avatar}
                        alt={currentStory.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center font-bold text-xl text-white">
                        {currentStory.name.slice(0, 2)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 sm:space-y-1.5 min-w-0">
                    <div className="text-lg sm:text-2xl font-black font-heading text-white">
                      {currentStory.name}
                    </div>
                    <div className="text-xs sm:text-sm text-lime font-semibold flex items-center gap-1.5">
                      <span>{currentStory.role}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-300">{currentStory.company}</span>
                    </div>

                    {/* Skill pills */}
                    {currentStory.skills && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {currentStory.skills.map((skill: string, sIdx: number) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300 font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Bar: Switch to video interview link */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs z-10">
                  <span className="text-slate-400 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-lime" />
                    Trained in Nagercoil · Hired in Tech
                  </span>

                  <button
                    onClick={() => selectStory(0)}
                    className="inline-flex items-center gap-1.5 text-lime hover:underline font-heading font-bold cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Watch Gabriel&apos;s Video</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Testimonial Quote & Verified Banner */}
          <div className="relative min-h-[110px] p-4.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-lime/15 text-emerald-800 dark:text-lime text-[11px] font-mono font-bold uppercase tracking-wider">
                    {currentStory.tag}
                  </span>
                  <span className="text-xs font-heading font-bold text-emerald-600 dark:text-lime">
                    {currentStory.package} Package
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed italic font-body">
                  &ldquo;{currentStory.quote}&rdquo;
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 font-body flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-lime" />
                  <span>
                    Verified alumnus from Karka Nagercoil Campus · {currentStory.role} at {currentStory.company}
                  </span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Playlist Stories (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white font-heading">
                Learner Stories &amp; Outcomes
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select a graduate to view their verified journey
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mr-1">
                {activeStoryIndex + 1} / {playlist.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setActiveStoryIndex(
                    (prev) => (prev - 1 + playlist.length) % playlist.length
                  )
                }
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveStoryIndex((prev) => (prev + 1) % playlist.length)
                }
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                aria-label="Next story"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {playlist.map((story, idx) => {
              const isActive = idx === activeStoryIndex;
              return (
                <button
                  key={story.id}
                  onClick={() => selectStory(idx)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lime ${
                    isActive
                      ? "bg-lime/10 dark:bg-lime/15 border-lime/50 shadow-sm translate-x-1"
                      : "bg-slate-50/80 dark:bg-white/5 border-slate-200/60 dark:border-white/10 hover:border-lime/30 hover:bg-slate-100 dark:hover:bg-white/10"
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Real Avatar Thumbnail */}
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-white/10">
                      {story.avatar ? (
                        <Image
                          src={story.avatar}
                          alt={story.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 dark:bg-white/10 flex items-center justify-center font-bold text-xs">
                          {story.name.slice(0, 2)}
                        </div>
                      )}
                      {story.hasVideo && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-bold text-sm text-slate-900 dark:text-white leading-tight font-heading truncate">
                        {story.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-body truncate">
                        {story.role} · <span className="font-semibold text-slate-700 dark:text-slate-300">{story.company}</span>
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right flex flex-col items-end gap-1">
                    <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-lime">
                      {story.package}
                    </span>
                    {story.hasVideo ? (
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-lime px-1.5 py-0.5 rounded bg-lime/15 border border-lime/25 flex items-center gap-1">
                        <Video className="w-2.5 h-2.5" />
                        Video
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono font-medium text-slate-400">
                        Spotlight
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
