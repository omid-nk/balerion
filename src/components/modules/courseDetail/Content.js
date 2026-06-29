import { LuLetterText } from "react-icons/lu";

import ContentRenderer from "@/components/modules/ui/content/ContentRenderer";

const getBlocks = (content) => {
  if (!content) {
    return [];
  }

  if (Array.isArray(content)) {
    return content;
  }

  if (Array.isArray(content.blocks)) {
    return content.blocks;
  }

  return [];
};

const getBlockText = (block) => block.data?.text || block.value || block.text;

const normalizeListItems = (items = []) =>
  items.map((item) => (typeof item === "string" ? item : item.content || ""));

const normalizeBlock = (block) => {
  const data = block.data || {};

  switch (block.type) {
    case "header":
    case "heading":
      return {
        ...block,
        type: "heading",
        level: data.level || block.level || 2,
        value: getBlockText(block),
      };

    case "paragraph":
      return {
        ...block,
        value: getBlockText(block),
      };

    case "list":
      return {
        ...block,
        items: normalizeListItems(data.items || block.items),
      };

    case "image":
      return {
        ...block,
        url: data.file?.url || data.url || block.url,
        alt: data.caption || block.alt || "",
      };

    default:
      return block;
  }
};

export default function Content({ content }) {
  const blocks = getBlocks(content).map(normalizeBlock);

  return (
    <div className="dark:bg-dark rounded-lg bg-white p-3 md:p-4">
      <div className="flex items-center gap-2">
        <LuLetterText className="text-primary mt-0.5 text-3xl" />

        <h3 className="font-morabba text-xl select-none">توضیحات</h3>
      </div>

      <div className="text-dark/80 dark:text-light/80 mt-4 space-y-3">
        <ContentRenderer content={blocks} />
      </div>
    </div>
  );
}
