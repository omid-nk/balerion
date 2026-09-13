import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;

function transformContent(node) {
  if (!node) return node;

  const transformedNode = {
    ...node,
  };

  if (node.type === "image" && node.attrs?.src) {
    const src = node.attrs.src;

    // فقط آدرس‌های نسبی /images/... را به Supabase تبدیل کن
    if (src.startsWith("/images/")) {
      transformedNode.attrs = {
        ...node.attrs,
        src: `${STORAGE_URL}${src}`,
      };
    }
  }

  if (node.content) {
    transformedNode.content = node.content.map(transformContent);
  }

  return transformedNode;
}

export default function ContentRenderer({ content }) {
  if (!content) {
    return (
      <p className="text-dark/50 dark:text-light/50 text-sm">
        محتوایی برای نمایش وجود ندارد.
      </p>
    );
  }

  const transformedContent = transformContent(content);

  return (
    <div className="tiptap-content">
      {renderToReactElement({
        extensions: [StarterKit, Image],
        content: transformedContent,
      })}
    </div>
  );
}
