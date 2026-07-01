"use client";

import React, { useState, useEffect } from "react";

// Types
interface LogEntry {
  id: string;
  time: string;
  type: "info" | "warning" | "error" | "success";
  service: string;
  message: string;
}

export default function SecurityDashboard() {
  const [activeTab, setActiveTab] = useState<"monitor" | "heatmap" | "cloud">("monitor");
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "1", time: "09:50:12", type: "success", service: "IAM-Guard", message: "Least-privilege policy validated for role: dev-core" },
    { id: "2", time: "09:51:04", type: "info", service: "PortScan", message: "Automated discovery: 8 services analyzed on node-us-east" },
    { id: "3", time: "09:52:19", type: "warning", service: "API-WAF", message: "Rate limit exceeded from IP 198.51.100.42" },
    { id: "4", time: "09:53:11", type: "success", service: "CI-Pipeline", message: "SAST check passed. 0 critical vulnerabilities in v2.4.1" },
    { id: "5", time: "09:54:02", type: "error", service: "Kube-Audit", message: "Unauthorized secrets access attempt on pod: auth-service-pod" },
  ]);

  const [threatLevel, setThreatLevel] = useState(12);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredCheck, setHoveredCheck] = useState<{name: string, status: string, severity: string} | null>(null);

  // Live log simulator
  useEffect(() => {
    if (activeTab !== "monitor") return;
    
    const services = ["API-WAF", "Kube-Audit", "IAM-Guard", "Secrets-Shield", "Net-Seg", "DB-Shield"];
    const messages = [
      { type: "success", message: "SQLi protection rule active. Request sanitized." },
      { type: "info", message: "Scheduled network vulnerability scan completed." },
      { type: "warning", message: "Suspicious API token usage detected on client-7" },
      { type: "success", message: "Container image signature verified in docker.io/library/kodesec" },
      { type: "error", message: "Cross-Site Scripting (XSS) payload blocked in POST /v1/user" },
      { type: "success", message: "TLS handshake compliance verified for ingress-gateway" }
    ] as const;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const randomService = services[Math.floor(Math.random() * services.length)];
      
      const newLog: LogEntry = {
        id: Math.random().toString(),
        time: timeStr,
        type: randomMsg.type,
        service: randomService,
        message: randomMsg.message
      };

      setLogs(prev => [newLog, ...prev.slice(0, 4)]);
      // Randomly fluctuation threat score
      setThreatLevel(prev => {
        const delta = Math.floor(Math.random() * 7) - 3;
        const next = prev + delta;
        return next < 3 ? 3 : next > 35 ? 20 : next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [activeTab]);

  // Heatmap check items
  const checks = [
    { name: "SQL Injection", status: "Protected", severity: "Critical" },
    { name: "Broken Auth", status: "Patched", severity: "High" },
    { name: "Data Exposure", status: "Protected", severity: "High" },
    { name: "XXE Injection", status: "Mitigated", severity: "Medium" },
    { name: "Broken Access", status: "Secured", severity: "Critical" },
    { name: "Security Config", status: "Audited", severity: "Medium" },
    { name: "Cross-Site Scripting", status: "Protected", severity: "High" },
    { name: "Insecure Deserialization", status: "Mitigated", severity: "High" },
    { name: "Vulnerable Components", status: "Auto-Updated", severity: "Medium" },
    { name: "Insufficient Logging", status: "Configured", severity: "Low" },
    { name: "SSRF Protection", status: "Protected", severity: "High" },
    { name: "CORS Configuration", status: "Secured", severity: "Low" },
    { name: "Secrets Leakage", status: "Scanned & Safe", severity: "Critical" },
    { name: "Docker Container Esc", status: "Hardened", severity: "Critical" },
    { name: "Kubernetes RBAC", status: "Configured", severity: "High" },
    { name: "Cloud IAM Drift", status: "Monitoring", severity: "High" }
  ];

  return (
    <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0F1424]/80 p-6 backdrop-blur-2xl shadow-2xl transition-all hover:border-primary/30">
      {/* Decorative window controls */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
        <div className="flex gap-2">
          <span className="h-3.5 w-3.5 rounded-full bg-red-500/80 block"></span>
          <span className="h-3.5 w-3.5 rounded-full bg-yellow-500/80 block"></span>
          <span className="h-3.5 w-3.5 rounded-full bg-green-500/80 block"></span>
        </div>
        <div className="flex rounded-full bg-[#1A2238] p-1 border border-white/5 text-xs text-gray-400 font-semibold font-mono">
          <button 
            onClick={() => setActiveTab("monitor")} 
            className={`px-3 py-1 rounded-full transition-all ${activeTab === "monitor" ? "bg-primary text-black cursor-pointer font-bold" : "hover:text-white cursor-pointer font-medium"}`}
          >
            Threat Monitor
          </button>
          <button 
            onClick={() => setActiveTab("heatmap")} 
            className={`px-3 py-1 rounded-full transition-all ${activeTab === "heatmap" ? "bg-primary text-black cursor-pointer font-bold" : "hover:text-white cursor-pointer font-medium"}`}
          >
            Vulnerabilities
          </button>
          <button 
            onClick={() => setActiveTab("cloud")} 
            className={`px-3 py-1 rounded-full transition-all ${activeTab === "cloud" ? "bg-primary text-black cursor-pointer font-bold" : "hover:text-white cursor-pointer font-medium"}`}
          >
            Infrastructure
          </button>
        </div>
      </div>

      {/* Tab: Threat Monitor */}
      {activeTab === "monitor" && (
        <div className="space-y-6">
          {/* Metrics summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono font-bold">Threat Score</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono text-primary">{threatLevel}</span>
                <span className="text-xs font-mono text-emerald-400">/ 100</span>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono font-bold">Status</span>
              <div className="mt-1 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-white font-mono">SHIELDED</span>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono font-bold">Blocked Attacks</span>
              <div className="mt-1">
                <span className="text-xl font-black font-mono text-accent-cyan">2,491</span>
              </div>
            </div>
          </div>

          {/* SVG Animated Line Graph */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-mono">Attack Vector Density</span>
              <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 font-mono font-bold">LIVE TRAFFIC</span>
            </div>
            <div className="h-28 w-full relative">
              <svg className="w-full h-full animate-pulse" viewBox="0 0 100 30" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#36e27b" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#36e27b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                {/* Area under curve */}
                <path 
                  d={`M 0 30 L 0 25 L 15 22 L 30 26 L 45 10 L 60 18 L 75 8 L 90 14 L 100 ${30 - threatLevel * 0.8} L 100 30 Z`} 
                  fill="url(#chartGlow)"
                  className="transition-all duration-1000"
                />
                {/* Curve */}
                <path 
                  d={`M 0 25 L 15 22 L 30 26 L 45 10 L 60 18 L 75 8 L 90 14 L 100 ${30 - threatLevel * 0.8}`} 
                  fill="none" 
                  stroke="#36e27b" 
                  strokeWidth="0.85" 
                  className="transition-all duration-1000"
                />
                {/* Pulsing indicator at the latest point */}
                <circle 
                  cx="100" 
                  cy={30 - threatLevel * 0.8} 
                  r="1.2" 
                  fill="#36e27b"
                  className="transition-all duration-1000"
                />
              </svg>
            </div>
          </div>

          {/* Logs Terminal */}
          <div className="rounded-2xl border border-white/5 bg-[#070A14] p-4 font-mono text-[11px] leading-relaxed overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 text-gray-500 font-bold">
              <span>SECURITY LOGS STREAM</span>
              <span>PORT: 443</span>
            </div>
            <div className="space-y-2 h-[120px] overflow-y-auto scrollbar-none">
              {logs.map((log) => {
                const colorMap = {
                  success: "text-emerald-400",
                  info: "text-gray-400",
                  warning: "text-amber-400",
                  error: "text-red-400"
                };
                const badgeMap = {
                  success: "[OK]",
                  info: "[INF]",
                  warning: "[WRN]",
                  error: "[ERR]"
                };

                return (
                  <div key={log.id} className="flex gap-2 transition-all hover:bg-white/[0.02] py-0.5 rounded px-1 duration-300">
                    <span className="text-gray-500 select-none">{log.time}</span>
                    <span className={`font-bold ${colorMap[log.type]}`}>{badgeMap[log.type]}</span>
                    <span className="text-primary font-bold">{log.service}:</span>
                    <span className="text-gray-300 flex-1 truncate">{log.message}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Vulnerability Matrix Heatmap */}
      {activeTab === "heatmap" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-mono">ASVS Assessment Matrix</span>
            <span className="text-xs text-gray-500 font-mono">Hover cells for CVE details</span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {checks.map((check, idx) => {
              const severityColorMap = {
                Critical: "border-red-500/30 bg-red-950/10 text-red-400 hover:bg-red-500/20",
                High: "border-orange-500/30 bg-orange-950/10 text-orange-400 hover:bg-orange-500/20",
                Medium: "border-amber-500/30 bg-amber-950/10 text-amber-400 hover:bg-amber-500/20",
                Low: "border-emerald-500/30 bg-emerald-950/10 text-emerald-400 hover:bg-emerald-500/20"
              };

              return (
                <div
                  key={check.name}
                  onMouseEnter={() => setHoveredCheck(check)}
                  onMouseLeave={() => setHoveredCheck(null)}
                  className={`flex flex-col justify-between p-3 h-20 rounded-xl border transition-all cursor-crosshair duration-200 ${severityColorMap[check.severity as keyof typeof severityColorMap]}`}
                >
                  <span className="text-[9px] uppercase font-mono tracking-wider font-semibold opacity-70">Audit {100 + idx}</span>
                  <span className="text-[11px] font-bold tracking-tight line-clamp-1">{check.name}</span>
                  <div className="flex items-center justify-between text-[9px] font-mono">
                    <span className="opacity-90 font-semibold">{check.status}</span>
                    <span className="px-1.5 py-0.2 rounded bg-white/10 font-bold">{check.severity[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info Details Panel */}
          <div className="h-16 rounded-2xl border border-white/5 bg-[#070A14] flex items-center justify-center p-4">
            {hoveredCheck ? (
              <div className="w-full flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-mono text-gray-500 font-bold uppercase">Active Vector</span>
                  <h4 className="text-sm font-black text-white">{hoveredCheck.name}</h4>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono text-gray-500 font-bold uppercase">Status</span>
                  <p className="text-xs font-mono font-bold text-primary">{hoveredCheck.status} • {hoveredCheck.severity} Risk</p>
                </div>
              </div>
            ) : (
              <p className="text-xs font-mono text-gray-500 italic">Hover a target node to check vulnerability compliance.</p>
            )}
          </div>
        </div>
      )}

      {/* Tab: Cloud Infrastructure Node Map */}
      {activeTab === "cloud" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-mono">Cloud Topology Firewall</span>
            <span className="text-xs text-gray-500 font-mono">Interactive Topology Map</span>
          </div>

          {/* Infrastructure SVG Map */}
          <div className="relative h-60 w-full rounded-2xl border border-white/5 bg-[#070A14] overflow-hidden flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 60">
              {/* Connecting Grid Lines */}
              {/* Public to Ingress */}
              <line x1="12" y1="30" x2="30" y2="30" stroke="rgba(54, 226, 123, 0.4)" strokeWidth="0.5" strokeDasharray="2, 2" />
              {/* Ingress to Services */}
              <line x1="30" y1="30" x2="55" y2="15" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
              <line x1="30" y1="30" x2="55" y2="30" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
              <line x1="30" y1="30" x2="55" y2="45" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
              {/* Services to Databases */}
              <line x1="55" y1="15" x2="80" y2="20" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
              <line x1="55" y1="30" x2="80" y2="20" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
              <line x1="55" y1="45" x2="80" y2="40" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />

              {/* Data streams along connections (animated circles) */}
              <circle r="0.8" fill="#36e27b">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M 12 30 L 30 30 L 55 15 L 80 20" />
              </circle>
              <circle r="0.8" fill="#22d3ee">
                <animateMotion dur="3.5s" repeatCount="indefinite" path="M 30 30 L 55 45 L 80 40" />
              </circle>

              {/* Nodes */}
              {/* Public Traffic Node */}
              <circle 
                cx="12" cy="30" r="4.5" 
                fill="#131926" stroke="#22d3ee" strokeWidth="1"
                className="cursor-pointer hover:stroke-accent-cyan/80 transition-all duration-200"
                onClick={() => setActiveNode("public")}
              />
              <text x="12" y="38" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Client-WAN</text>
              <circle cx="12" cy="30" r="1.5" fill="#22d3ee" />

              {/* WAF/Ingress Node */}
              <circle 
                cx="30" cy="30" r="5" 
                fill="#131926" stroke="#36e27b" strokeWidth="1"
                className="cursor-pointer hover:stroke-primary/80 transition-all duration-200"
                onClick={() => setActiveNode("ingress")}
              />
              <text x="30" y="38.5" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">API-Gateway</text>
              {/* Shield Icon in center of gateway node */}
              <path d="M 28.5 28 L 30 27 L 31.5 28 L 31.5 30 C 31.5 31.5 30 32.5 30 32.5 C 30 32.5 28.5 31.5 28.5 30 Z" fill="none" stroke="#36e27b" strokeWidth="0.45" />

              {/* App Service Nodes */}
              <circle 
                cx="55" cy="15" r="4.5" 
                fill="#131926" stroke="#c084fc" strokeWidth="1"
                className="cursor-pointer hover:stroke-accent-purple/80 transition-all duration-200"
                onClick={() => setActiveNode("app-svc")}
              />
              <text x="55" y="23" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Auth-Svc</text>
              <rect x="53.5" y="13.5" width="3" height="3" rx="0.5" fill="none" stroke="#c084fc" strokeWidth="0.45" />

              <circle 
                cx="55" cy="30" r="4.5" 
                fill="#131926" stroke="#36e27b" strokeWidth="1"
                className="cursor-pointer hover:stroke-primary/80 transition-all duration-200"
                onClick={() => setActiveNode("trans-svc")}
              />
              <text x="55" y="38" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Core-API</text>
              <rect x="53.5" y="28.5" width="3" height="3" rx="0.5" fill="none" stroke="#36e27b" strokeWidth="0.45" />

              <circle 
                cx="55" cy="45" r="4.5" 
                fill="#131926" stroke="#36e27b" strokeWidth="1"
                className="cursor-pointer hover:stroke-primary/80 transition-all duration-200"
                onClick={() => setActiveNode("notify-svc")}
              />
              <text x="55" y="53" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Queue-Worker</text>
              <rect x="53.5" y="43.5" width="3" height="3" rx="0.5" fill="none" stroke="#36e27b" strokeWidth="0.45" />

              {/* Secure Databases */}
              <circle 
                cx="80" cy="20" r="4.5" 
                fill="#131926" stroke="#36e27b" strokeWidth="1"
                className="cursor-pointer hover:stroke-primary/80 transition-all duration-200"
                onClick={() => setActiveNode("db-vault")}
              />
              <text x="80" y="28" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">DB-Vault</text>
              <path d="M 78.5 18 L 81.5 18 L 81.5 22 L 78.5 22 Z M 78.5 19.5 L 81.5 19.5 M 78.5 21 L 81.5 21" fill="none" stroke="#36e27b" strokeWidth="0.45" />

              <circle 
                cx="80" cy="40" r="4.5" 
                fill="#131926" stroke="#c084fc" strokeWidth="1"
                className="cursor-pointer hover:stroke-accent-purple/80 transition-all duration-200"
                onClick={() => setActiveNode("db-audit")}
              />
              <text x="80" y="48" fontSize="2.8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Audit-DB</text>
              <path d="M 78.5 38 L 81.5 38 L 81.5 42 L 78.5 42 Z M 78.5 39.5 L 81.5 39.5 M 78.5 41 L 81.5 41" fill="none" stroke="#c084fc" strokeWidth="0.45" />
            </svg>

            {/* Hover Node Overlay */}
            {activeNode && (
              <div className="absolute bottom-3 right-3 max-w-xs rounded-xl border border-white/10 bg-[#0F1424] p-3 text-left shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  <h5 className="text-[10px] font-bold text-white font-mono uppercase">
                    {activeNode === "public" && "Client-WAN Traffic"}
                    {activeNode === "ingress" && "API-Gateway Firewall"}
                    {activeNode === "app-svc" && "Auth Service"}
                    {activeNode === "trans-svc" && "Core-API"}
                    {activeNode === "notify-svc" && "Queue-Worker"}
                    {activeNode === "db-vault" && "DB-Vault"}
                    {activeNode === "db-audit" && "Audit-DB"}
                  </h5>
                  <button 
                    onClick={() => setActiveNode(null)}
                    className="text-gray-500 hover:text-white text-[12px] font-bold cursor-pointer"
                  >
                    ×
                  </button>
                </div>
                <p className="mt-1 text-[9px] text-gray-400 font-sans leading-relaxed">
                  {activeNode === "public" && "Filtering incoming requests on cloud perimeter. DDOS limits set."}
                  {activeNode === "ingress" && "OWASP WAF rules block 99.8% of typical SQLi/XSS. SSL terminated."}
                  {activeNode === "app-svc" && "Token verification service. Container image has 1 outdated dependency (patched in dev)."}
                  {activeNode === "trans-svc" && "Valid secure business logic. Integrated with automatic secrets scanning."}
                  {activeNode === "notify-svc" && "Asynchronous worker. IAM restricted to read-only queue access."}
                  {activeNode === "db-vault" && "Hardened PostgreSQL DB with AWS KMS envelope encryption active."}
                  {activeNode === "db-audit" && "Read-only logs storage for compliance auditing (SOC2 aligned)."}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Trust metric foot note */}
      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-gray-500 font-mono">
        <span>SCAN STATUS: 100% COMPLIANT</span>
        <span>AGENT ENGINE V2.4</span>
      </div>
    </div>
  );
}
