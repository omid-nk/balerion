"use client";
import { forwardRef } from "react";
import { LuLoaderCircle } from "react-icons/lu";
const FormInput = forwardRef(function FormInput(
  {
    label,
    name,
    type = "text",
    value,
    defaultValue,
    placeholder = "",
    description = "",
    error = "",
    required = false,
    disabled = false,
    readOnly = false,
    loading = false,
    textarea = false,
    rows = 5,
    dir,
    min,
    max,
    step,
    minLength,
    maxLength,
    prefix,
    suffix,
    icon: Icon,
    iconPosition = "right",
    autoComplete,
    autoFocus,
    className = "",
    inputClassName = "",
    onChange,
    onBlur,
    onFocus,
    ...props
  },
  ref,
) {
  const hasError = Boolean(error);
  const isDisabled = disabled || loading;
  const descriptionId = description ? `${name}-description` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const describedBy = errorId || descriptionId;
  const hasPrefix = Boolean(prefix);
  const hasSuffix = Boolean(suffix);
  const hasIcon = Boolean(Icon);
  const inputPadding = textarea
    ? ""
    : [
        hasPrefix ? "pr-16" : "",
        hasSuffix ? "pl-16" : "",
        hasIcon && iconPosition === "right" ? "pl-11" : "",
        hasIcon && iconPosition === "left" ? "pr-11" : "",
      ]
        .filter(Boolean)
        .join(" ");
  const inputClass = ` border-border bg-background dark:bg-dark/50 focus:border-primary w-full rounded-xl border px-4 py-3 text-sm ring-0 transition-colors outline-none ${textarea ? "resize-y leading-7" : ""} ${inputPadding} ${hasError ? "border-red-500 focus:border-red-500" : ""} ${isDisabled ? "cursor-not-allowed opacity-50" : ""} ${readOnly ? "cursor-default" : ""} ${inputClassName} `;
  const commonProps = {
    id: name,
    name,
    ref,
    value,
    defaultValue,
    placeholder,
    disabled: isDisabled,
    readOnly,
    required,
    dir,
    min,
    max,
    step,
    minLength,
    maxLength,
    autoComplete,
    autoFocus,
    "aria-invalid": hasError,
    "aria-describedby": describedBy,
    onChange,
    onBlur,
    onFocus,
    className: inputClass,
    ...props,
  };
  return (
    <div className={className}>
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
        {hasIcon && iconPosition === "right" && (
          <Icon
            size={17}
            aria-hidden="true"
            className={`pointer-events-none absolute top-1/2 right-4 z-10 -translate-y-1/2 ${hasError ? "text-red-500" : "text-dark/40 dark:text-light/40"}`}
          />
        )}
        {hasIcon && iconPosition === "left" && (
          <Icon
            size={17}
            aria-hidden="true"
            className={`pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 ${hasError ? "text-red-500" : "text-dark/40 dark:text-light/40"}`}
          />
        )}
        {hasPrefix && (
          <span className="text-dark/40 dark:text-light/40 pointer-events-none absolute top-1/2 right-4 z-10 -translate-y-1/2 text-xs">
            {prefix}
          </span>
        )}
        {hasSuffix && (
          <span className="text-dark/40 dark:text-light/40 pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-xs">
            {suffix}
          </span>
        )}
        {textarea ? (
          <textarea {...commonProps} rows={rows} />
        ) : (
          <input {...commonProps} type={type} />
        )}
        {loading && (
          <LuLoaderCircle
            size={17}
            aria-hidden="true"
            className="text-dark/40 dark:text-light/40 pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 animate-spin"
          />
        )}
      </div>
      {description && !error && (
        <p
          id={descriptionId}
          className="text-dark/40 dark:text-light/40 mt-2 px-1 text-[11px] leading-5"
        >
          {description}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 px-1 text-[11px] leading-5 text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
});
export default FormInput;
