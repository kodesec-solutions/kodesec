import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[75vh] flex items-center justify-center bg-background-dark px-6 py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(54,226,123,0.06),transparent_45%)]" />
      
      <div className="relative max-w-md w-full rounded-3xl border border-surface-border bg-surface-dark/70 p-8 text-center backdrop-blur-md shadow-2xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mx-auto mb-6">
          <ShieldAlert size={32} />
        </div>
        
        <h1 className="text-5xl font-black text-secondary tracking-tight font-mono">404</h1>
        
        <h2 className="text-xl font-bold text-white mt-4 tracking-tight">Endpoint Not Found</h2>
        
        <p className="mt-3 text-xs text-gray-400 leading-relaxed font-medium">
          The requested system route or data record could not be resolved. It may have been relocated, or does not exist.
        </p>
        
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-[#0B0F1A] transition-all hover:bg-primary-light hover:shadow-[0_0_15px_rgba(54,226,123,0.3)] cursor-pointer font-mono"
          >
            <ArrowLeft size={14} />
            <span>Return to dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
