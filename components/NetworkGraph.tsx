"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, ShieldCheck, Activity, Terminal, Play, Check } from "lucide-react";

export default function NetworkGraph() {
  const [scanActive, setScanActive] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    "System idle. Nodes connected securely.",
    "IAM validation: 100% policy compliance.",
  ]);

  const runScan = () => {
    if (scanActive) return;
    setScanActive(true);
    setScanStep(0);
    setLogs(prev => ["Audit Scan Triggered...", ...prev.slice(0, 3)]);
    
    // Step 1: Scan Gateway
    setTimeout(() => {
      setScanStep(1);
      setLogs(prev => ["Scanning API Ingress Gateway...", ...prev.slice(0, 3)]);
    }, 1200);

    // Step 2: Scan Pods
    setTimeout(() => {
      setScanStep(2);
      setLogs(prev => ["Analyzing microservice pods and container configurations...", ...prev.slice(0, 3)]);
    }, 2400);

    // Step 3: Scan DB
    setTimeout(() => {
      setScanStep(3);
      setLogs(prev => ["Verifying KMS envelope key rotations on database vault...", ...prev.slice(0, 3)]);
    }, 3600);

    // Step 4: Finished
    setTimeout(() => {
      setScanStep(4);
      setScanActive(false);
      setLogs(prev => ["Audit Complete. 0 vulnerabilities detected. System verified.", ...prev.slice(0, 3)]);
    }, 4800);
  };

  return (
    <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0F1424]/80 p-6 backdrop-blur-xl shadow-2xl text-left">
      <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
        <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">Kodesec secure mesh</span>
        <span className="text-[9px] font-mono font-bold text-gray-500">CONTROL LAYER V1.0</span>
      </div>

      {/* SVG Clustered Network Map */}
      <div className="relative h-60 w-full rounded-2xl border border-white/5 bg-[#070A14] overflow-hidden flex items-center justify-center">
        
        {scanActive && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(54,226,123,0.02),transparent_70%)] animate-pulse pointer-events-none" />
        )}

        <svg className="w-full h-full" viewBox="0 0 100 60">
          {/* Connection Lines from Center */}
          <line x1="50" y1="30" x2="25" y2="15" stroke={scanStep >= 2 ? "#36e27b" : "rgba(255, 255, 255, 0.15)"} strokeWidth="0.75" />
          <line x1="50" y1="30" x2="25" y2="45" stroke={scanStep >= 1 ? "#36e27b" : "rgba(255, 255, 255, 0.15)"} strokeWidth="0.75" />
          <line x1="50" y1="30" x2="75" y2="15" stroke={scanStep >= 2 ? "#36e27b" : "rgba(255, 255, 255, 0.15)"} strokeWidth="0.75" />
          <line x1="50" y1="30" x2="75" y2="45" stroke={scanStep >= 3 ? "#36e27b" : "rgba(255, 255, 255, 0.15)"} strokeWidth="0.75" />

          {/* Subnet Ring outlines */}
          <circle cx="50" cy="30" r="8" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3, 3" />
          <circle cx="50" cy="30" r="16" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />

          {/* Pulse stream animations during scan */}
          {scanActive && (
            <>
              <circle r="0.8" fill="#36e27b">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 50 30 L 25 15" />
              </circle>
              <circle r="0.8" fill="#36e27b">
                <animateMotion dur="1.2s" repeatCount="indefinite" path="M 50 30 L 25 45" />
              </circle>
              <circle r="0.8" fill="#36e27b">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 50 30 L 75 15" />
              </circle>
              <circle r="0.8" fill="#36e27b">
                <animateMotion dur="1s" repeatCount="indefinite" path="M 50 30 L 75 45" />
              </circle>
            </>
          )}

          {/* Node 1: Control Center (Center) */}
          <circle 
            cx="50" cy="30" r="5" 
            fill="#131926" stroke="#36e27b" strokeWidth="1.2"
            className={scanActive ? "animate-pulse" : ""}
          />
          <text x="50" y="38" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Root-Core</text>
          <circle cx="50" cy="30" r="1.5" fill="#36e27b" />

          {/* Node 2: API Gateway (Top Left) */}
          <circle cx="25" cy="15" r="4" fill="#131926" stroke={scanStep >= 1 ? "#36e27b" : "rgba(255,255,255,0.2)"} strokeWidth="1" />
          <text x="25" y="22" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Gateway</text>
          {scanStep >= 1 && <circle cx="25" cy="15" r="1.2" fill="#36e27b" />}

          {/* Node 3: Auth Container (Bottom Left) */}
          <circle cx="25" cy="45" r="4" fill="#131926" stroke={scanStep >= 2 ? "#36e27b" : "rgba(255,255,255,0.2)"} strokeWidth="1" />
          <text x="25" y="52" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">AuthPod</text>
          {scanStep >= 2 && <circle cx="25" cy="45" r="1.2" fill="#36e27b" />}

          {/* Node 4: Microservice Queue (Top Right) */}
          <circle cx="75" cy="15" r="4" fill="#131926" stroke={scanStep >= 2 ? "#36e27b" : "rgba(255,255,255,0.2)"} strokeWidth="1" />
          <text x="75" y="22" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">QueueSvc</text>
          {scanStep >= 2 && <circle cx="75" cy="15" r="1.2" fill="#36e27b" />}

          {/* Node 5: Encrypted Database Vault (Bottom Right) */}
          <circle cx="75" cy="45" r="4" fill="#131926" stroke={scanStep >= 3 ? "#36e27b" : "rgba(255,255,255,0.2)"} strokeWidth="1" />
          <text x="75" y="52" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">DbVault</text>
          {scanStep >= 3 && <circle cx="75" cy="45" r="1.2" fill="#36e27b" />}
        </svg>

        {/* Dynamic Action Trigger Button */}
        <div className="absolute bottom-3 right-3">
          <button
            onClick={runScan}
            disabled={scanActive}
            className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 hover:bg-primary hover:text-black hover:border-primary px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {scanActive ? <Activity size={10} className="animate-spin" /> : <Play size={10} />}
            {scanActive ? "SCANNING MESH..." : "SIMULATE AUDIT SCAN"}
          </button>
        </div>
      </div>

      {/* Terminal Logs */}
      <div className="mt-4 rounded-2xl border border-white/5 bg-[#070A14] p-4 font-mono text-[10.5px] leading-relaxed">
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-gray-500 font-bold">
          <span>SECURE PROTOCOL AGENT FEED</span>
          <span>MESH: SECURED</span>
        </div>
        <div className="space-y-1 min-h-[40px]">
          {logs.map((log, idx) => (
            <p key={idx} className={idx === 0 ? "text-primary font-bold animate-fade-in-down" : "text-gray-500"}>
              ❯ {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
