export default function List({ block }) {
  return (
    <ul className="list-disc space-y-2 pr-5 text-sm">
      {block.items?.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
