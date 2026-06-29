export default function Heading({ block }) {
  const Tag = `h${block.level || 2}`;

  return <Tag className="mt-6 text-xl font-bold">{block.value}</Tag>;
}
