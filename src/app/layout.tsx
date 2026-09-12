import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

import { DBProvider } from "@/components/providers/DBProvider";
import { GlobalAIAssistant } from "@/components/assistant/GlobalAIAssistant";
import { PWARegister } from "@/components/pwa/PWARegister";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
};

export const metadata: Metadata = {
  title: "IELTS Mastery 7.5 | Lộ trình Cá nhân hóa 165 Ngày",
  description: "Nền tảng luyện thi IELTS thông minh từ Band 4.5 lên 7.5 với 3 giai đoạn mở khóa và 5 module chức năng cốt lõi.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "IELTS Mastery",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <DBProvider>
            <div className="min-h-screen bg-background text-foreground flex">
              {/* Sidebar Navigation */}
              <Sidebar />

              {/* Main Application Shell */}
              <div className="flex-1 flex flex-col min-w-0 md:pl-72 transition-all duration-300">
                <Header />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                  {children}
                </main>
              </div>
            </div>

            {/* Global Floating AI Assistant (Bottom-Right) */}
            <GlobalAIAssistant />

            {/* PWA Service Worker & iOS iPhone X Helper */}
            <PWARegister />
          </DBProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
