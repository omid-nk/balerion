"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import CourseItem from "./CourseItem";
import LoadMoreCourses from "./LoadMoreCourses";

const PAGE_SIZE = 10;

export default function CoursesList({ initialCourses }) {
  const supabase = createClient();

  const [courses, setCourses] = useState(initialCourses);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialCourses.length === PAGE_SIZE);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const from = courses.length;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        console.error("Load more courses error:", error);
        toast.error("دریافت دوره‌های بیشتر انجام نشد");
        return;
      }

      const newCourses = data || [];

      setCourses((current) => [...current, ...newCourses]);

      if (newCourses.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("خطایی هنگام دریافت دوره‌ها رخ داد");
    } finally {
      setLoading(false);
    }
  };

  if (!courses.length) {
    return (
      <div className="border-border rounded-2xl border p-8 text-center select-none">
        <p className="text-dark/50 dark:text-light/50 text-sm">
          هنوز دوره‌ای ثبت نشده است.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-3 select-none">
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>

      {hasMore && <LoadMoreCourses loading={loading} onClick={loadMore} />}
    </div>
  );
}
