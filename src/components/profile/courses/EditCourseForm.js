"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import FormInput from "@/components/shared/FormInput";
import FormImageUpload from "@/components/shared/FormImageUpload";
import FormPrerequisites from "@/components/shared/FormPrerequisites";
import FormMultiSelect from "@/components/shared/FormMultiSelect";

import { getCategories } from "@/services/categories/get-categories";
import { getCourseForEdit } from "@/services/courses/get-course-for-edit";
import { updateCourse } from "@/services/courses/update-course";

import { getCourseCoverUrl } from "@/services/storage/course-covers";

export default function EditCourseForm({ slug }) {
  const router = useRouter();

  const [course, setCourse] = useState(null);

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);

  const [coverUrl, setCoverUrl] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setCategoriesLoading(true);

        const [courseData, categoriesData] = await Promise.all([
          getCourseForEdit(slug),
          getCategories(),
        ]);

        setCourse(courseData);
        setCategories(categoriesData);

        setCoverUrl(courseData.cover_url || "");
      } catch (error) {
        console.error("Load edit course error:", error);

        const message =
          error?.message || "دریافت اطلاعات دوره با خطا مواجه شد.";

        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
        setCategoriesLoading(false);
      }
    }

    loadData();
  }, [slug]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    if (coverUploading) {
      toast.error("لطفاً صبر کنید تا آپلود تصویر دوره کامل شود.");
      return;
    }

    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const action = event.nativeEvent.submitter?.value;

    const categoryIds = formData.get("category_ids");

    const prerequisites = formData.get("prerequisites");

    const payload = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      duration: formData.get("duration"),
      cover_url: formData.get("cover_url"),
      previous_cover_url: course?.cover_url || "",
      short_description: formData.get("short_description"),
      price: formData.get("price"),
      discount_price: formData.get("discount_price"),
      category_ids: categoryIds,
      prerequisites,
      completion_percent: formData.get("completion_percent") || 0,
      content: formData.get("content"),
      status: action === "publish" ? "active" : "draft",
    };

    try {
      setSubmitting(true);

      const result = await updateCourse(course.id, payload);

      if (!result?.success) {
        throw new Error("ویرایش دوره با خطا مواجه شد.");
      }

      toast.success(
        action === "publish"
          ? "دوره با موفقیت منتشر شد."
          : "دوره با موفقیت به عنوان پیش‌نویس ذخیره شد.",
      );

      router.push(`/profile/courses/${result.course.slug}`);

      router.refresh();
    } catch (error) {
      console.error("Edit course form error:", error);

      const message = error?.message || "ویرایش دوره با خطا مواجه شد.";

      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  const categoryOptions = categories.map((category) => ({
    value: String(category.id),
    label: category.name,
  }));

  if (loading) {
    return (
      <div className="bg-light dark:bg-dark rounded-xl p-6">
        <div className="text-dark/50 dark:text-light/50 py-10 text-center text-sm">
          در حال دریافت اطلاعات دوره...
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-500"
      >
        {error || "دوره موردنظر پیدا نشد."}
      </div>
    );
  }

  return (
    <div className="min-w-0">
      {error && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-500"
        >
          {error}
        </div>
      )}

      <form
        id="edit-course-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        {/* اطلاعات اصلی */}

        <section className="bg-light dark:bg-dark rounded-xl p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-bold">اطلاعات دوره</h2>

            <p className="text-dark/50 dark:text-light/50 mt-1 text-xs">
              اطلاعات اصلی دوره را ویرایش کنید.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormInput
              className="sm:col-span-2"
              label="تیتر دوره"
              name="name"
              defaultValue={course.name || ""}
              placeholder="آموزش HTML صفر تا صد"
              required
              autoComplete="off"
            />

            <FormInput
              label="اسلاگ دوره"
              name="slug"
              defaultValue={course.slug || ""}
              placeholder="html-zero-to-hero"
              dir="ltr"
              required
              autoComplete="off"
              description="آدرس دوره در سایت بر اساس این مقدار ساخته می‌شود."
            />

            <FormInput
              label="مدت زمان دوره"
              name="duration"
              defaultValue={course.duration || ""}
              placeholder="۲۰ ساعت"
              required
              description="مدت زمان تقریبی دوره را وارد کنید."
            />

            <div className="sm:col-span-2">
              <FormImageUpload
                label="تصویر دوره"
                name="cover_url"
                value={coverUrl}
                onChange={(event) => setCoverUrl(event.target.value)}
                description="تصویر کاور دوره را انتخاب کنید. فرمت‌های JPG، PNG و WEBP تا حداکثر ۵ مگابایت مجاز هستند."
                onUploadingChange={setCoverUploading}
              />

              {course.cover_url && (
                <p className="text-dark/40 dark:text-light/40 mt-2 px-1 text-[11px]">
                  تصویر فعلی دوره حفظ می‌شود مگر اینکه تصویر جدیدی انتخاب کنید.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* توضیحات */}

        <section className="bg-light dark:bg-dark rounded-xl p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-bold">توضیحات دوره</h2>

            <p className="text-dark/50 dark:text-light/50 mt-1 text-xs">
              توضیحات کوتاه و معرفی دوره را ویرایش کنید.
            </p>
          </div>

          <FormInput
            label="توضیحات کوتاه"
            name="short_description"
            textarea
            rows={5}
            required
            defaultValue={course.short_description || ""}
            placeholder="در این دوره از صفر تا صد HTML را یاد می‌گیرید..."
          />
        </section>

        {/* قیمت */}

        <section className="bg-light dark:bg-dark rounded-xl p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-bold">قیمت دوره</h2>

            <p className="text-dark/50 dark:text-light/50 mt-1 text-xs">
              قیمت اصلی و قیمت تخفیف دوره را مشخص کنید.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormInput
              label="قیمت اصلی"
              name="price"
              type="number"
              min="0"
              step="1000"
              defaultValue={course.price ?? "0"}
              placeholder="0"
              suffix="تومان"
              description="برای دوره رایگان مقدار ۰ را وارد کنید."
            />

            <FormInput
              label="قیمت با تخفیف"
              name="discount_price"
              type="number"
              min="0"
              step="1000"
              defaultValue={course.discount_price ?? ""}
              placeholder="مثلاً ۴۹۹۰۰۰"
              suffix="تومان"
              description="در صورت نداشتن تخفیف، خالی بگذارید."
            />
          </div>
        </section>

        {/* دسته‌بندی و پیش‌نیاز */}

        <section className="bg-light dark:bg-dark rounded-xl p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-bold">دسته‌بندی و پیش‌نیاز</h2>

            <p className="text-dark/50 dark:text-light/50 mt-1 text-xs">
              دسته‌بندی و پیش‌نیاز این دوره را مشخص کنید.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <FormMultiSelect
              label="دسته‌بندی‌ها"
              name="category_ids"
              placeholder="انتخاب دسته‌بندی‌ها"
              defaultValue={course.category_ids || []}
              required
              loading={categoriesLoading}
              disabled={categoriesLoading}
              options={categoryOptions}
              description="می‌توانید هر تعداد دسته‌بندی که مرتبط با دوره است انتخاب کنید."
            />

            <FormPrerequisites
              name="prerequisites"
              label="پیش‌نیازهای دوره"
              defaultValue={
                Array.isArray(course.prerequisites) ? course.prerequisites : []
              }
              description="هر تعداد پیش‌نیاز که لازم است اضافه کنید. اسلاگ می‌تواند خالی باشد."
            />
          </div>
        </section>

        {/* وضعیت دوره */}

        <section className="bg-light dark:bg-dark rounded-xl p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-bold">وضعیت دوره</h2>

            <p className="text-dark/50 dark:text-light/50 mt-1 text-xs">
              میزان تکمیل محتوای دوره را مشخص کنید.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormInput
              label="درصد تکمیل محتوا"
              name="completion_percent"
              type="number"
              min="0"
              max="100"
              step="1"
              defaultValue={course.completion_percent ?? 0}
              suffix="٪"
              description="درصد محتوای ضبط و آماده‌شده دوره را وارد کنید."
            />
          </div>
        </section>

        {/* محتوای اصلی */}

        <section className="bg-light dark:bg-dark rounded-xl p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-bold">محتوای اصلی دوره</h2>

            <p className="text-dark/50 dark:text-light/50 mt-1 text-xs">
              محتوای Tiptap دوره را ویرایش کنید.
            </p>
          </div>

          <FormInput
            label="محتوای JSON"
            name="content"
            textarea
            rows={18}
            dir="ltr"
            spellCheck={false}
            defaultValue={JSON.stringify(course.content || [], null, 2)}
            placeholder={`[ { "type": "paragraph", "content": [ { "type": "text", "text": "محتوای دوره..." } ] } ]`}
            inputClassName="font-mono text-xs leading-6"
          />

          <div className="bg-primary/5 mt-3 flex flex-col gap-2 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-dark/50 dark:text-light/50 text-xs leading-6">
              برای ویرایش و دریافت JSON محتوای دوره می‌توانید از ویرایشگر Tiptap
              استفاده کنید.
            </p>

            <a
              href="https://editor.omiddaliri.top/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary shrink-0 text-xs font-medium transition-opacity hover:opacity-70"
            >
              باز کردن ویرایشگر محتوا
            </a>
          </div>
        </section>
      </form>
    </div>
  );
}
