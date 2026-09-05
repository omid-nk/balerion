import localFont from "next/font/local";

export const morabba = localFont({
  src: [
    {
      path: "./morabba/morabba-bold.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-morabba",
  display: "swap",
});
