"use client";

import { useState } from "react";
import { LuEye, LuEyeOff, LuLock } from "react-icons/lu";

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <LuLock className="text-dark/40 dark:text-light/40 pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2" />

        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          dir="ltr"
          className="border-border text-dark dark:text-light placeholder:text-dark/30 dark:placeholder:text-light/30 focus:border-primary focus:ring-primary/10 w-full rounded-xl border bg-transparent py-3 pr-11 pl-11 text-sm transition outline-none focus:ring-2"
        />

        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
          className="text-dark/40 dark:text-light/40 hover:text-dark dark:hover:text-light absolute top-1/2 left-3 flex size-7 -translate-y-1/2 items-center justify-center"
        >
          {visible ? (
            <LuEyeOff className="size-5" />
          ) : (
            <LuEye className="size-5" />
          )}
        </button>
      </div>
    </div>
  );
}
