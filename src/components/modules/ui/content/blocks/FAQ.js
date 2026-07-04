export default function FAQ({ block }) {
  return (
    <div className="space-y-3">
      {block.items?.map((item, i) => (
        <div
          key={i}
          className="border-dark/20 dark:border-light/20 rounded-xl border p-4"
        >
          <p className="font-semibold">{item.question}</p>
          <p className="text-sm text-zinc-400 mt-2">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
