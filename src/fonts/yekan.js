import localFont from "next/font/local";

export const yekan = localFont({
  src: [
    {
      path: "./yekan-bakh/YekanBakh-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./yekan-bakh/YekanBakh-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-yekan",
  display: "swap",
});
