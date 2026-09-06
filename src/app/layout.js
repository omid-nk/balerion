import { yekan } from "@/fonts/yekan";
import { morabba } from "@/fonts/morabba";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "Balerion",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${yekan.variable} ${morabba.variable} `}
    >
      <body className="bg-background-light text-dark dark:bg-background-dark dark:text-light font-yekan mx-auto max-w-7xl px-3 sm:px-6 xl:px-3">
        <Header />
        {children}
      </body>
    </html>
  );
}
