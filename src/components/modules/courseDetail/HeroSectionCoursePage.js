import Image from "next/image";
import Breadcrumb from "../ui/Breadcrumb";
import AddToCartButton from "./AddToCartButton";

export default function HeroSectionCoursePage({
  courseId,
  title,
  slug,
  cover,
  price,
  description,
}) {
  return (
    <section className="mt-6 flex flex-col items-center gap-8 lg:flex-row">
      <div className="flex flex-col gap-2 lg:w-2/3">
        <Breadcrumb
          link1="/courses"
          title1="دوره‌ها"
          link2={`/course/${slug}`}
          title2={slug}
        />
        <h1 className="font-morabba mt-2 mb-2 text-xl font-bold sm:text-2xl md:mb-4 md:text-3xl">
          {title}
        </h1>
        <p className="text-dark/70 dark:text-light/70 line-clamp-6 text-xs/relaxed sm:text-sm/relaxed md:line-clamp-4 md:text-base/relaxed">
          {description}
        </p>
        <div className="mt-2 flex gap-3 select-none sm:gap-6">
          <AddToCartButton courseId={courseId} />
          <button>
            {price == null || Number(price) === 0
              ? "رایگان"
              : `${Number(price).toLocaleString()} ت`}
          </button>
        </div>
      </div>
      <div className="w-full select-none lg:w-fit">
        <Image
          src={cover}
          width={600}
          height={0}
          loading="lazy"
          alt={`course cover ${title}`}
          className="w-full rounded-xl"
        />
      </div>
    </section>
  );
}
