"use client";

import { useEffect, useRef, useState } from "react";
import { LuCheck, LuChevronDown, LuLoaderCircle } from "react-icons/lu";

export default function FormSelect({
  label,
  name,
  value,
  defaultValue = "",
  onChange,
  options = [],
  placeholder = "انتخاب کنید",
  description = "",
  error = "",
  disabled = false,
  loading = false,
  required = false,
  className = "",
  icon: Icon,
  ...props
}) {
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const selectedValue = isControlled ? value : internalValue;

  const selectedOption = options.find(
    (option) => String(option.value) === String(selectedValue),
  );

  const hasError = Boolean(error);
  const isDisabled = disabled || loading;

  // بستن dropdown با کلیک خارج
  useEffect(() => {
    function handleClickOutside(event) {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
        setFocusedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // اسکرول روی گزینه فعال
  useEffect(() => {
    if (!open || focusedIndex < 0 || !listRef.current) return;

    const focusedElement = listRef.current.children[focusedIndex];

    focusedElement?.scrollIntoView({
      block: "nearest",
    });
  }, [focusedIndex, open]);

  function getFirstEnabledIndex() {
    return options.findIndex((option) => !option.disabled);
  }

  function getLastEnabledIndex() {
    for (let index = options.length - 1; index >= 0; index--) {
      if (!options[index].disabled) {
        return index;
      }
    }

    return -1;
  }

  function findNextEnabledIndex(startIndex, direction) {
    let index = startIndex;

    while (true) {
      index += direction;

      if (index < 0 || index >= options.length) {
        return -1;
      }

      if (!options[index].disabled) {
        return index;
      }
    }
  }

  function selectOption(option) {
    if (!option || option.disabled || isDisabled) return;

    const nextValue = option.value;

    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.({
      target: {
        name,
        value: nextValue,
      },
    });

    setOpen(false);
    setFocusedIndex(-1);
  }

  function handleKeyDown(event) {
    if (isDisabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();

        if (!open) {
          setOpen(true);

          const selectedIndex = options.findIndex(
            (option) =>
              String(option.value) === String(selectedValue) &&
              !option.disabled,
          );

          setFocusedIndex(
            selectedIndex >= 0 ? selectedIndex : getFirstEnabledIndex(),
          );
        } else if (focusedIndex >= 0) {
          selectOption(options[focusedIndex]);
        }

        break;

      case "ArrowDown":
        event.preventDefault();

        if (!open) {
          setOpen(true);

          const selectedIndex = options.findIndex(
            (option) =>
              String(option.value) === String(selectedValue) &&
              !option.disabled,
          );

          setFocusedIndex(
            selectedIndex >= 0 ? selectedIndex : getFirstEnabledIndex(),
          );

          return;
        }

        setFocusedIndex((currentIndex) => {
          if (currentIndex < 0) {
            return getFirstEnabledIndex();
          }

          const nextIndex = findNextEnabledIndex(currentIndex, 1);

          return nextIndex >= 0 ? nextIndex : currentIndex;
        });

        break;

      case "ArrowUp":
        event.preventDefault();

        if (!open) {
          setOpen(true);

          const selectedIndex = options.findIndex(
            (option) =>
              String(option.value) === String(selectedValue) &&
              !option.disabled,
          );

          setFocusedIndex(
            selectedIndex >= 0 ? selectedIndex : getLastEnabledIndex(),
          );

          return;
        }

        setFocusedIndex((currentIndex) => {
          if (currentIndex < 0) {
            return getLastEnabledIndex();
          }

          const previousIndex = findNextEnabledIndex(currentIndex, -1);

          return previousIndex >= 0 ? previousIndex : currentIndex;
        });

        break;

      case "Home":
        if (open) {
          event.preventDefault();
          setFocusedIndex(getFirstEnabledIndex());
        }
        break;

      case "End":
        if (open) {
          event.preventDefault();
          setFocusedIndex(getLastEnabledIndex());
        }
        break;

      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
          setFocusedIndex(-1);
        }
        break;

      case "Tab":
        setOpen(false);
        setFocusedIndex(-1);
        break;

      default:
        break;
    }
  }

  function handleToggle() {
    if (isDisabled) return;

    if (open) {
      setOpen(false);
      setFocusedIndex(-1);
      return;
    }

    const selectedIndex = options.findIndex(
      (option) =>
        String(option.value) === String(selectedValue) && !option.disabled,
    );

    setFocusedIndex(
      selectedIndex >= 0 ? selectedIndex : getFirstEnabledIndex(),
    );

    setOpen(true);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label htmlFor={name} className="mb-2 block px-1 text-sm font-medium">
          {label}

          {required && (
            <span className="mr-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            aria-hidden="true"
            className={`pointer-events-none absolute top-1/2 right-4 z-10 -translate-y-1/2 ${
              hasError ? "text-red-500" : "text-dark/40 dark:text-light/40"
            }`}
          />
        )}

        <button
          id={name}
          type="button"
          disabled={isDisabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-describedby={
            error
              ? `${name}-error`
              : description
                ? `${name}-description`
                : undefined
          }
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={`group bg-background dark:bg-dark/50 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm transition-all outline-none ${
            Icon ? "pr-11" : ""
          } ${
            open
              ? hasError
                ? "border-red-500"
                : "border-primary ring-primary/10 ring-2"
              : hasError
                ? "border-red-500"
                : "border-border hover:border-dark/20 dark:hover:border-light/20"
          } ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          {...props}
        >
          <span
            className={`min-w-0 flex-1 text-right ${
              selectedOption
                ? "text-dark dark:text-light"
                : "text-dark/40 dark:text-light/40"
            }`}
          >
            {selectedOption?.label || placeholder}
          </span>

          <span className="pointer-events-none mr-3 flex shrink-0 items-center">
            {loading ? (
              <LuLoaderCircle
                size={17}
                className="text-dark/40 dark:text-light/40 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <LuChevronDown
                size={18}
                aria-hidden="true"
                className={`text-dark/40 dark:text-light/40 transition-transform duration-200 ${
                  open ? "text-primary rotate-180" : ""
                }`}
              />
            )}
          </span>
        </button>

        <div
          className={`border-border bg-light dark:bg-dark absolute top-[calc(100%+8px)] right-0 left-0 z-50 origin-top overflow-hidden rounded-xl border shadow-xl shadow-black/10 transition-all duration-200 dark:shadow-black/30 ${
            open
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-[0.98] opacity-0"
          }`}
        >
          <div
            ref={listRef}
            role="listbox"
            aria-label={label || name}
            className="max-h-64 overflow-y-auto p-1.5"
          >
            {options.length === 0 ? (
              <div className="text-dark/40 dark:text-light/40 px-4 py-3 text-center text-xs">
                گزینه‌ای وجود ندارد
              </div>
            ) : (
              options.map((option, index) => {
                const isSelected =
                  String(option.value) === String(selectedValue);

                const isFocused = index === focusedIndex;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={option.disabled}
                    tabIndex={-1}
                    onMouseEnter={() => {
                      if (!option.disabled) {
                        setFocusedIndex(index);
                      }
                    }}
                    onClick={() => selectOption(option)}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-right text-sm transition-colors ${
                      option.disabled
                        ? "cursor-not-allowed opacity-40"
                        : isSelected
                          ? "bg-primary/10 text-primary"
                          : isFocused
                            ? "bg-dark/5 text-dark dark:bg-light/5 dark:text-light"
                            : "text-dark dark:text-light hover:bg-dark/5 dark:hover:bg-light/5"
                    }`}
                  >
                    <span className="min-w-0 flex-1">{option.label}</span>

                    {isSelected && !option.disabled && (
                      <LuCheck
                        size={17}
                        className="text-primary shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      <input type="hidden" name={name} value={selectedValue ?? ""} />

      {description && !error && (
        <p
          id={`${name}-description`}
          className="text-dark/40 dark:text-light/40 mt-2 px-1 text-[11px] leading-5"
        >
          {description}
        </p>
      )}

      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-2 px-1 text-[11px] leading-5 text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}
