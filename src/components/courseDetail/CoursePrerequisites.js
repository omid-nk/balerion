import Link from "next/link";

export default function CoursePrerequisites({ prerequisites }) {
  return (
    <div className="bg-light dark:bg-dark mt-4 rounded-lg p-5 select-none">
      <h3 className="font-morabba text-dark dark:text-light mb-4 text-base font-bold">
        پیش‌نیازهای دوره
      </h3>

      {prerequisites?.length > 0 ? (
        <div className="flex flex-col">
          {prerequisites.map((prerequisite, index) => {
            const content = (
              <div className="flex items-center gap-3 py-3">
                <span
                  className={`min-w-0 flex-1 text-sm font-medium ${
                    prerequisite.slug
                      ? "text-dark dark:text-light group-hover:text-primary transition-colors"
                      : "text-dark dark:text-light"
                  }`}
                >
                  {prerequisite.name}
                </span>

                {prerequisite.slug && (
                  <span className="text-dark/30 dark:text-light/30 text-sm">
                    ←
                  </span>
                )}
              </div>
            );

            if (prerequisite.slug) {
              return (
                <Link
                  key={`${prerequisite.name}-${index}`}
                  href={`/course/${prerequisite.slug}`}
                  className="group border-border/50 hover:bg-primary/5 -mx-2 border-b px-2 transition-colors last:border-b-0"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={`${prerequisite.name}-${index}`}
                className="border-border/50 -mx-2 border-b px-2 last:border-b-0"
              >
                {content}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-dark/50 dark:text-light/50 flex items-center gap-2 text-sm">
          <span className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-full">
            ✓
          </span>

          <span>این دوره پیش‌نیاز خاصی ندارد.</span>
        </div>
      )}
    </div>
  );
}
