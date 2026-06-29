import Image from "next/image";

export default function Sidebar({ completionPercent }) {
  const progressPercent = Math.min(
    Math.max(Number(completionPercent) || 0, 0),
    100,
  );

  return (
    <section className="flex w-full flex-col gap-4 select-none lg:w-lg">
      <div className="dark:bg-dark flex flex-col gap-4 rounded-lg bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm">درصد تکمیل دوره</p>
          <p className="text-sm">{progressPercent}%</p>
        </div>
        <div className="bg-light relative h-1 w-full overflow-hidden rounded-lg dark:bg-zinc-950/20">
          <span
            className="bg-primary absolute left-0 h-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* teacher */}
      <div className="dark:bg-dark flex flex-col items-center gap-4 rounded-lg bg-white px-6 py-8">
        <div className="w-32">
          <Image
            alt="user image"
            width={400}
            height={400}
            src={"/images/panel/omid-daliri-avatar.jpg"}
            className="aspect-square w-full rounded-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <h3 className="text-lg font-bold">امید دلیری</h3>
          <p className="text-sm">Front-end Developer</p>
          <button className="bg-secondary/10 text-secondary mt-2 cursor-pointer rounded-md px-3 py-1.5 text-sm">
            همه دوره‌های مدرس
          </button>
        </div>
      </div>
    </section>
  );
}
