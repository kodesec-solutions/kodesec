"use client";

import React, { useState, useEffect } from "react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNotify = () => {
    if (email && email.includes("@")) {
      setShowSuccess(true);
      setEmail("");
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  const services = [
    {
      icon: "💻",
      title: "Web & App Development",
      description:
        "Custom web applications and mobile solutions built with cutting-edge technologies",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "🛡️",
      title: "Security Solutions",
      description:
        "Comprehensive penetration testing, vulnerability assessments and security audits",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "✅",
      title: "Quality Assurance",
      description:
        "End-to-end quality assurance with automated and manual testing strategies",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
            animation: "grid 20s linear infinite",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            top: "10%",
            left: "10%",
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30
              }px)`,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            top: "50%",
            right: "10%",
            transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * 25
              }px)`,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full opacity-20 blur-3xl"
          style={{
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            bottom: "10%",
            left: "40%",
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * -20
              }px)`,
            transition: "transform 0.5s ease-out",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 md:px-8">
        {/* Logo with glow effect */}
        <div className="mb-8 animate-slideDown">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
              KODESEC
            </h1>
            <div className="absolute inset-0 blur-2xl opacity-50 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500" />
          </div>
          <div className="text-center text-sm md:text-base text-purple-300 mt-2 tracking-widest">
            SOLUTIONS
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 animate-fadeIn max-w-5xl leading-tight">
          Crafting Digital
          <span className="block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Excellence
          </span>
        </h2>

        {/* Subheading */}
        <p
          className="text-lg md:text-xl text-gray-400 text-center max-w-3xl mb-12 animate-fadeIn leading-relaxed px-4"
          style={{ animationDelay: "0.2s" }}
        >
          Transforming ideas into secure, scalable, and stunning digital
          experiences through innovative development and rigorous testing
        </p>

        {/* Services Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl w-full px-4 animate-fadeIn"
          style={{ animationDelay: "0.4s" }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:border-purple-500/50 cursor-pointer overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className="text-center max-w-2xl w-full px-4 animate-fadeIn"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold mb-4">
              🚀 LAUNCHING SOON
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join the Waitlist
            </h3>

            <p className="text-gray-400 mb-8">
              Be among the first to experience our services. Get exclusive early
              access and special launch offers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleNotify()}
                placeholder="your.email@example.com"
                className="flex-1 px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-500 outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300"
              />
              <button
                onClick={handleNotify}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-bold text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Notify Me
              </button>
            </div>

            {showSuccess && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-4 text-green-400 animate-fadeIn">
                ✓ Success! You're on the list. We'll notify you at launch.
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        {/*<div
          className="flex gap-4 mt-12 animate-fadeIn"
          style={{ animationDelay: "0.8s" }}
        >
          {["LinkedIn", "Twitter", "GitHub", "Email"].map((platform, index) => (
            <button
              key={index}
              className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              title={platform}
            >
              {index === 0 && "💼"}
              {index === 1 && "🐦"}
              {index === 2 && "⚡"}
              {index === 3 && "✉️"}
            </button>
          ))}
        </div>*/}

        {/* Footer */}
        <div
          className="mt-16 text-center text-gray-500 text-sm animate-fadeIn"
          style={{ animationDelay: "1s" }}
        >
          <p>© 2025 KodeSec Solutions. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes grid {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        .animate-slideDown {
          animation: slideDown 1s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out backwards;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </div>
  );
}
