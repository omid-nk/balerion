export default function CodeBlock({ block }) {
  return (
    <pre
      dir="ltr"
      className="bg-darker text-light overflow-x-auto rounded-xl p-4 text-sm"
    >
      <code>{block.code}</code>
    </pre>
  );
}
