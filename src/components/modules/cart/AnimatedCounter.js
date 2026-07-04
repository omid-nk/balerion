"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

export default function AnimatedCounter({
  value,
  duration = 0.45,
  locale = "fa-IR",
}) {
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);

  useEffect(() => {
    const controls = animate(previous.current, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        setDisplay(Math.round(latest));
      },
    });

    previous.current = value;

    return () => controls.stop();
  }, [value, duration]);

  return <>{display.toLocaleString(locale)}</>;
}
