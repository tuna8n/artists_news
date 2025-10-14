// next-app/app/layout.tsx
import "./globals.css";
import React from "react";

export const metadata = {
  title: "サカナクション ニュース",
  description: "サカナクションの最新ニュース一覧",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900">
        <div className="max-w-3xl mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
