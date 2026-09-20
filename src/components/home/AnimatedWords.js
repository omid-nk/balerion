"use client";

import { useEffect, useState } from "react";

const words = ["برنامه‌نویسی", "فرانت‌اند", "بک‌اند", "امنیت", "هوش مصنوعی"];

const mistakes = [
  "ا",
  "ب",
  "پ",
  "ت",
  "ج",
  "د",
  "ر",
  "س",
  "ش",
  "ک",
  "ل",
  "م",
  "ن",
  "و",
  "ی",
];

const randomDelay = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default function AnimatedWords() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFixing, setIsFixing] = useState(false);

  const currentWord = words[wordIndex];

  useEffect(() => {
    let timeout;

    if (isFixing) {
      timeout = setTimeout(
        () => {
          setDisplayed((prev) => prev.slice(0, -1));
          setIsFixing(false);
        },
        randomDelay(120, 250),
      );

      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      timeout = setTimeout(
        () => {
          setDisplayed((prev) => prev.slice(0, -1));
        },
        randomDelay(45, 80),
      );

      return () => clearTimeout(timeout);
    }

    if (displayed === currentWord) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1200);

      return () => clearTimeout(timeout);
    }

    timeout = setTimeout(
      () => {
        const shouldMakeMistake =
          displayed.length > 1 &&
          displayed.length < currentWord.length - 1 &&
          Math.random() < 0.13;

        if (shouldMakeMistake) {
          const randomChar =
            mistakes[Math.floor(Math.random() * mistakes.length)];

          setDisplayed((prev) => prev + randomChar);
          setIsFixing(true);
          return;
        }

        setDisplayed(currentWord.slice(0, displayed.length + 1));
      },
      randomDelay(70, 150),
    );

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, isFixing, currentWord]);

  useEffect(() => {
    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }
  }, [displayed, isDeleting]);

  return (
    <span className="bg-primary/5 text-primary border-border relative ml-3 inline-block border px-2.5 py-2 font-bold">
      {displayed}

      <span className="text-dark dark:text-light mr-2 animate-pulse">|</span>

      <span className="absolute -top-1 -left-1 block h-1.5 w-1.5 bg-zinc-400" />
      <span className="absolute -top-1 -right-1 block h-1.5 w-1.5 bg-zinc-400" />
      <span className="absolute -bottom-1 -left-1 block h-1.5 w-1.5 bg-zinc-400" />
      <span className="absolute -right-1 -bottom-1 block h-1.5 w-1.5 bg-zinc-400" />
    </span>
  );
}
