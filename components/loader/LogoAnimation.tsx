"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LogoAnimation() {
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" as const },
        opacity: { duration: 0.2 }
      }
    }
  };

  const centerKVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.5, duration: 1.2, ease: "easeInOut" as const },
        opacity: { delay: 0.5, duration: 0.2 }
      }
    }
  };

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Outer Glow behind the logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1.1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" as const }}
        className="absolute w-36 h-36 rounded-full bg-primary blur-3xl pointer-events-none"
      />

      <svg
        viewBox="0 0 400 400"
        className="w-full h-full text-white dark:text-white light:text-black fill-none stroke-current stroke-[2]"
      >
        {/* Defining gradients */}
        <defs>
          <linearGradient id="shield-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#36E27B" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="k-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
        </defs>

        {/* 1. Outer Protective Shield Wireframe */}
        <motion.path
          d="M 200 80 L 290 125 V 230 C 290 295 200 345 200 345 C 200 345 110 295 110 230 V 125 Z"
          stroke="url(#shield-grad)"
          strokeWidth="3"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        />

        {/* 2. Cybernetic Inner 'K' representation */}
        {/* Spine */}
        <motion.path
          d="M 175 140 V 280"
          stroke="url(#k-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          variants={centerKVariants}
          initial="hidden"
          animate="visible"
        />
        {/* Upper diagonal */}
        <motion.path
          d="M 175 210 L 235 150"
          stroke="url(#k-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          variants={centerKVariants}
          initial="hidden"
          animate="visible"
        />
        {/* Lower diagonal */}
        <motion.path
          d="M 175 210 L 235 270"
          stroke="url(#k-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          variants={centerKVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Nodes connecting the K limbs */}
        <motion.circle
          cx="175" cy="140" r="4.5"
          fill="#050810"
          stroke="#C084FC"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.3 }}
        />
        <motion.circle
          cx="175" cy="280" r="4.5"
          fill="#050810"
          stroke="#C084FC"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.3 }}
        />
        <motion.circle
          cx="235" cy="150" r="4.5"
          fill="#050810"
          stroke="#22D3EE"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.3 }}
        />
        <motion.circle
          cx="235" cy="270" r="4.5"
          fill="#050810"
          stroke="#22D3EE"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.3 }}
        />
        <motion.circle
          cx="175" cy="210" r="5"
          fill="#050810"
          stroke="#36E27B"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.3 }}
        />
      </svg>
    </div>
  );
}
