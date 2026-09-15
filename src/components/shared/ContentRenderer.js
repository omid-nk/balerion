import { renderToReactElement } from "@tiptap/static-renderer/pm/react";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;

function parseContent(content) {
  if (!content) {
    return null;
  }

  if (typeof content === "string") {
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error("Invalid Tiptap JSON:", error);
      return null;
    }
  }

  return content;
}

function transformContent(node) {
  if (!node || typeof node !== "object") {
    return node;
  }

  const transformedNode = {
    ...node,
  };

  if (node.type === "image" && node.attrs?.src) {
    const src = node.attrs.src;

    if (src.startsWith("/images/")) {
      transformedNode.attrs = {
        ...node.attrs,
        src: `${STORAGE_URL}${src}`,
      };
    }
  }

  if (Array.isArray(node.content)) {
    transformedNode.content = node.content.map(transformContent);
  }

  return transformedNode;
}

export default function ContentRenderer({ content }) {
  const parsedContent = parseContent(content);

  if (
    !parsedContent ||
    typeof parsedContent !== "object" ||
    !parsedContent.type
  ) {
    return (
      <p className="text-dark/50 dark:text-light/50 text-sm">
        محتوایی برای نمایش وجود ندارد.
      </p>
    );
  }

  const transformedContent = transformContent(parsedContent);

  const renderedContent = renderToReactElement({
    extensions: [StarterKit, Image],
    content: transformedContent,
  });

  return <div className="tiptap-content">{renderedContent}</div>;
}
