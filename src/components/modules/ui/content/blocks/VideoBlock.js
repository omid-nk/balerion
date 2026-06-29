export default function VideoBlock({ block }) {
  return (
    <div className="aspect-video overflow-hidden rounded-xl">
      <iframe className="h-full w-full" src={block.url} allowFullScreen />
    </div>
  );
}
