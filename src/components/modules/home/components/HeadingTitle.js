export function HeadingTitle({ namePart1, namePart2 }) {
  return (
    <div className="flex mb-2 items-center justify-between gap-4">
      <span className="border-dark/10 dark:border-light/10 flex flex-1 border-t" />
      <h3 className="font-morabba text-lg sm:text-xl md:text-2xl/relaxed">
        {namePart1} <span className="text-primary">{namePart2}</span>
      </h3>
      <span className="border-dark/10 dark:border-light/10 flex flex-1 border-t" />
    </div>
  );
}
