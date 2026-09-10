export default function CourseCompletion({ percent }) {
  return (
    <div className="bg-light dark:bg-dark rounded-lg p-5">
      <div className="flex items-center justify-between text-sm">
        <p>درصد تکمیل دوره</p>

        <span className="font-semibold">{percent}٪</span>
      </div>

      <div className="bg-border relative mt-5 h-1.5 w-full overflow-hidden rounded-full">
        <span
          className="bg-primary absolute top-0 right-0 bottom-0 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
