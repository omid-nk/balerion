import Link from "next/link";

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.title}-${index}`}
              className="flex items-center gap-2 select-none"
            >
              {index > 0 && (
                <span className="text-dark/30 dark:text-light/30">/</span>
              )}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-dark/60 hover:text-primary dark:text-light/60 transition-colors"
                >
                  {item.title}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? "text-dark dark:text-light"
                      : "text-dark/60 dark:text-light/60"
                  }
                >
                  {item.title}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
