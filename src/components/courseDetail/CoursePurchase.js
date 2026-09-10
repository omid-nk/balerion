import { LuShoppingCart } from "react-icons/lu";

export default function CoursePurchase({
  course,
  hasDiscount,
  finalPrice,
  discountPercent,
}) {
  const isFree = course.price === 0;

  return (
    <div className="bg-light dark:bg-dark border-border fixed inset-x-0 bottom-0 z-50 border-t p-3 xl:static xl:sticky xl:top-6 xl:mt-4 xl:rounded-lg xl:border-0 xl:p-5">
      <div className="mx-auto flex max-w-7xl items-center gap-3 xl:block">
        <div className="min-w-0 flex-1 xl:mb-5">
          {isFree ? (
            <div className="flex items-center justify-between gap-3">
              <span className="text-dark/60 dark:text-light/60 text-sm">
                قیمت دوره
              </span>

              <span className="text-base font-bold">رایگان</span>
            </div>
          ) : course.price !== null ? (
            <div className="flex flex-col gap-1.5">
              {hasDiscount && (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-dark/50 dark:text-light/50 text-xs">
                    قیمت اصلی
                  </span>

                  <span className="text-dark/40 dark:text-light/40 text-xs line-through">
                    {course.price.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3">
                <span className="text-dark/60 dark:text-light/60 text-sm">
                  قیمت دوره
                </span>

                <div className="flex items-center gap-2">
                  {hasDiscount && (
                    <span className="bg-primary/10 text-primary rounded-md px-1.5 py-0.5 text-[10px] font-semibold">
                      {discountPercent}٪
                    </span>
                  )}

                  <span className="text-base font-bold">
                    {finalPrice.toLocaleString("fa-IR")}

                    <span className="text-dark/50 dark:text-light/50 mr-1 text-[10px] font-normal">
                      تومان
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <span className="text-dark/60 dark:text-light/60 text-sm">
                قیمت دوره
              </span>

              <span className="text-sm font-semibold">نامشخص</span>
            </div>
          )}
        </div>

        <button
          type="button"
          className="bg-primary hover:bg-primary/90 flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold text-white transition-colors xl:w-full"
        >
          {!isFree && <LuShoppingCart className="size-4" />}

          {isFree ? "ثبت‌نام رایگان" : "افزودن به سبد خرید"}
        </button>
      </div>
    </div>
  );
}
