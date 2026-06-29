export default function Loading() {
  return (
    <div className="bg-lighter dark:bg-darker relative mt-8 flex h-80 items-center justify-center overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-[120px]" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative">
          <div className="border-t-primary dark:border-t-primary h-16 w-16 animate-spin rounded-full border-4 border-zinc-300 dark:border-zinc-700" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            در حال بارگذاری
          </p>

          <span className="text-xs text-zinc-500">لطفاً چند لحظه صبر کنید</span>
        </div>
      </div>
    </div>
  );
}
