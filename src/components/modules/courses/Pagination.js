import Link from "next/link";

export default function Pagination({ currentPage, totalPages, basePath }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    const add = (p) => {
      if (p > 0 && p <= totalPages) pages.push(p);
    };

    add(1);

    if (currentPage > 3) pages.push("...");

    add(currentPage - 1);
    add(currentPage);
    add(currentPage + 1);

    if (currentPage < totalPages - 2) pages.push("...");

    add(totalPages);

    return [...new Set(pages)];
  };

  const pages = getPages();

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {/* Prev */}
      <Link
        href={`${basePath}?page=${currentPage - 1}`}
        className={`rounded-xl border px-4 py-2 transition ${
          currentPage <= 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-gray-100"
        }`}
      >
        قبلی
      </Link>

      {/* Pages */}
      <div className="flex items-center gap-2">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <Link
              key={i}
              href={`${basePath}?page=${p}`}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                currentPage === p
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {p}
            </Link>
          ),
        )}
      </div>

      {/* Next */}
      <Link
        href={`${basePath}?page=${currentPage + 1}`}
        className={`rounded-xl border px-4 py-2 transition ${
          currentPage >= totalPages
            ? "pointer-events-none opacity-40"
            : "hover:bg-gray-100"
        }`}
      >
        بعدی
      </Link>
    </div>
  );
}
