import { yekan } from "@/fonts/yekan";
import { morabba } from "@/fonts/morabba";
import "@/styles/globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

import ThemeProvider from "@/providers/ThemeProvider";
import ToastProviders from "@/providers/ToastProviders";
import Loading from "./loading";

export const metadata = {
  title: {
    default: "بالریون",
    template: "باریون | %s",
  },
  description: "پلتفرم آموزش آنلاین بالریون",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${yekan.variable} ${morabba.variable}`}
    >
      <body className="bg-background-light text-dark dark:bg-background-dark dark:text-light font-yekan mx-auto flex min-h-dvh max-w-7xl flex-col justify-between px-3 sm:px-6 xl:px-3">
        <ThemeProvider>
          <ToastProviders>
            <Header />
            {children}
            <Footer />
          </ToastProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
