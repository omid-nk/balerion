import { LuCopyright } from "react-icons/lu";

export default function FooterBottom() {
  return (
    <div className="border-light/10 mt-12 border-t px-6 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs md:flex-row">
        <p className="text-light/60 flex items-center gap-1">
          <LuCopyright />
          کلیه حقوق مادی و معنوی برای بالریون محفوظ است.
        </p>

        <p className="text-light/50">Built with 💚 by Omidnk</p>
      </div>
    </div>
  );
}
