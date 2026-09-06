"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const words = ["برنامه‌نویسی", "فرانت‌اند", "بک‌اند", "امنیت", "هوش مصنوعی"];

export default function AnimatedWords() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[wordIndex];

  useEffect(() => {
    const typingSpeed = isDeleting ? 60 : 120;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentWord.slice(0, displayed.length + 1);

        setDisplayed(nextText);

        if (nextText === currentWord) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1000);
        }
      } else {
        const nextText = currentWord.slice(0, displayed.length - 1);

        setDisplayed(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentWord]);

  return (
    <motion.span
      className="bg-primary/5 text-primary border-border relative ml-3 inline-block border px-2.5 py-2 font-bold"
      initial={{ opacity: 0.7, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {displayed}

      <span className="text-dark dark:text-light mr-2 animate-pulse">|</span>

      {/* Decorative corners */}
      <span className="absolute -top-1 -left-1 block h-1.5 w-1.5 bg-zinc-400" />
      <span className="absolute -top-1 -right-1 block h-1.5 w-1.5 bg-zinc-400" />
      <span className="absolute -bottom-1 -left-1 block h-1.5 w-1.5 bg-zinc-400" />
      <span className="absolute -right-1 -bottom-1 block h-1.5 w-1.5 bg-zinc-400" />
    </motion.span>
  );
}
