"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, ShieldCheck, AlertOctagon, Info, ShieldAlert, Lock } from "lucide-react";

interface NodeDetails {
  title: string;
  status: string;
  vector: string;
  remediation: string;
}

export default function AttackGraph() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const stepsLogs = [
    "Threat actor initiates reconnaissance on corporate perimeter.",
    "WAF detects and intercepts SQL Injection exploit on ingress gateway.",
    "Attacker attempts OAuth token reuse to bypass perimeter controls.",
    "Intrusion detection flags credential anomaly at Auth Service pod.",
    "Automated playbook isolates auth container and revokes compromised token.",
    "System threat level neutralized. Firewall rules successfully hotpatched."
  ];

  const nodeData: Record<string, NodeDetails> = {
    actor: {
      title: "Threat Actor (External)",
      status: "Active Reconnaissance",
      vector: "IP: 203.0.113.88 (Tor Ingress)",
      remediation: "Access restricted via blacklisting."
    },
    waf: {
      title: "Edge WAF / Firewall",
      status: step === 1 ? "BLOCKED ATTACK" : "Shielding Ingress",
      vector: step === 1 ? "SQL Injection Payload Detected" : "HTTP/S Port 443 active",
      remediation: "ModSecurity Core Rule Set active."
    },
    gateway: {
      title: "API Ingress Gateway",
      status: step >= 2 ? "Traffic Audited" : "Listening",
      vector: step === 2 ? "Unusual OAuth Token Authorization" : "Routing requests",
      remediation: "Mutual TLS (mTLS) forced check."
    },
    auth: {
      title: "Auth Microservice Pod",
      status: step === 3 ? "COMPROMISED" : step >= 4 ? "CONTAINED & PATCHED" : "Healthy",
      vector: step === 3 ? "Privilege Escalation Attempt" : "Least-privilege IAM active",
      remediation: step >= 4 ? "Kubernetes network policy isolation" : "Token validation active"
    },
    db: {
      title: "Database Vault (User Core)",
      status: "SECURED & SHIELDED",
      vector: "Static envelope AES-256 encrypted",
      remediation: "KMS envelope rotation active."
    }
  };

  // State loop timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % 6);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleRestart = () => {
    setStep(0);
  };

  return (
    <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0F1424]/80 p-6 backdrop-blur-2xl shadow-2xl transition-all hover:border-primary/30 text-left">
      
      {/* Decorative window header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full bg-red-500/80"></span>
          <span className="h-3.5 w-3.5 rounded-full bg-yellow-500/80"></span>
          <span className="h-3.5 w-3.5 rounded-full bg-green-500/80"></span>
          <span className="text-xs font-mono font-bold text-gray-500 ml-2">ACTIVE THREAT SIMULATOR</span>
        </div>

        {/* Controls */}
        <div className="flex gap-2 bg-[#1A2238] p-1 rounded-full border border-white/5">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            title={isPlaying ? "Pause Simulator" : "Play Simulator"}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
          <button 
            onClick={handleRestart}
            className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            title="Restart Attack Loop"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* Simulator Visual Display (SVG Attack Path) */}
      <div className="relative h-64 w-full rounded-2xl border border-white/5 bg-[#070A14] overflow-hidden flex items-center justify-center p-2">
        
        {/* Dynamic Scan Overlay */}
        {step === 0 && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(239,68,68,0.05),transparent_60%)] animate-pulse pointer-events-none" />}
        {step === 5 && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(54,226,123,0.05),transparent_60%)] pointer-events-none" />}

        <svg className="w-full h-full" viewBox="0 0 100 60">
          {/* Paths connecting nodes */}
          {/* Actor to WAF */}
          <line 
            x1="12" y1="30" x2="32" y2="30" 
            stroke={step >= 1 ? "rgba(239, 68, 68, 0.6)" : "rgba(255, 255, 255, 0.15)"} 
            strokeWidth="0.75" 
            strokeDasharray={step === 0 ? "2, 2" : "0"}
          />
          {/* WAF to API Gateway */}
          <line 
            x1="32" y1="30" x2="52" y2="30" 
            stroke={step === 1 ? "rgba(54, 226, 123, 0.6)" : step >= 2 ? "rgba(239, 68, 68, 0.6)" : "rgba(255, 255, 255, 0.15)"} 
            strokeWidth="0.75" 
          />
          {/* API Gateway to Auth Pod */}
          <line 
            x1="52" y1="30" x2="72" y2="20" 
            stroke={step === 3 ? "rgba(239, 68, 68, 0.6)" : step >= 4 ? "rgba(54, 226, 123, 0.3)" : "rgba(255, 255, 255, 0.15)"} 
            strokeWidth="0.75" 
          />
          {/* API Gateway to DB (fallback/blocked path) */}
          <line 
            x1="52" y1="30" x2="80" y2="45" 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth="0.5" 
            strokeDasharray="1, 1"
          />
          {/* Auth Pod to DB Vault */}
          <line 
            x1="72" y1="20" x2="80" y2="45" 
            stroke={step === 3 ? "rgba(239, 68, 68, 0.3)" : step >= 4 ? "rgba(54, 226, 123, 0.5)" : "rgba(255, 255, 255, 0.15)"} 
            strokeWidth="0.75" 
            strokeDasharray={step === 4 ? "3, 3" : "0"}
          />

          {/* Animated Attack / Packet dots */}
          {step === 0 && (
            <circle r="0.65" fill="#ef4444">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 12 30 L 32 30" />
            </circle>
          )}
          {step === 1 && (
            <circle r="0.7" fill="#ef4444">
              <animateMotion dur="1s" repeatCount="indefinite" path="M 12 30 L 32 30" />
            </circle>
          )}
          {step === 2 && (
            <circle r="0.65" fill="#ef4444">
              <animateMotion dur="1.5s" repeatCount="indefinite" path="M 32 30 L 52 30" />
            </circle>
          )}
          {step === 3 && (
            <circle r="0.65" fill="#ef4444">
              <animateMotion dur="1s" repeatCount="indefinite" path="M 52 30 L 72 20" />
            </circle>
          )}
          {step === 4 && (
            <circle r="0.7" fill="#36e27b">
              <animateMotion dur="1s" repeatCount="indefinite" path="M 72 20 L 80 45" />
            </circle>
          )}

          {/* Nodes */}
          {/* Threat Actor */}
          <g 
            className="cursor-pointer"
            onMouseEnter={() => setHoveredNode("actor")}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle 
              cx="12" cy="30" r="4.5" 
              fill="#131926" stroke="#ef4444" strokeWidth="1"
              className={step === 0 ? "animate-pulse" : ""}
            />
            <text x="12" y="38" fontSize="2.5" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Actor-Tor</text>
            <circle cx="12" cy="30" r="1.5" fill="#ef4444" />
          </g>

          {/* WAF Shield Node */}
          <g 
            className="cursor-pointer"
            onMouseEnter={() => setHoveredNode("waf")}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle 
              cx="32" cy="30" r="4.5" 
              fill="#131926" stroke={step === 1 ? "#ef4444" : "#36e27b"} strokeWidth="1"
              className={step === 1 ? "animate-pulse" : ""}
            />
            <text x="32" y="38" fontSize="2.5" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Edge-WAF</text>
            {step === 1 ? (
              <path d="M 31 29 L 33 31 M 33 29 L 31 31" stroke="#ef4444" strokeWidth="0.5" />
            ) : (
              <path d="M 30.5 29.5 L 32 28.5 L 33.5 29.5 L 33.5 31 C 33.5 32 32 32.5 32 32.5 C 32 32.5 30.5 32 30.5 31 Z" fill="none" stroke="#36e27b" strokeWidth="0.45" />
            )}
          </g>

          {/* API Ingress Gateway */}
          <g 
            className="cursor-pointer"
            onMouseEnter={() => setHoveredNode("gateway")}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle 
              cx="52" cy="30" r="4.5" 
              fill="#131926" stroke={step === 2 ? "#eab308" : "#36e27b"} strokeWidth="1"
            />
            <text x="52" y="38" fontSize="2.5" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">API-Ingress</text>
            <rect x="50.5" y="28.5" width="3" height="3" rx="0.5" fill="none" stroke={step === 2 ? "#eab308" : "#36e27b"} strokeWidth="0.45" />
          </g>

          {/* Auth Pod Service */}
          <g 
            className="cursor-pointer"
            onMouseEnter={() => setHoveredNode("auth")}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle 
              cx="72" cy="20" r="5.5" 
              fill="#131926" 
              stroke={step === 3 ? "#ef4444" : step >= 4 ? "#36e27b" : "#c084fc"} 
              strokeWidth={step === 3 ? "1.5" : "1"}
              className={step === 3 ? "animate-pulse" : ""}
            />
            <text x="72" y="29" fontSize="2.5" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Auth-Svc-Pod</text>
            {step === 3 ? (
              <path d="M 72 17.5 L 72 20.5 M 72 22 L 72 22.5" stroke="#ef4444" strokeWidth="0.55" />
            ) : step >= 4 ? (
              <path d="M 70.5 20 L 71.5 21 L 73.5 19" fill="none" stroke="#36e27b" strokeWidth="0.5" />
            ) : (
              <circle cx="72" cy="20" r="1.5" fill="#c084fc" />
            )}
          </g>

          {/* DB Vault */}
          <g 
            className="cursor-pointer"
            onMouseEnter={() => setHoveredNode("db")}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle 
              cx="80" cy="45" r="4.5" 
              fill="#131926" stroke="#36e27b" strokeWidth="1"
            />
            <text x="80" y="53" fontSize="2.5" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" fontWeight="bold">DB-Vault</text>
            <path d="M 78.5 43.5 L 81.5 43.5 L 81.5 46.5 L 78.5 46.5 Z M 78.5 44.5 L 81.5 44.5 M 78.5 45.5 L 81.5 45.5" fill="none" stroke="#36e27b" strokeWidth="0.45" />
          </g>
        </svg>

        {/* Dynamic Warning alerts overlay */}
        {step === 3 && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-red-950/80 border border-red-500/30 text-red-400 text-[10px] font-mono font-bold px-2 py-1 rounded animate-bounce">
            <ShieldAlert size={10} />
            EXPLOIT ATTEMPT DETECTED
          </div>
        )}
        {step === 4 && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold px-2 py-1 rounded">
            <Lock size={10} />
            CONTAINER NETWORK ISOLATED
          </div>
        )}
        {step === 5 && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-2 py-1 rounded">
            <ShieldCheck size={10} />
            THREAT VECTORS MITIGATED
          </div>
        )}
      </div>

      {/* Simulator Logs Terminal */}
      <div className="mt-4 rounded-2xl border border-white/5 bg-[#070A14] p-4 font-mono text-[11px] leading-relaxed">
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-gray-500 font-bold">
          <span>SIMULATED SECURITY EVENT ORCHESTRATION</span>
          <span className="text-[9px] bg-white/5 px-1.5 py-0.2 rounded text-primary">LOOP ACTIVE</span>
        </div>
        <div className="space-y-1.5 min-h-[50px]">
          {stepsLogs.map((log, index) => {
            if (index > step) return null;
            const isLatest = index === step;
            
            return (
              <div 
                key={index} 
                className={`flex gap-2 transition-all duration-300 ${isLatest ? "text-white font-bold" : "text-gray-500"}`}
              >
                <span className="text-[10px] select-none">{10 + index}s:</span>
                <span className={index === 3 ? "text-red-400" : index === 4 || index === 5 ? "text-emerald-400" : "text-gray-300"}>
                  {isLatest ? "❯ " : ""} {log}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hover Node details panel */}
      <div className="mt-4 h-20 rounded-2xl border border-white/5 bg-[#070A14]/50 flex items-center justify-center p-4">
        {hoveredNode ? (
          <div className="w-full flex justify-between items-center text-xs">
            <div>
              <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-wider">Inspect Node</span>
              <h4 className="font-black text-white">{nodeData[hoveredNode].title}</h4>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-wider">Metrics / Event</span>
              <p className="font-mono font-bold text-primary">{nodeData[hoveredNode].status} • {nodeData[hoveredNode].vector}</p>
            </div>
          </div>
        ) : (
          <p className="text-xs font-mono text-gray-500 italic flex items-center gap-1.5">
            <Info size={12} className="text-gray-400" />
            Hover over nodes in the graph to inspect firewall parameters, live CVE risks, and containment policies.
          </p>
        )}
      </div>

    </div>
  );
}
