export default function QuoteBlock({ block }) {
  return (
    <blockquote className="border-r-4 pr-4 text-sm italic">
      {block.value}
    </blockquote>
  );
}
