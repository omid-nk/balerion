"use client";

import { useState } from "react";
import { LuPlus, LuTrash2 } from "react-icons/lu";

export default function FormPrerequisites({
  name = "prerequisites",
  label = "پیش‌نیازهای دوره",
  description = "",
  defaultValue = [],
  disabled = false,
}) {
  const [items, setItems] = useState(
    Array.isArray(defaultValue) && defaultValue.length > 0
      ? defaultValue
      : [{ name: "", slug: "" }],
  );

  function updateItem(index, field, value) {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  }

  function addItem() {
    setItems((current) => [
      ...current,
      {
        name: "",
        slug: "",
      },
    ]);
  }

  function removeItem(index) {
    setItems((current) => {
      if (current.length === 1) {
        return [
          {
            name: "",
            slug: "",
          },
        ];
      }

      return current.filter((_, itemIndex) => itemIndex !== index);
    });
  }

  const cleanedItems = items
    .map((item) => ({
      name: String(item?.name || "").trim(),
      slug: String(item?.slug || "").trim(),
    }))
    .filter((item) => item.name);

  return (
    <div>
      <div className="mb-2 px-1">
        <label className="block text-sm font-medium">{label}</label>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="border-border bg-background dark:bg-dark/50 grid grid-cols-1 gap-3 rounded-xl border p-3 sm:grid-cols-[1fr_1fr_auto]"
          >
            <div>
              <label
                htmlFor={`${name}-name-${index}`}
                className="mb-2 block px-1 text-xs font-medium"
              >
                نام پیش‌نیاز
              </label>

              <input
                id={`${name}-name-${index}`}
                type="text"
                value={item.name}
                disabled={disabled}
                placeholder="مثلاً HTML"
                onChange={(event) =>
                  updateItem(index, "name", event.target.value)
                }
                className="border-border bg-background dark:bg-dark/50 focus:border-primary w-full rounded-xl border px-4 py-3 text-sm transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor={`${name}-slug-${index}`}
                className="mb-2 block px-1 text-xs font-medium"
              >
                اسلاگ
              </label>

              <input
                id={`${name}-slug-${index}`}
                type="text"
                value={item.slug}
                disabled={disabled}
                dir="ltr"
                placeholder="html-tutorial"
                onChange={(event) =>
                  updateItem(index, "slug", event.target.value)
                }
                className="border-border bg-background dark:bg-dark/50 focus:border-primary w-full rounded-xl border px-4 py-3 text-sm transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => removeItem(index)}
                disabled={disabled}
                aria-label="حذف پیش‌نیاز"
                className="flex h-[46px] w-full items-center justify-center rounded-xl border border-red-500/20 text-red-500 transition-all hover:bg-red-500/5 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 sm:w-[46px]"
              >
                <LuTrash2 size={17} aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          disabled={disabled}
          className="border-primary/20 text-primary hover:bg-primary/5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-3 text-sm font-medium transition-all active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50"
        >
          <LuPlus size={17} aria-hidden="true" />
          افزودن پیش‌نیاز
        </button>
      </div>

      <input
        type="hidden"
        name={name}
        value={JSON.stringify(cleanedItems)}
        readOnly
      />

      {description && (
        <p className="text-dark/40 dark:text-light/40 mt-2 px-1 text-[11px] leading-5">
          {description}
        </p>
      )}
    </div>
  );
}
