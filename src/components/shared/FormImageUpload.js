"use client";

import { useEffect, useRef, useState } from "react";
import { LuImage, LuLoaderCircle, LuTrash2, LuUpload } from "react-icons/lu";

import {
  deleteCourseCover,
  uploadCourseCoverTemp,
  getCourseCoverUrl,
} from "@/services/storage/course-covers";
import Image from "next/image";

export default function FormImageUpload({
  label,
  name,
  value = "",
  description = "",
  error = "",
  disabled = false,
  required = false,
  onChange,
  onUploadingChange,
  className = "",
}) {
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [internalError, setInternalError] = useState("");

  const inputRef = useRef(null);
  const previewRef = useRef("");
  const uploadedPathRef = useRef("");

  const hasError = Boolean(error || internalError);
  const isBusy = disabled || uploading || deleting;

  useEffect(() => {
    uploadedPathRef.current = value || "";

    if (!value) {
      setPreview("");
      previewRef.current = "";
      return;
    }

    if (String(value).startsWith("blob:")) {
      setPreview(value);
      previewRef.current = value;
      return;
    }

    const publicUrl = getCourseCoverUrl(value);

    setPreview(publicUrl);
    previewRef.current = publicUrl;
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, []);

  function setPreviewUrl(url) {
    if (
      previewRef.current &&
      previewRef.current !== url &&
      previewRef.current.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewRef.current);
    }

    previewRef.current = url || "";
    setPreview(url || "");
  }

  function setUploadState(nextState) {
    setUploading(nextState);
    onUploadingChange?.(nextState);
  }

  async function handleFile(file) {
    if (!file || isBusy) return;

    setInternalError("");

    let newPreview = "";

    try {
      newPreview = URL.createObjectURL(file);

      /*
       * مهم:
       * اینجا preview قبلی را حذف نمی‌کنیم.
       *
       * تا وقتی upload موفق نشده، تصویر قبلی باید
       * کاملاً قابل برگشت باقی بماند.
       */
      setPreview(newPreview);

      setUploadState(true);

      const previousPath = uploadedPathRef.current;

      const result = await uploadCourseCoverTemp(file);

      if (!result?.path) {
        throw new Error("مسیر تصویر آپلودشده دریافت نشد.");
      }

      const newPath = result.path;

      /*
       * آپلود موفق شده.
       *
       * حالا مقدار فرم را تغییر می‌دهیم.
       */
      uploadedPathRef.current = newPath;

      onChange?.({
        target: {
          name,
          value: newPath,
        },
      });

      /*
       * حالا که تصویر جدید کاملاً آماده است،
       * preview قبلی را آزاد می‌کنیم.
       */
      const previousPreview = previewRef.current;

      if (
        previousPreview &&
        previousPreview !== newPreview &&
        previousPreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(previousPreview);
      }

      previewRef.current = newPreview;

      /*
       * تصویر قبلی را بعد از موفقیت آپلود تصویر جدید حذف می‌کنیم.
       *
       * اگر حذف fail شود، تصویر جدید همچنان معتبر است.
       */
      if (previousPath && previousPath !== newPath) {
        try {
          await deleteCourseCover(previousPath);
        } catch (cleanupError) {
          console.error("Previous course cover cleanup error:", cleanupError);
        }
      }
    } catch (error) {
      console.error("Course cover upload error:", error);

      /*
       * تصویر جدید fail شده؛
       * بنابراین preview جدید را حذف می‌کنیم
       * و تصویر قبلی را دست‌نخورده نگه می‌داریم.
       */
      if (newPreview && newPreview.startsWith("blob:")) {
        URL.revokeObjectURL(newPreview);
      }

      /*
       * چون preview قبلی هنوز در previewRef نگهداری شده،
       * فقط state را دوباره روی آن می‌گذاریم.
       */
      setPreview(previewRef.current || "");

      setInternalError(error?.message || "آپلود تصویر دوره با خطا مواجه شد.");
    } finally {
      setUploadState(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function handleInputChange(event) {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();

    if (!isBusy) {
      event.dataTransfer.dropEffect = "copy";
    }
  }

  function handleDrop(event) {
    event.preventDefault();

    if (isBusy) return;

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  }

  function handleSelectClick() {
    if (isBusy) return;

    inputRef.current?.click();
  }

  async function handleRemove(event) {
    event.stopPropagation();

    if (isBusy) return;

    const currentPath = uploadedPathRef.current;

    if (!currentPath) {
      setPreviewUrl("");
      setInternalError("");

      onChange?.({
        target: {
          name,
          value: "",
        },
      });

      return;
    }

    try {
      setInternalError("");
      setDeleting(true);

      await deleteCourseCover(currentPath);

      /*
       * فقط اگر حذف Storage موفق بود،
       * مقدار فرم را خالی می‌کنیم.
       */
      uploadedPathRef.current = "";

      onChange?.({
        target: {
          name,
          value: "",
        },
      });

      setPreviewUrl("");
    } catch (error) {
      console.error("Course cover delete error:", error);

      /*
       * اگر حذف fail شد، فایل و مقدار فرم را نگه می‌داریم.
       */
      setInternalError(error?.message || "حذف تصویر دوره با خطا مواجه شد.");
    } finally {
      setDeleting(false);
    }
  }

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

      <input
        ref={inputRef}
        id={name}
        name={`${name}_file`}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        disabled={isBusy}
        onChange={handleInputChange}
      />

      <input type="hidden" name={name} value={value || ""} readOnly />

      <div
        role="button"
        tabIndex={isBusy ? -1 : 0}
        onClick={handleSelectClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSelectClick();
          }
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-border bg-background dark:bg-dark/50 hover:border-primary/50 relative flex min-h-72 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors ${hasError ? "border-red-500" : ""} ${isBusy ? "cursor-not-allowed opacity-70" : ""} `}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
              width={800}
              height={600}
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex items-center gap-2">
              {uploading || deleting ? (
                <div className="flex items-center gap-2 rounded-xl bg-black/50 px-4 py-3 text-sm text-white backdrop-blur-sm">
                  <LuLoaderCircle
                    size={17}
                    className="animate-spin"
                    aria-hidden="true"
                  />

                  <span>{uploading ? "در حال آپلود..." : "در حال حذف..."}</span>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleSelectClick}
                    disabled={isBusy}
                    className="text-dark flex items-center gap-2 rounded-xl bg-white/90 px-4 py-3 text-sm font-medium transition-all hover:bg-white active:scale-[0.98]"
                  >
                    <LuUpload size={17} aria-hidden="true" />
                    تغییر تصویر
                  </button>

                  <button
                    type="button"
                    onClick={handleRemove}
                    disabled={isBusy}
                    aria-label="حذف تصویر"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/90 text-white transition-all hover:bg-red-500 active:scale-[0.98]"
                  >
                    <LuTrash2 size={17} aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            {uploading ? (
              <>
                <LuLoaderCircle
                  size={30}
                  className="text-primary mb-3 animate-spin"
                  aria-hidden="true"
                />

                <p className="text-sm font-medium">در حال آپلود تصویر...</p>
              </>
            ) : (
              <>
                <div className="bg-primary/10 text-primary mb-3 flex h-12 w-12 items-center justify-center rounded-xl">
                  <LuImage size={22} aria-hidden="true" />
                </div>

                <p className="text-sm font-medium">تصویر دوره را انتخاب کنید</p>

                <p className="text-dark/40 dark:text-light/40 mt-1 text-xs">
                  یا تصویر را اینجا بکشید و رها کنید
                </p>
              </>
            )}
          </>
        )}
      </div>

      {description && !hasError && (
        <p className="text-dark/40 dark:text-light/40 mt-2 px-1 text-[11px] leading-5">
          {description}
        </p>
      )}

      {hasError && (
        <p
          role="alert"
          className="mt-2 px-1 text-[11px] leading-5 text-red-500"
        >
          {error || internalError}
        </p>
      )}
    </div>
  );
}
