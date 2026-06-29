import {
  LuClock4,
  LuUsers,
  LuCalendarRange,
  LuChartColumn,
} from "react-icons/lu";

const getPublishStatus = (completionPercent) => {
  const percent = Math.min(Math.max(Number(completionPercent) || 0, 0), 100);
  const formattedPercent = new Intl.NumberFormat("fa-IR").format(percent);

  if (percent === 0) {
    return "منتشر نشده";
  }

  if (percent === 100) {
    return "تکمیل شده";
  }

  return `در حال تکمیل (${formattedPercent}٪)`;
};

const formatUpdateDate = (date) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "نامشخص";
  }

  return new Intl.DateTimeFormat("fa-IR").format(parsedDate);
};

export default function InfoBoxes({
  completionPercent,
  duration,
  studentCount,
  lastUpdatedAt,
}) {
  const publishStatus = getPublishStatus(completionPercent);
  const formattedStudentCount = new Intl.NumberFormat("fa-IR").format(
    Number(studentCount) || 0,
  );
  const formattedUpdateDate = formatUpdateDate(lastUpdatedAt);

  return (
    <>
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <div className="*:dark:bg-dark flex flex-1 justify-center gap-2 *:flex *:flex-1 *:items-center *:gap-2 *:rounded-lg *:bg-white *:px-3 *:py-3">
          <div>
            <LuChartColumn className="text-primary size-6" />
            <div>
              <p className="text-xs font-bold">{publishStatus}</p>
              <p className="text-light-gray mt-0.5 text-xs">وضعیت دوره</p>
            </div>
          </div>
          <div>
            <LuClock4 className="text-primary size-6" />
            <div>
              <p className="text-xs font-bold">{duration}</p>
              <p className="text-light-gray mt-0.5 text-xs">مدت زمان دوره</p>
            </div>
          </div>
        </div>
        <div className="*:dark:bg-dark flex flex-1 justify-center gap-2 *:flex *:flex-1 *:items-center *:gap-2 *:rounded-lg *:bg-white *:px-3 *:py-3">
          <div>
            <LuUsers className="text-primary size-6" />
            <div>
              <p className="text-xs font-bold">{formattedStudentCount} نفر</p>
              <p className="text-light-gray mt-0.5 text-xs">تعداد ثبت نامی</p>
            </div>
          </div>
          <div>
            <LuCalendarRange className="text-primary size-6" />{" "}
            <div>
              <p className="text-xs font-bold">{formattedUpdateDate}</p>
              <p className="text-light-gray mt-0.5 text-xs">بروزرسانی شده</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
