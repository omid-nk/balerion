import Paragraph from "./blocks/Paragraph";
import Heading from "./blocks/Heading";
import List from "./blocks/List";
import FAQ from "./blocks/FAQ";
import ImageBlock from "./blocks/ImageBlock";
import TableBlock from "./blocks/TableBlock";
import CodeBlock from "./blocks/CodeBlock";
import QuoteBlock from "./blocks/QuoteBlock";
import Divider from "./blocks/Divider";
import VideoBlock from "./blocks/VideoBlock";

const components = {
  paragraph: Paragraph,
  heading: Heading,
  list: List,
  faq: FAQ,
  image: ImageBlock,
  table: TableBlock,
  code: CodeBlock,
  quote: QuoteBlock,
  divider: Divider,
  video: VideoBlock,
};

export default function ContentRenderer({ content }) {
  if (!content?.length) {
    return <p className="text-sm">محتوایی برای نمایش وجود ندارد</p>;
  }

  return (
    <div className="space-y-6">
      {content.map((block, i) => {
        const Component = components[block.type];

        if (!Component) return null;

        return <Component key={i} block={block} />;
      })}
    </div>
  );
}
