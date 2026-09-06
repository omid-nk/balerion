import Link from "next/link";

export default function TitleHeading({
  title,
  linkHref,
  linkText = "نمایش بیشتر",
}) {
  const words = title.trim().split(/\s+/);
  const lastWord = words.pop();
  const remainingTitle = words.join(" ");

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-6 select-none">
      {!linkHref && <span className="border-border flex-1 border-b" />}

      <h2 className="font-morabba relative block text-xl md:text-2xl">
        {remainingTitle && `${remainingTitle} `}
        <span className="text-primary">{lastWord}</span>
        <span className="bg-primary/20 dark:bg-primary/15 absolute top-0 right-0 bottom-0 left-0 -z-10 block blur-lg" />
      </h2>

      <span className="border-border flex-1 border-b" />

      {linkHref && (
        <Link
          className="hover:text-primary text-sm transition-colors"
          href={linkHref}
        >
          {linkText}
        </Link>
      )}
    </div>
  );
}
