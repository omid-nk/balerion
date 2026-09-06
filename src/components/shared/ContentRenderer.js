import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import StarterKit from "@tiptap/starter-kit";

export default function ContentRenderer({ content }) {
  if (!content) {
    return (
      <p className="text-dark/50 dark:text-light/50 text-sm">
        محتوایی برای نمایش وجود ندارد.
      </p>
    );
  }

  return (
    <div className="tiptap-content">
      {renderToReactElement({
        extensions: [StarterKit],
        content,
      })}
    </div>
  );
}
