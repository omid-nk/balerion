import CourseCompletion from "./CourseCompletion";
import CoursePrerequisites from "./CoursePrerequisites";
import CoursePurchase from "./CoursePurchase";

export default function CourseSidebar({
  course,
  completionPercent,
  hasDiscount,
  finalPrice,
  discountPercent,
}) {
  return (
    <aside className="w-full xl:w-sm xl:shrink-0">
      <CourseCompletion percent={completionPercent} />

      <CoursePrerequisites prerequisites={course.prerequisites} />

      <CoursePurchase
        course={course}
        hasDiscount={hasDiscount}
        finalPrice={finalPrice}
        discountPercent={discountPercent}
      />
    </aside>
  );
}
