import Image from "next/image";

export default function ImageBlock({ block }) {
  return (
    <div className="border-dark/20 dark:border-light/20 my-4 overflow-hidden rounded-xl border">
      <Image
        src={block.url}
        alt={block.alt || ""}
        width={1200}
        height={600}
        className="w-full object-cover"
      />
    </div>
  );
}
