"use client";

import React, { useEffect, useState } from "react";

interface TypingTextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  delayBetween?: number;
  highlightDelay?: number;
  className?: string;
}

export default function TypingText({
  texts,
  speed = 80,
  deleteSpeed = 60,
  delayBetween = 2000,
  highlightDelay = 1500,
  className = "",
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isHighlightPause, setIsHighlightPause] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentText = texts[textIndex];

    if (isWaiting) {
      timer = setTimeout(() => {
        setIsWaiting(false);
        setIsHighlightPause(true);
      }, delayBetween);
    } else if (isHighlightPause) {
      timer = setTimeout(() => {
        setIsHighlightPause(false);
        setIsDeleting(true);
      }, highlightDelay);
    } else if (isDeleting) {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        setCharIndex(0);
      }
    } else {
      if (charIndex < currentText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, speed);
      } else {
        setIsWaiting(true);
      }
    }

    return () => clearTimeout(timer);
  }, [
    charIndex,
    isDeleting,
    isWaiting,
    isHighlightPause,
    textIndex,
    texts,
    speed,
    deleteSpeed,
    delayBetween,
    highlightDelay,
  ]);

  const currentText = texts[textIndex];
  const selectedText = currentText.substring(charIndex);

  return (
    <span className={className}>
      <span>{displayText}</span>
      <span className="inline-block relative">
        <span className="animate-blink text-teal-400">|</span>
      </span>
      {(isDeleting || isHighlightPause) && selectedText && (
        <span className="bg-teal-500/30 text-teal-100">{selectedText}</span>
      )}
    </span>
  );
}
