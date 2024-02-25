import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Tasker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg" href="/app.svg" />
      </head>
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
