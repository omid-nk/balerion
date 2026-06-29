export default function NewCommentForm() {
  return (
    <form className="mb-12 border-b pb-8 select-none">
      <p className="bg-primary/5 border-primary/20 text-primary mb-4 rounded-lg border px-4 py-2 text-sm/relaxed">
        دانشجوی عزیز، سوالات مرتبط به پشتیبانی دوره در قسمت نظرات تایید نخواهد
        شد، لطفا در بخش مشاهده آنلاین هر جلسه از دوره، یا بخش تیکت‌‌ها سوالات
        خود را مطرح کنید.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          placeholder="نام شما:"
          className="bg-light border-dark/20 focus:border-primary w-full rounded-lg border px-4 py-3 text-sm/relaxed outline-0 dark:bg-zinc-950"
        />
        <input
          type="text"
          placeholder="ایمیل:"
          className="bg-light border-dark/20 focus:border-primary w-full rounded-lg border px-4 py-3 text-sm/relaxed outline-0 dark:bg-zinc-950"
        />
      </div>
      <textarea
        name="comment"
        rows={8}
        placeholder="نظرتون رو اینجا بنویسید..."
        className="bg-light border-dark/20 focus:border-primary mt-2 min-h-36 w-full rounded-lg border px-4 py-5 text-sm/relaxed outline-0 dark:bg-zinc-950"
      />
      <div className="flex justify-end gap-2 text-sm">
        <button className="bg-primary text-light rounded-md px-8 py-1.5">
          ارسال
        </button>
      </div>
    </form>
  );
}
