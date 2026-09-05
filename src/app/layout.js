import "@/styles/globals.css";

export const metadata = {
  title: "Balerion",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={``}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
