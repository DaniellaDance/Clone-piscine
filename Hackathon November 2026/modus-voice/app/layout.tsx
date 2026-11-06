import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modus Voice — голос команды",
  description: "Обращения, предложения и обсуждения команды Модус Трейд. Прототип.",
  other: {
    "codex-preview": "development",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
