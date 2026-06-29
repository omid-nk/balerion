export default function FAQ({ block }) {
  return (
    <div className="space-y-3">
      {block.items?.map((item, i) => (
        <div
          key={i}
          className="border-dark/20 dark:border-light/20 rounded-xl border p-4"
        >
          <p className="font-semibold">{item.q}</p>
          <p className="text-sm">{item.a}</p>
        </div>
      ))}
    </div>
  );
}
