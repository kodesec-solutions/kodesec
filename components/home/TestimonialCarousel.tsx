"use client";

import React, { useState, useEffect } from "react";
import { testimonialsConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export default function TestimonialCarousel() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsConfig.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-4xl text-center relative">
      <div className="flex justify-center gap-1 text-primary mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>

      <div className="min-h-[160px] flex items-center justify-center">
        {testimonialsConfig.map((testimonial, idx) => (
          <div
            key={idx}
            className={cn(
              "transition-all duration-500 absolute inset-x-0 mx-auto max-w-2xl px-4",
              idx === activeTestimonial
                ? "opacity-100 translate-y-0 relative"
                : "opacity-0 translate-y-4 absolute pointer-events-none"
            )}
          >
            <blockquote className="text-lg md:text-xl font-bold leading-relaxed text-white">
              "{testimonial.quote}"
            </blockquote>

            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-xs font-black font-mono text-primary">
                {testimonial.avatar}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-none">{testimonial.author}</p>
                <p className="text-[10px] font-mono text-gray-500 mt-1">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      <div className="mt-8 flex justify-center gap-2">
        {testimonialsConfig.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTestimonial(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
              idx === activeTestimonial ? "w-6 bg-primary" : "w-1.5 bg-white/10 hover:bg-white/30"
            )}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
