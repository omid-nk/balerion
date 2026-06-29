export default function CodeBlock({ block }) {
  return (
    <pre className="bg-darker text-light overflow-x-auto rounded-xl p-4 text-sm">
      <code>{block.value}</code>
    </pre>
  );
}
