"use client";

import { usePathname, useRouter } from "next/navigation";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function Pagination({ page, totalPages, queryParams = {} }) {
  const router = useRouter();
  const pathname = usePathname();

  if (totalPages <= 1) {
    return null;
  }

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    const params = new URLSearchParams();

    params.set("page", String(newPage));

    Object.entries(queryParams).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "all"
      ) {
        params.set(key, String(value));
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  }

  const visiblePages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  ).filter((pageNumber) => {
    if (totalPages <= 7) {
      return true;
    }

    return (
      pageNumber === 1 ||
      pageNumber === totalPages ||
      Math.abs(pageNumber - page) <= 1
    );
  });

  return (
    <nav
      aria-label="صفحه‌بندی"
      className="mt-7 flex items-center justify-center"
    >
      <div className="bg-light dark:bg-dark dark:border-light/5 flex items-center gap-1 rounded-xl p-1.5">
        <button
          type="button"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          aria-label="صفحه قبلی"
          className="text-dark/60 dark:text-light/60 hover:bg-dark/5 dark:hover:bg-light/5 flex size-10 items-center justify-center rounded-lg transition-all hover:text-current disabled:pointer-events-none disabled:opacity-30"
        >
          <LuChevronRight size={17} />
        </button>

        <div className="flex items-center gap-1">
          {visiblePages.map((pageNumber, index) => {
            const previousPage = visiblePages[index - 1];

            const showDots = previousPage && pageNumber - previousPage > 1;

            return (
              <div key={pageNumber} className="flex items-center gap-1">
                {showDots && (
                  <span className="text-dark/30 dark:text-light/30 flex size-9 items-center justify-center text-xs">
                    •••
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => handlePageChange(pageNumber)}
                  aria-current={pageNumber === page ? "page" : undefined}
                  className={`mx-1 flex size-8 items-center justify-center rounded-lg pt-1 text-sm font-medium transition-all ${
                    pageNumber === page
                      ? "bg-primary text-white "
                      : "text-dark/60 dark:text-light/60 hover:bg-dark/5 dark:hover:bg-light/5 hover:text-dark dark:hover:text-light"
                  }`}
                >
                  {pageNumber}
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="صفحه بعدی"
          className="text-dark/60 dark:text-light/60 hover:bg-dark/5 dark:hover:bg-light/5 flex size-10 items-center justify-center rounded-lg transition-all hover:text-current disabled:pointer-events-none disabled:opacity-30"
        >
          <LuChevronLeft size={17} />
        </button>
      </div>
    </nav>
  );
}
