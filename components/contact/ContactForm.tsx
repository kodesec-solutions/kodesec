"use client";

import React, { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { contactConfig } from "@/config/site";
import { ArrowRight } from "lucide-react";

export default function ContactForm() {
  const inquiryTypes = contactConfig.inquiryTypes;
  const [selectedInquiry, setSelectedInquiry] = useState(inquiryTypes[0].id);
  const [projectStage, setProjectStage] = useState("Concept");
  const [result, setResult] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setResult("Sending...");
    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        setResult("Missing access key configuration");
        return;
      }

      const formData = new FormData(form);
      formData.append("access_key", accessKey);
      formData.append("service_interest", selectedInquiry);
      formData.append("project_stage", projectStage);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data && data.success) {
        setResult("");
        toast.success("Message sent successfully!", { duration: 2500 });
        form.reset();
      } else {
        setResult(data?.message || "Error submitting form");
      }
    } catch (err) {
      setResult("Network error, please try again.");
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-12 items-start text-left">
      {/* Left Col: Inquiry Type Selector */}
      <div className="lg:col-span-5 space-y-4">
        <div className="text-left mb-6">
          <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">
            STEP ONE
          </span>
          <h2 className="text-2xl font-black text-white mt-1">Select Inquiry Type</h2>
          <p className="text-xs text-gray-400 mt-2">
            Choose a service to configure our contact form.
          </p>
        </div>

        <div className="space-y-3">
          {inquiryTypes.map((type) => {
            const Icon = type.icon;
            const isActive = selectedInquiry === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedInquiry(type.id)}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(54,226,123,0.08)]"
                    : "border-white/5 bg-[#0F1424]/30 hover:border-white/10 hover:bg-[#0F1424]/60"
                }`}
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isActive ? "bg-primary text-black" : "bg-white/[0.02] border border-white/10 text-primary"
                }`}>
                  <Icon size={16} />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isActive ? "text-white" : "text-gray-300"}`}>{type.label}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{type.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Col: Smart Contact Form */}
      <div className="lg:col-span-7 bg-[#0F1424]/40 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md">
        <div className="text-left mb-6 border-b border-white/5 pb-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-accent-cyan tracking-widest uppercase">
              CONFIGURED SERVICE
            </span>
            <p className="text-lg font-black text-white mt-0.5">{selectedInquiry}</p>
          </div>
          <div className="hidden sm:block px-3 py-1 rounded border border-white/10 bg-white/5 text-[9px] font-mono text-gray-400">
            SECURE_CHANNEL
          </div>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="flex flex-col text-left gap-2">
              <span className="text-xs font-mono font-bold text-gray-400">Full Name</span>
              <input
                required
                name="name"
                type="text"
                placeholder="Jane Doe"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#0B0F1A]/50 px-4 text-xs text-white placeholder:text-gray-600 focus:border-primary focus:outline-none transition-colors"
              />
            </label>

            <label className="flex flex-col text-left gap-2">
              <span className="text-xs font-mono font-bold text-gray-400">Work Email</span>
              <input
                required
                name="email"
                type="email"
                placeholder="jane@company.com"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#0B0F1A]/50 px-4 text-xs text-white placeholder:text-gray-600 focus:border-primary focus:outline-none transition-colors"
              />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="flex flex-col text-left gap-2">
              <span className="text-xs font-mono font-bold text-gray-400">Company Name</span>
              <input
                required
                name="company"
                type="text"
                placeholder="Acme Corp"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#0B0F1A]/50 px-4 text-xs text-white placeholder:text-gray-600 focus:border-primary focus:outline-none transition-colors"
              />
            </label>

            <div className="flex flex-col text-left gap-2">
              <span className="text-xs font-mono font-bold text-gray-400">Project Stage</span>
              <div className="flex h-11 border border-white/10 bg-[#0B0F1A]/50 rounded-xl overflow-hidden p-1 gap-1">
                {["Concept", "Dev", "Prod", "Audit"].map((stage) => {
                  const active = projectStage === stage;
                  return (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => setProjectStage(stage)}
                      className={`flex-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                        active ? "bg-primary text-black" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {stage}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <label className="flex flex-col text-left gap-2">
            <span className="text-xs font-mono font-bold text-gray-400">Brief Scope & Requirements</span>
            <textarea
              required
              name="message"
              rows={4}
              placeholder="Provide details about your project requirements or expected timeline..."
              className="w-full rounded-xl border border-white/10 bg-[#0B0F1A]/50 p-4 text-xs text-white placeholder:text-gray-600 focus:border-primary focus:outline-none transition-colors resize-none"
            />
          </label>

          <button
            type="submit"
            className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary text-xs font-bold text-[#0B0F1A] transition-all hover:bg-primary-light hover:shadow-[0_0_15px_rgba(54,226,123,0.3)] cursor-pointer font-mono"
          >
            <span>Send Inquiry</span>
            <ArrowRight size={14} />
          </button>

          {result && (
            <p className="text-center text-xs text-gray-400 font-mono animate-pulse" aria-live="polite">
              {result}
            </p>
          )}

          <p className="text-center text-[10px] text-gray-500 font-mono">
            Submitted data is directly reviewed by founders.
          </p>
        </form>
      </div>
    </div>
  );
}
