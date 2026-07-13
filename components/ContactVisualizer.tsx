"use client";

import React, { useState } from "react";
import { Play, Activity } from "lucide-react";

export default function ContactVisualizer() {
  const [sessionActive, setSessionActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "mTLS handshake listener: READY",
    "Secure communication channel idle.",
  ]);

  const initiateSession = () => {
    if (sessionActive) return;
    setSessionActive(true);
    setLogs(prev => ["Initiating secure session tunnel...", ...prev.slice(0, 3)]);

    setTimeout(() => {
      setLogs(prev => ["VPC Gateway verified. Establishing mTLS...", ...prev.slice(0, 3)]);
    }, 1000);

    setTimeout(() => {
      setLogs(prev => ["Rotated session key: AES-256-GCM (ECDHE-RSA)", ...prev.slice(0, 3)]);
    }, 2000);

    setTimeout(() => {
      setLogs(prev => ["Encrypted tunnel ESTABLISHED. Safe transmission active.", ...prev.slice(0, 3)]);
      setSessionActive(false);
    }, 3200);
  };

  return (
    <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0F1424]/80 p-6 backdrop-blur-xl shadow-2xl text-left">
      <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
        <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">Kodesec secure bridge</span>
        <span className="text-[9px] font-mono font-bold text-gray-500">TUNNEL STATUS: ONLINE</span>
      </div>

      {/* SVG Tunnel Animation */}
      <div className="relative h-44 w-full rounded-2xl border border-white/5 bg-[#070A14] overflow-hidden flex items-center justify-center">
        
        {sessionActive && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(54,226,123,0.02),transparent_70%)] animate-pulse pointer-events-none" />
        )}

        <svg className="w-full h-full" viewBox="0 0 100 50">
          {/* Connector Tunnel */}
          <line x1="15" y1="25" x2="85" y2="25" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
          <line x1="15" y1="25" x2="85" y2="25" stroke={sessionActive ? "#36e27b" : "rgba(255,255,255,0.15)"} strokeWidth="1" strokeDasharray={sessionActive ? "3, 5" : "none"} className={sessionActive ? "animate-[dash_8s_linear_infinite]" : ""} />

          {/* Client Node */}
          <circle cx="15" cy="25" r="4" fill="#131926" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <text x="15" y="34" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace">Client</text>
          {sessionActive && <circle cx="15" cy="25" r="1.5" fill="#36e27b" className="animate-ping" />}

          {/* Kodesec Core Node */}
          <circle cx="85" cy="25" r="4" fill="#131926" stroke={sessionActive ? "#36e27b" : "rgba(255,255,255,0.2)"} strokeWidth="1" />
          <text x="85" y="34" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace">Kodesec</text>
          {sessionActive && <circle cx="85" cy="25" r="1.5" fill="#36e27b" />}

          {/* Packet animation */}
          {sessionActive && (
            <circle r="1" fill="#36e27b">
              <animateMotion dur="1.2s" repeatCount="indefinite" path="M 15 25 L 85 25" />
            </circle>
          )}
        </svg>

        {/* Action Button */}
        <div className="absolute bottom-3 right-3">
          <button
            onClick={initiateSession}
            disabled={sessionActive}
            className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 hover:bg-primary hover:text-black hover:border-primary px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {sessionActive ? <Activity size={10} className="animate-spin" /> : <Play size={10} />}
            {sessionActive ? "ENCRYPTING TUNNEL..." : "INITIATE SECURE SESSION"}
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="mt-4 rounded-2xl border border-white/5 bg-[#070A14] p-4 font-mono text-[10px] leading-relaxed">
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-gray-500 font-bold">
          <span>CONSOLE OUTPUT</span>
          <span>SESSION LOGS</span>
        </div>
        <div className="space-y-1 min-h-[44px]">
          {logs.map((log, idx) => (
            <p key={idx} className={idx === 0 ? "text-primary font-bold" : "text-gray-500"}>
              ❯ {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
