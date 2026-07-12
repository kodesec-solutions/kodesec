"use client";

import React, { useState, useEffect } from "react";
import { 
  Play, 
  RotateCcw,
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  ShieldAlert, 
  Terminal, 
  Activity, 
  Cpu, 
  Server, 
  Workflow, 
  Search,
  Database,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VisualizerProps {
  slug: string;
}

export default function SolutionVisualizer({ slug }: VisualizerProps) {
  // Common states
  const [isPlaying, setIsPlaying] = useState(true);
  const [step, setStep] = useState(0);

  // 1. Design & Engineering states
  const [apiStatus, setApiStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [requestLogs, setRequestLogs] = useState<string[]>([
    "Gateway initialized.",
    "mTLS channel established."
  ]);

  // 2. Cybersecurity states
  const [exploitTarget, setExploitTarget] = useState<"sqli" | "xss" | null>(null);
  const [exploitLog, setExploitLog] = useState<string[]>([]);
  const [exploitRunning, setExploitRunning] = useState(false);

  // 3. DevOps states
  const [deployLogs, setDeployLogs] = useState<string[]>([
    "Runner booted.",
    "Git commit: ad98c21 (feature/auth-refresh)"
  ]);
  const [replicaCount, setReplicaCount] = useState(2);

  // 4. QA states
  const [qaProgress, setQaProgress] = useState(0);
  const [tests, setTests] = useState([
    { name: "Auth / Login redirect checks", status: "pending" },
    { name: "Stripe checkout flow & webhooks", status: "pending" },
    { name: "User profile API schema validation", status: "pending" },
    { name: "Concurrent DB pool connection load", status: "pending" }
  ]);

  // Design & Engineering Request Simulator
  const triggerApiRequest = () => {
    if (apiStatus === "sending") return;
    setApiStatus("sending");
    setRequestLogs(prev => [...prev, "POST /v1/billing/checkout HTTP/2", "Authorizing client signature..."]);
    
    setTimeout(() => {
      setRequestLogs(prev => [...prev, "Signature valid (Tenant: 91b0c-a9)", "Applying Row-Level Security checks...", "DB query complete."]);
      setApiStatus("success");
    }, 1500);
  };

  const resetApiRequest = () => {
    setApiStatus("idle");
    setRequestLogs([
      "Gateway initialized.",
      "mTLS channel established."
    ]);
  };

  // Cybersecurity Exploit Simulator
  const triggerExploit = (type: "sqli" | "xss") => {
    if (exploitRunning) return;
    setExploitRunning(true);
    setExploitTarget(type);
    setExploitLog([
      `Initial payload scoping against target: /api/v1/${type === "sqli" ? "users" : "comments"}`,
      "Sending header injection..."
    ]);

    setTimeout(() => {
      setExploitLog(prev => [...prev, "Analyzing response bytes..."]);
    }, 600);

    setTimeout(() => {
      if (type === "sqli") {
        setExploitLog(prev => [
          ...prev,
          "Bypassing authentication logic...",
          "VULNERABILITY FOUND: CVE-2026-9280 SQLi",
          "DUMPING DATABASE SCHEMA..."
        ]);
        setExploitRunning(false);
      } else {
        setExploitLog(prev => [
          ...prev,
          "Bypassing sanitization layers...",
          "BLOCKED: CSP directive (script-src 'self' 'nonce-...') active.",
          "EXPLOIT SHIELDED: XSS injection blocked by security boundaries."
        ]);
        setExploitRunning(false);
      }
    }, 1600);
  };

  // DevOps loop
  useEffect(() => {
    if (slug !== "cloud-devops" || !isPlaying) return;
    
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % 4);
    }, 3500);

    return () => clearInterval(interval);
  }, [slug, isPlaying]);

  // QA loop
  useEffect(() => {
    if (slug !== "quality-assurance" || !isPlaying) return;

    const interval = setInterval(() => {
      setQaProgress(prev => {
        const next = prev >= 100 ? 0 : prev + 2;
        
        // Update individual tests status based on progress
        setTests(current => {
          return current.map((t, idx) => {
            const threshold = (idx + 1) * 25;
            if (next === 0) return { ...t, status: "pending" };
            if (next >= threshold) {
              // Last test might fail load balance, just for dynamic view
              if (idx === 3 && next > 95) return { ...t, status: "passed" }; 
              return { ...t, status: "passed" };
            }
            if (next >= threshold - 15) return { ...t, status: "running" };
            return t;
          });
        });

        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [slug, isPlaying]);

  // ==========================================
  // RENDER DYNAMIC VISUALIZERS
  // ==========================================

  // 1. DESIGN & ENGINEERING
  if (slug === "design-engineering") {
    return (
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 md:p-6 shadow-2xl text-left font-mono">
        <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
            mTLS Secure Architecture
          </span>
          <span className="text-[9px] text-gray-500 font-mono">API GATEWAY ACTIVE</span>
        </div>

        {/* Visual Map */}
        <div className="grid grid-cols-3 gap-2 items-center text-center mb-5 relative">
          <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02]">
            <Activity className="h-5 w-5 mx-auto text-primary mb-1 animate-pulse" />
            <p className="text-[9px] font-bold text-white">Client App</p>
            <p className="text-[8px] text-gray-500">React Client</p>
          </div>
          
          <div className="relative flex flex-col items-center">
            {/* Pulsing Arrow lines */}
            <div className="w-full h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30 relative">
              {apiStatus === "sending" && (
                <motion.div 
                  className="absolute h-1.5 w-1.5 bg-primary rounded-full top-1/2 -translate-y-1/2"
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>
            <div className="mt-1 p-2 rounded-lg border border-primary/20 bg-primary/5 text-[9px] font-bold text-primary">
              mTLS Shield
            </div>
          </div>

          <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02]">
            <Database className="h-5 w-5 mx-auto text-cyan-400 mb-1" />
            <p className="text-[9px] font-bold text-white">PostgreSQL</p>
            <p className="text-[8px] text-gray-500">Row-Level Security</p>
          </div>
        </div>

        {/* Terminal logs */}
        <div className="h-36 rounded-xl border border-white/5 bg-[#050811] p-3 text-[10px] text-gray-400 overflow-y-auto no-scrollbar flex flex-col justify-between">
          <div className="space-y-1">
            {requestLogs.map((log, i) => (
              <p key={i} className={log.includes("POST") ? "text-primary font-bold" : log.includes("vulnerability") ? "text-red-400" : "text-gray-400"}>
                ❯ {log}
              </p>
            ))}
          </div>
          
          {apiStatus === "success" && (
            <div className="text-emerald-400 font-bold border-t border-emerald-500/10 pt-1 mt-2 flex justify-between">
              <span>RESPONSE: HTTP 201 Created</span>
              <span>TIME: 84ms</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button 
            onClick={triggerApiRequest}
            disabled={apiStatus === "sending"}
            className="flex-1 h-9 flex items-center justify-center gap-1.5 rounded-lg bg-primary hover:bg-primary-light text-[10px] font-bold text-[#0B0F1A] transition-all disabled:opacity-50 cursor-pointer"
          >
            {apiStatus === "sending" ? (
              <RefreshCw className="h-3 w-3 animate-spin" />
            ) : (
              <Play className="h-3 w-3" />
            )}
            Send Signed API Post
          </button>
          
          <button 
            onClick={resetApiRequest}
            className="h-9 w-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  // 2. NETWORK & CYBER SECURITY
  if (slug === "cybersecurity") {
    return (
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 md:p-6 shadow-2xl text-left font-mono">
        <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
          <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5" />
            Offensive Exploit Console
          </span>
          <span className="text-[9px] text-gray-500 font-mono">MANUAL ATTACK MODE</span>
        </div>

        {/* Choice buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button 
            onClick={() => triggerExploit("sqli")}
            disabled={exploitRunning}
            className={`h-9 flex items-center justify-center gap-1.5 rounded-lg border text-[9px] font-bold transition-all cursor-pointer
              ${exploitTarget === "sqli" 
                ? "border-red-500 bg-red-500/10 text-red-400" 
                : "border-white/10 bg-white/5 text-gray-400 hover:text-white"}`}
          >
            SQLi Query Injection
          </button>
          <button 
            onClick={() => triggerExploit("xss")}
            disabled={exploitRunning}
            className={`h-9 flex items-center justify-center gap-1.5 rounded-lg border text-[9px] font-bold transition-all cursor-pointer
              ${exploitTarget === "xss" 
                ? "border-amber-500 bg-amber-500/10 text-amber-400" 
                : "border-white/10 bg-white/5 text-gray-400 hover:text-white"}`}
          >
            XSS Script Exploit
          </button>
        </div>

        {/* Terminal output */}
        <div className="h-40 rounded-xl border border-white/5 bg-[#050811] p-3 text-[10px] text-gray-400 flex flex-col justify-between overflow-y-auto no-scrollbar">
          <div className="space-y-1">
            {exploitLog.length === 0 ? (
              <p className="text-gray-500"># Select a payload to launch and evaluate logical defense integrity.</p>
            ) : (
              exploitLog.map((log, i) => {
                let colorClass = "text-gray-400";
                if (log.includes("VULNERABILITY") || log.includes("DUMPING")) {
                  colorClass = "text-red-400 font-bold";
                } else if (log.includes("SHIELDED") || log.includes("BLOCKED")) {
                  colorClass = "text-emerald-400 font-bold";
                } else if (log.includes("Bypassing")) {
                  colorClass = "text-amber-400";
                }
                return (
                  <p key={i} className={colorClass}>
                    ❯ {log}
                  </p>
                );
              })
            )}
          </div>
          
          {exploitTarget && !exploitRunning && (
            <div className="mt-2 pt-1 border-t border-white/5 flex justify-between items-center text-[9px]">
              <span className="text-gray-500">AUDIT SUMMARY:</span>
              <span className={exploitTarget === "sqli" ? "text-red-400 flex items-center gap-1" : "text-emerald-400 flex items-center gap-1"}>
                {exploitTarget === "sqli" ? (
                  <>
                    <ShieldAlert className="h-3 w-3" />
                    ACTION REQUIRED
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-3 w-3" />
                    SHIELD HELD
                  </>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. CLOUD & DEVOPS
  if (slug === "cloud-devops") {
    const pipelineSteps = [
      { name: "IaC Lint / Validate", status: step >= 0 ? "PASSED" : "PENDING" },
      { name: "Container Audit", status: step >= 1 ? "PASSED" : "PENDING" },
      { name: "Automated SAST Gate", status: step >= 2 ? "PASSED" : "PENDING" },
      { name: "K8s Cluster Deploy", status: step >= 3 ? "STABLE" : "PENDING" }
    ];

    return (
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 md:p-6 shadow-2xl text-left font-mono">
        <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
            <Workflow className="h-3.5 w-3.5" />
            DevSecOps Release Pipeline
          </span>
          <span className="text-[9px] text-gray-500 font-mono">KUBERNETES BLUE/GREEN</span>
        </div>

        {/* Steps List */}
        <div className="space-y-2 mb-4">
          {pipelineSteps.map((s, idx) => (
            <div 
              key={s.name}
              className={`p-2.5 rounded-lg border text-[10px] flex items-center justify-between transition-all duration-300
                ${step >= idx 
                  ? "border-purple-500/20 bg-purple-500/[0.03] text-white" 
                  : "border-white/5 bg-white/[0.01] text-gray-500"}`}
            >
              <span>{idx + 1}. {s.name}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold
                ${s.status === "PENDING" 
                  ? "bg-white/5 text-gray-500" 
                  : s.status === "STABLE" 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "bg-purple-500/10 text-purple-400"}`}
              >
                {s.status}
              </span>
            </div>
          ))}
        </div>

        {/* Pod Scaling Monitor */}
        <div className="p-3 rounded-xl border border-white/5 bg-[#050811] flex items-center justify-between text-[9px] text-gray-400">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-purple-400 animate-pulse" />
            <div>
              <p className="font-bold text-white">Active ReplicaSet: web-api</p>
              <p className="text-[8px] text-gray-500">Nodes scaling: {replicaCount} Pods</p>
            </div>
          </div>
          
          <div className="flex gap-1.5">
            <button 
              onClick={() => setReplicaCount(prev => Math.max(1, prev - 1))}
              className="h-6 w-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 cursor-pointer font-bold"
            >
              -
            </button>
            <button 
              onClick={() => setReplicaCount(prev => Math.min(5, prev + 1))}
              className="h-6 w-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 cursor-pointer font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. QUALITY ASSURANCE
  return (
    <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 md:p-6 shadow-2xl text-left font-mono">
      <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <Search className="h-3.5 w-3.5" />
          Playwright Automated Suite
        </span>
        <span className="text-[9px] text-gray-500 font-mono">THREAD POOL: 4 RUNNERS</span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-[9px] text-gray-500 mb-1">
          <span>RUNNING TEST CASES</span>
          <span className="text-amber-400 font-bold">{qaProgress}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-150"
            style={{ width: `${qaProgress}%` }}
          />
        </div>
      </div>

      {/* Dynamic Tests List */}
      <div className="space-y-2">
        {tests.map((t, idx) => (
          <div 
            key={t.name}
            className="p-2.5 rounded-lg border border-white/5 bg-white/[0.01] text-[9.5px] flex items-center justify-between"
          >
            <span className="text-gray-300 font-semibold">{t.name}</span>
            <div className="flex items-center gap-1">
              {t.status === "passed" && (
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle className="h-3.5 w-3.5" />
                  PASSED
                </span>
              )}
              {t.status === "running" && (
                <span className="text-amber-400 flex items-center gap-1 font-bold animate-pulse">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  TESTING
                </span>
              )}
              {t.status === "pending" && (
                <span className="text-gray-500 flex items-center gap-1 font-bold">
                  IDLE
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
