import { LuMessageSquare, LuPlus, LuFolderX } from "react-icons/lu";
import NewCommentForm from "./NewCommentForm";

export default function Comments() {
  return (
    <div className="dark:bg-dark rounded-lg bg-white p-2 md:p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 p-1">
          <LuMessageSquare className="text-primary mt-0.5 text-2xl" />
          <h3 className="font-morabba text-xl select-none">نظرات</h3>
        </div>
      </div>
      <div className="my-4 p-1">
        {/* New Comment Form */}
        <NewCommentForm />

        {/* if empty */}
        <div className="my-12 flex flex-col items-center justify-center gap-2 select-none">
          <LuFolderX className="text-secondary text-4xl" />
          <p className="text-light-gray">هنوز نظری ثبت نشده :(</p>
        </div>
      </div>
    </div>
  );
}
