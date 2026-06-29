import {
  LuInstagram,
  LuMail,
  LuMessagesSquare,
  LuTvMinimalPlay,
} from "react-icons/lu";

export default function FooterContact() {
  return (
    <>
      <h3 className="mb-4 text-base font-bold">ارتباط با ما</h3>

      <div className="space-y-4 text-sm">
        <a
          href="#"
          className="text-light/70 hover:text-primary flex items-center gap-3 transition"
        >
          <LuMessagesSquare />
          <span>تلگرام</span>
        </a>

        <a
          href="#"
          className="text-light/70 hover:text-primary flex items-center gap-3 transition"
        >
          <LuInstagram />
          <span>اینستاگرام</span>
        </a>

        <a
          href="#"
          className="text-light/70 hover:text-primary flex items-center gap-3 transition"
        >
          <LuTvMinimalPlay />
          <span>یوتیوب</span>
        </a>

        <a
          href="mailto:info@balerion.ir"
          className="text-light/70 hover:text-primary flex items-center gap-3 transition"
        >
          <LuMail />
          <span>info@balerion.ir</span>
        </a>
      </div>
    </>
  );
}
