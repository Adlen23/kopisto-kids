import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "كوبيستو - ألعاب تعليمية للأطفال",
  description: "مغامرات تعليمية ممتعة مع كوبيستو! ألعاب تفاعلية تنمي مهارات طفلك في الرياضيات واللغة والعلوم بطريقة مرحة ومسلية.",
  keywords: ["كوبيستو", "ألعاب تعليمية", "أطفال", "تعلم", "ترفيه", "ألعاب أطفال"],
  authors: [{ name: "كوبيستو" }],
  icons: {
    icon: "/kopisto.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${fredoka.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: 'var(--font-fredoka), sans-serif' }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
