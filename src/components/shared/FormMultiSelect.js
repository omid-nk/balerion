"use client";

import { useEffect, useRef, useState } from "react";
import { LuCheck, LuChevronDown, LuX } from "react-icons/lu";

export default function FormMultiSelect({
  label,
  name,
  options = [],
  defaultValue = [],
  placeholder = "انتخاب کنید",
  description = "",
  error = "",
  disabled = false,
  loading = false,
  required = false,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(
    Array.isArray(defaultValue) ? defaultValue.map(String) : [],
  );

  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggleOption(value) {
    const stringValue = String(value);

    setSelected((current) =>
      current.includes(stringValue)
        ? current.filter((item) => item !== stringValue)
        : [...current, stringValue],
    );
  }

  function removeOption(value) {
    setSelected((current) => current.filter((item) => item !== String(value)));
  }

  const selectedOptions = options.filter((option) =>
    selected.includes(String(option.value)),
  );

  const hiddenValue = JSON.stringify(selected);

  return (
    <div ref={containerRef} className="relative">
      <div className="mb-2 px-1">
        <label className="block text-sm font-medium">
          {label}
          {required && <span className="mr-1 text-red-500">*</span>}
        </label>
      </div>

      <button
        type="button"
        disabled={disabled || loading}
        onClick={() => setOpen((current) => !current)}
        className={`border-border bg-light dark:bg-dark focus:border-primary flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
          error ? "border-red-500" : ""
        }`}
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <span
                key={option.value}
                className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium"
              >
                {option.label}

                <span
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeOption(option.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      removeOption(option.value);
                    }
                  }}
                  aria-label={`حذف ${option.label}`}
                  className="hover:bg-primary/10 cursor-pointer rounded-full"
                >
                  <LuX size={13} aria-hidden="true" />
                </span>
              </span>
            ))
          ) : (
            <span className="text-dark/40 dark:text-light/40">
              {loading ? "در حال دریافت دسته‌بندی‌ها..." : placeholder}
            </span>
          )}
        </div>

        <LuChevronDown
          size={18}
          aria-hidden="true"
          className={`text-dark/40 dark:text-light/40 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && !disabled && !loading && (
        <div className="border-border bg-light dark:bg-dark absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border p-2 shadow-lg">
          {options.length > 0 ? (
            options.map((option) => {
              const value = String(option.value);
              const isSelected = selected.includes(value);

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleOption(value)}
                  className="hover:bg-primary/5 flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-right text-sm transition-colors"
                >
                  <span>{option.label}</span>

                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      isSelected
                        ? "border-primary bg-primary text-white"
                        : "border-border"
                    }`}
                  >
                    {isSelected && <LuCheck size={14} aria-hidden="true" />}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="text-dark/40 dark:text-light/40 px-3 py-3 text-center text-xs">
              دسته‌بندی‌ای وجود ندارد.
            </div>
          )}
        </div>
      )}

      <input type="hidden" name={name} value={hiddenValue} readOnly />

      {error ? (
        <p className="mt-2 px-1 text-[11px] text-red-500">{error}</p>
      ) : description ? (
        <p className="text-dark/40 dark:text-light/40 mt-2 px-1 text-[11px] leading-5">
          {description}
        </p>
      ) : null}
    </div>
  );
}
