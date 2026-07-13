"use client";

import React, { useState, useEffect } from "react";
import { X, Clock, Shield, Sparkles } from "lucide-react";

export default function AppointmentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const handleOpen = () => {
    setIsOpen(true);
    setIframeLoading(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset";
    }
  };

  useEffect(() => {
    // 1. Listen for custom event trigger
    const handleTrigger = () => {
      handleOpen();
    };
    window.addEventListener("open-appointment-modal", handleTrigger);

    // 2. Intercept global clicks on consultation links
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (
          href &&
          (href.startsWith("/contact?type=consultation") ||
            href.startsWith("/contact?type=scoping") ||
            href.startsWith("/contact?mode=schedule"))
        ) {
          // Ignore modifier clicks (cmd, ctrl, shift, middle click) so user can still open in new tab
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
            return;
          }
          e.preventDefault();
          handleOpen();
        }
      }
    };
    document.addEventListener("click", handleGlobalClick);

    // 3. Close on ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // 4. Check query params on mount for direct page load links
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const isConsultation =
        params.get("type") === "consultation" ||
        params.get("type") === "scoping" ||
        params.get("mode") === "schedule";
      if (isConsultation) {
        setTimeout(() => {
          handleOpen();
        }, 0);
      }
    }

    return () => {
      window.removeEventListener("open-appointment-modal", handleTrigger);
      document.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in text-left">
      {/* Clickable Backdrop */}
      <div className="absolute inset-0 cursor-default" onClick={closeModal} />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#0B0F1A] border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(54,226,123,0.15)] overflow-hidden z-10 flex flex-col lg:flex-row transition-all duration-300 transform scale-100 max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-30 p-2 rounded-full border border-white/10 bg-[#101525]/80 text-muted-foreground hover:text-white hover:border-white/20 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Left Side: Scoping Info Card */}
        <div className="w-full lg:w-2/5 p-6 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-[#101525]/80 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold text-accent-cyan tracking-widest uppercase">
                DIRECT ACCESS
              </span>
              <h3 className="text-xl font-black text-white mt-1">Book Scoping Session</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Sync directly with one of our core security architects & builders. No sales pitches, just technical alignment.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Duration</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">30 Minutes Scoping Sync</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
                  <Shield size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Focus Areas</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Architecture scope, penetration testing bounds, cloud setups, timelines.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <Sparkles size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Technical Scoping</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">You talk directly to engineers. We scope technical requirements instantly.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block mt-8 pt-6 border-t border-white/5 text-[10px] text-muted-foreground/60 font-mono">
            <p>🔒 Session secured with TLS 1.3</p>
          </div>
        </div>

        {/* Right Side: Google Calendar Embed */}
        <div className="w-full lg:w-3/5 relative p-4 bg-[#0F1424]/40 flex flex-col min-h-[450px] lg:min-h-[600px] overflow-hidden">
          {/* Header bar of calendar frame */}
          <div className="hidden lg:flex items-center justify-between px-2 pb-3 border-b border-white/5 font-mono text-[9px] text-muted-foreground uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              SECURE_CALENDAR_TUNNEL
            </span>
            <span>GV=TRUE</span>
          </div>

          {/* Loading state overlay */}
          {iframeLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0B0F1A]/95 backdrop-blur-sm z-20">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-[9px] font-mono text-muted-foreground mt-3 tracking-widest uppercase animate-pulse">
                Establishing secure calendar connection...
              </span>
            </div>
          )}

          <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1XIa7bzrWGwS_81sC_u1y7WbWqXGgkto3Lmbkh6dGYfAe9BIjAPe1FcnJ2RBhZvX4uxydocABp?gv=true"
            style={{ border: 0, width: "100%", height: "100%", flexGrow: 1 }}
            frameBorder="0"
            onLoad={() => setIframeLoading(false)}
            className="rounded-2xl bg-white w-full h-full min-h-[400px] lg:min-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
}

// Global trigger function
export const openAppointmentModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-appointment-modal"));
  }
};
