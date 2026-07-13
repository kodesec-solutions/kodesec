"use client";

import React, { useState } from "react";
import { ShieldCheck, ShieldAlert } from "lucide-react";

export default function DataFlowVisual() {
  const [interceptMode, setInterceptMode] = useState(false);
  const [validationLogs, setValidationLogs] = useState<string[]>([
    "Gateway active. mTLS handshake complete.",
    "Data packets routing via secure VPC...",
  ]);

  const toggleIntercept = () => {
    setInterceptMode(prev => !prev);
    if (!interceptMode) {
      setValidationLogs(prev => [
        "⚠️ WARNING: Cross-Tenant SQLi payload detected!",
        "🔒 BLOCKED: Dropping packet on API validation hook.",
        ...prev.slice(0, 2)
      ]);
    } else {
      setValidationLogs(prev => [
        "Audit Mode Restored. Forwarding packets...",
        ...prev.slice(0, 2)
      ]);
    }
  };

  return (
    <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0F1424]/80 p-6 backdrop-blur-xl shadow-2xl text-left">
      <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
        <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">Kodesec validator proxy</span>
        <span className="text-[9px] font-mono font-bold text-gray-500">ROUTER V1.2</span>
      </div>

      {/* SVG Pipeline */}
      <div className="relative h-60 w-full rounded-2xl border border-white/5 bg-[#070A14] overflow-hidden flex items-center justify-center">
        
        {/* Warning Pulse overlay if intercept mode */}
        {interceptMode && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.03),transparent_70%)] animate-pulse pointer-events-none" />
        )}

        <svg className="w-full h-full" viewBox="0 0 100 60">
          {/* Main Pipeline path lines */}
          <path d="M 10 30 Q 30 15 50 30 T 90 30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          <path d="M 10 30 Q 30 15 50 30 T 90 30" fill="none" stroke={interceptMode ? "#ef4444" : "#36e27b"} strokeWidth="0.75" strokeDasharray="3, 5" className="animate-[dash_8s_linear_infinite]" />

          {/* Connectors */}
          <line x1="50" y1="30" x2="50" y2="48" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

          {/* Node Ingress (Left) */}
          <circle cx="10" cy="30" r="3" fill="#131926" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          <text x="10" y="38" fontSize="2.5" fill="#9ca3af" textAnchor="middle" fontFamily="monospace">API Ingress</text>

          {/* Validation Gate (Center) */}
          <circle 
            cx="50" cy="30" r="5" 
            fill="#131926" stroke={interceptMode ? "#ef4444" : "#36e27b"} strokeWidth="1"
            className="animate-pulse"
          />
          <text x="50" y="22" fontSize="2.5" fill="#9ca3af" textAnchor="middle" fontFamily="monospace">Validator</text>
          {interceptMode ? (
            <path d="M 49 28 L 51 28 L 51 31 L 49 31 Z M 49 32 L 51 32 L 51 33 L 49 33 Z" fill="#ef4444" />
          ) : (
            <path d="M 48 30 L 49.5 31.5 L 52 28.5" fill="none" stroke="#36e27b" strokeWidth="0.75" />
          )}

          {/* Database Cluster (Right) */}
          <circle cx="90" cy="30" r="3" fill="#131926" stroke={interceptMode ? "rgba(255,255,255,0.1)" : "#36e27b"} strokeWidth="0.8" />
          <text x="90" y="38" fontSize="2.5" fill="#9ca3af" textAnchor="middle" fontFamily="monospace">SecureDB</text>

          {/* IAM Controller Pod (Center-Bottom) */}
          <rect x="42" y="44" width="16" height="8" rx="2" fill="#131926" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          <text x="50" y="49" fontSize="2.2" fill="#9ca3af" textAnchor="middle" fontFamily="monospace">IAM-Core</text>

          {/* Flow animations */}
          {!interceptMode ? (
            <circle r="0.8" fill="#36e27b">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 10 30 Q 30 15 50 30 T 90 30" />
            </circle>
          ) : (
            <circle r="0.8" fill="#ef4444">
              <animateMotion dur="1s" repeatCount="indefinite" path="M 10 30 Q 30 15 50 30" />
            </circle>
          )}
        </svg>

        {/* Dynamic Action Trigger Button */}
        <div className="absolute bottom-3 right-3">
          <button
            onClick={toggleIntercept}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold transition-all cursor-pointer border 
              ${interceptMode 
                ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500 hover:text-black hover:border-red-500" 
                : "bg-primary/10 border-primary/20 text-primary hover:bg-primary hover:text-black hover:border-primary"}`}
          >
            {interceptMode ? <ShieldAlert size={10} /> : <ShieldCheck size={10} />}
            {interceptMode ? "VULNERABILITY SIMULATED" : "RUN INJECTION ATTACK"}
          </button>
        </div>
      </div>

      {/* Terminal Logs */}
      <div className="mt-4 rounded-2xl border border-white/5 bg-[#070A14] p-4 font-mono text-[10.5px] leading-relaxed">
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-gray-500 font-bold">
          <span>REAL-TIME AUDIT AGENT FEED</span>
          <span className={interceptMode ? "text-red-400" : "text-primary"}>
            {interceptMode ? "ALERT TRIGGERED" : "AUDIT PASS"}
          </span>
        </div>
        <div className="space-y-1 min-h-[40px]">
          {validationLogs.map((log, idx) => (
            <p key={idx} className={idx === 0 ? (interceptMode ? "text-red-400 font-bold" : "text-primary font-bold") : "text-gray-500"}>
              ❯ {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
