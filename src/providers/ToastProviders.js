"use client";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "8px",
            padding: "12px 16px",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}
