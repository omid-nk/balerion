import PanelSidebar from "@/components/modules/panel/PanelSidebar";

export default function PanelLayout({ children }) {
  return (
    <div className="bg-gray-50 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8 flex-col lg:flex-row">
        {/* Sidebar */}
        {/* <div>
          <PanelSidebar />
        </div> */}

        {/* Content */}
        {/* <main className="min-h-[calc(100vh-4rem)] flex-1 rounded-4xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {children}
        </main> */}
        <h1>پنل کاربری در حال آپدیت است. لطفاً بعدا تلاش کنید!</h1>
      </div>
    </div>
  );
}
