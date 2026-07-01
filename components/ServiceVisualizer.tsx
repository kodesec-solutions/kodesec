"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, ShieldCheck, ShieldAlert, Lock, AlertOctagon, Terminal, Activity, FileText, CheckCircle } from "lucide-react";

interface ServiceVisualizerProps {
  slug: string;
}

export default function ServiceVisualizer({ slug }: ServiceVisualizerProps) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [exploitSuccess, setExploitSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Visual 1: Secure Application Development (SSDLC Commit Pipeline)
  if (slug === "secure-application-development") {
    const pipelineSteps = [
      { label: "Commit Scan", desc: "Verifying local secrets/keys", status: step >= 0 ? "PASSED" : "PENDING" },
      { label: "SAST / Lint", desc: "Static security check", status: step >= 1 ? "PASSED" : "PENDING" },
      { label: "DAST Sandbox", desc: "Runtime exploit scans", status: step >= 2 ? "PASSED" : "PENDING" },
      { label: "Kube Release", desc: "Pod image signature check", status: step >= 3 ? "SECURED" : "PENDING" }
    ];

    return (
      <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0F1424]/80 p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
          <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">Secure SSDLC pipeline</span>
          <span className="h-2 w-2 rounded-full bg-primary animate-ping"></span>
        </div>

        <div className="space-y-4">
          {pipelineSteps.map((s, idx) => (
            <div 
              key={s.label}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all duration-300 ${step >= idx ? "border-primary/20 bg-primary/[0.02]" : "border-white/5 bg-white/[0.01]"}`}
            >
              <div className="text-left">
                <p className={`text-xs font-bold ${step >= idx ? "text-white" : "text-gray-500"}`}>{s.label}</p>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">{s.desc}</p>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${s.status === "PENDING" ? "bg-white/5 text-gray-500" : "bg-primary/10 text-primary"}`}>
                {s.status}
              </span>
            </div>
          ))}
        </div>

        {/* Live Status */}
        <div className="mt-4 border-t border-white/5 pt-4 text-xs font-mono text-gray-500 flex justify-between">
          <span>DEPLOY STATUS: {step === 3 ? "COMPLIANT Release" : "Analyzing code..."}</span>
          <span>ENV: Staging-US</span>
        </div>
      </div>
    );
  }

  // Visual 2: Manual Website Penetration Testing (Exploit Console)
  if (slug === "manual-website-penetration-testing" || slug === "website-vulnerability-scan-manual-verification") {
    const handleTriggerExploit = (exploitType: "sqli" | "xss") => {
      setExploitSuccess(null);
      setTimeout(() => {
        setExploitSuccess(exploitType === "sqli");
      }, 1000);
    };

    return (
      <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0F1424]/80 p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500/80"></span>
            <span className="h-3 w-3 rounded-full bg-green-500/80"></span>
          </div>
          <span className="text-[10px] font-mono font-bold text-red-400 tracking-widest uppercase">Penetration Exploit Console</span>
        </div>

        {/* Exploit trigger buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => handleTriggerExploit("sqli")}
            className="h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-mono font-bold text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
          >
            Launch SQLi Exploit
          </button>
          <button
            onClick={() => handleTriggerExploit("xss")}
            className="h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono font-bold text-amber-400 hover:bg-amber-500/20 transition-all cursor-pointer"
          >
            Launch XSS Payload
          </button>
        </div>

        {/* Terminal Screen */}
        <div className="rounded-xl border border-white/5 bg-[#070A14] p-4 min-h-[140px] font-mono text-[10.5px] leading-relaxed text-left flex flex-col justify-between">
          <div className="space-y-1">
            <p className="text-gray-500"># Initializing manual exploitation payload...</p>
            {exploitSuccess === null && <p className="text-gray-400">Waiting for target selection injection...</p>}
            {exploitSuccess === true && (
              <>
                <p className="text-red-400">❯ EXPLOITING: POST /v1/auth/login HTTP/1.1</p>
                <p className="text-red-400 font-bold">❯ injection SUCCESS: Database Schema leaked.</p>
                <p className="text-gray-300">❯ CVE-2024-8190 matched. Severity: 9.8 Critical.</p>
              </>
            )}
            {exploitSuccess === false && (
              <>
                <p className="text-amber-400">❯ EXPLOITING: GET /dashboard/profile HTTP/1.1</p>
                <p className="text-emerald-400">❯ BLOCKED: CSP Header Active. Cross-Site Scripting neutralized.</p>
              </>
            )}
          </div>
          <div className="border-t border-white/5 pt-2 mt-4 flex justify-between items-center text-[9px] text-gray-500 font-bold">
            <span>BURP SUITE PROXY: INTERCEPTING</span>
            <span className={exploitSuccess ? "text-red-400 animate-pulse" : "text-emerald-400"}>
              {exploitSuccess ? "CRITICAL VULN FOUND" : "SECURED STACK"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Visual 3: Cloud & DevSecOps (Infrastructure & Cloud Posture Analyzer)
  if (slug === "infrastructure-automation-cloud-solutions") {
    const cloudResources = [
      { name: "S3 Bucket: user-documents", risk: "Publicly Readable", status: step >= 1 ? "Auto-Mitigated" : "Warning" },
      { name: "IAM Role: developer-fullaccess", risk: "Too Permissive", status: step >= 2 ? "Least-Privilege Applied" : "Warning" },
      { name: "Terraform Drift: Security Group", risk: "Open SSH Port 22", status: step >= 3 ? "Port 22 Blocked" : "Warning" }
    ];

    return (
      <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0F1424]/80 p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
          <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-widest uppercase">Cloud Posture & IaC Drift</span>
          <span className="text-[9px] font-mono font-bold text-gray-500">AWS / AZURE COMPLIANT</span>
        </div>

        <div className="space-y-3.5">
          {cloudResources.map((res, idx) => (
            <div key={res.name} className="p-3 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between text-left">
              <div>
                <p className="text-xs font-bold text-white">{res.name}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Risk: {res.risk}</p>
              </div>
              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${res.status.startsWith("Warning") ? "bg-red-500/10 text-red-400 animate-pulse" : "bg-emerald-500/10 text-emerald-400"}`}>
                {res.status}
              </span>
            </div>
          ))}
        </div>

        {/* Live Status indicator */}
        <div className="mt-4 border-t border-white/5 pt-4 text-xs font-mono text-gray-500 flex justify-between items-center">
          <span>HEALTH INDEX: {step === 3 ? "98%" : "82% - Patching drifts"}</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
        </div>
      </div>
    );
  }

  // Visual 4: Network & AD Assessment / Default (Subnet Segmentation Map)
  return (
    <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0F1424]/80 p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
        <span className="text-[10px] font-mono font-bold text-purple-400 tracking-widest uppercase">Network Segment & AD Isolation</span>
        <span className="text-[9px] font-mono font-bold text-gray-500">mTLS segmented</span>
      </div>

      <div className="relative h-44 w-full rounded-xl border border-white/5 bg-[#070A14] flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 100 50">
          {/* Connection Lines */}
          <line x1="15" y1="25" x2="45" y2="15" stroke={step >= 1 ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.15)"} strokeWidth="0.75" />
          <line x1="15" y1="25" x2="45" y2="35" stroke={step >= 2 ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.15)"} strokeWidth="0.75" />
          <line x1="45" y1="15" x2="75" y2="25" stroke={step >= 3 ? "rgba(54,226,123,0.5)" : "rgba(255,255,255,0.15)"} strokeWidth="0.75" />
          <line x1="45" y1="35" x2="75" y2="25" stroke={step >= 3 ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.15)"} strokeWidth="0.5" strokeDasharray="2,2" />

          {/* Node 1: Compromised Server */}
          <circle cx="15" cy="25" r="4.5" fill="#131926" stroke="#ef4444" strokeWidth="1.2" className="animate-pulse" />
          <text x="15" y="33" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Node-01</text>
          <circle cx="15" cy="25" r="1.5" fill="#ef4444" />

          {/* Node 2: Lateral jump target 1 */}
          <circle cx="45" cy="15" r="4.5" fill="#131926" stroke={step >= 1 ? "#ef4444" : "#c084fc"} strokeWidth="1" />
          <text x="45" y="23" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Pivot-Svc</text>

          {/* Node 3: Lateral jump target 2 (Isolated) */}
          <circle cx="45" cy="35" r="4.5" fill="#131926" stroke={step >= 3 ? "#36e27b" : step >= 2 ? "#ef4444" : "#c084fc"} strokeWidth="1" />
          <text x="45" y="43" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Core-API</text>
          {step >= 3 && <path d="M 44 33 L 46 33 L 46 36 L 44 36 Z" fill="#36e27b" />}

          {/* Node 4: Secured DB */}
          <circle cx="75" cy="25" r="5" fill="#131926" stroke="#36e27b" strokeWidth="1" />
          <text x="75" y="33" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">SecureDB</text>
          <path d="M 73.5 23 L 76.5 23 L 76.5 27 L 73.5 27 Z" fill="none" stroke="#36e27b" strokeWidth="0.5" />
        </svg>

        {/* Status indicator */}
        <div className="absolute top-2 right-2 bg-[#1A2238] border border-white/5 text-[9px] font-mono px-2 py-0.5 rounded">
          {step === 3 ? "LATERAL THREAT CONTAINED" : "SCANNING TRAFFIC PATHS"}
        </div>
      </div>
    </div>
  );
}
