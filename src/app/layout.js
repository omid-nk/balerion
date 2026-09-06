import { yekan } from "@/fonts/yekan";
import { morabba } from "@/fonts/morabba";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/providers/ThemeProvider";

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
      <body className="bg-background-light text-dark dark:bg-background-dark dark:text-light font-yekan mx-auto flex min-h-dvh max-w-7xl flex-col justify-between px-3 sm:px-6 xl:px-3">
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
