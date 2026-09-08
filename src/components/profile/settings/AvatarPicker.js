"use client";

import Image from "next/image";
import { LuCheck } from "react-icons/lu";

const SUPABASE_AVATAR_URL =
  "https://pwtqllwxedbqeqnbpxmk.supabase.co/storage/v1/object/public/avatars";

const AVATARS = Array.from(
  { length: 10 },
  (_, index) =>
    `${SUPABASE_AVATAR_URL}/avatar-${String(index + 1).padStart(2, "0")}.jpg`,
);

export default function AvatarPicker({ value, onChange }) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium">تصویر پروفایل</label>

      <div className="grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-10">
        {AVATARS.map((avatar, index) => {
          const isSelected = value === avatar;

          return (
            <button
              key={avatar}
              type="button"
              onClick={() => onChange(avatar)}
              aria-label={`انتخاب آواتار ${index + 1}`}
              className={`group relative aspect-square overflow-hidden rounded-full transition-all duration-200 ${
                isSelected
                  ? "ring-primary dark:ring-offset-dark ring-2 ring-offset-2"
                  : "ring-border ring-1"
              } `}
            >
              <Image
                src={avatar}
                alt={`آواتار ${index + 1}`}
                fill
                sizes="120px"
                className="cursor-pointer object-cover transition-transform duration-200 group-hover:scale-105"
              />

              {isSelected && (
                <span className="bg-primary/25 absolute inset-0 flex items-center justify-center">
                  <span className="bg-primary flex size-7 items-center justify-center rounded-full text-white shadow-lg">
                    <LuCheck className="size-4" strokeWidth={3} />
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
