import "@/styles/globals.css";
import { yekan } from "@/fonts/yekan";
import { morabba } from "@/fonts/morabba";

import ToastProviders from "@/providers/ToastProviders";
import ThemeProvider from "@/providers/ThemeProvider";
import ScrollToTop from "@/providers/ScrollToTop";
import Header from "@/components/templates/header/Header";
import Footer from "@/components/templates/footer/Footer";

export const metadata = {
  title: "Balerion",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${yekan.variable} ${morabba.variable} dark`}
    >
      <body className="bg-dark/5 text-dark font-yekan dark:bg-darker dark:text-light mx-auto min-h-dvh max-w-7xl px-4 select-none sm:px-6 md:px-10 lg:px-8 xl:px-6 2xl:px-0">
        <ThemeProvider>
          <ToastProviders>
            <ScrollToTop />
            <Header />
            {children}
            <Footer />
          </ToastProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
