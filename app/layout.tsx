import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/navbar/Navbar";
import ReactQueryProvider from "./components/providers/ReactQueryProvider";
import "./globals.css";
import { ThemeProvider } from "./components/providers/Themeprovider";
import { Toaster } from "sonner";
import { MainPagePrefetcher } from "./components/main/MainPagePrefetcher";

export const metadata: Metadata = {
  title: "فروشگاه آنلاین",
  description: "فروشگاه آنلاین محمد",
};

const myFont = localFont({
  src: "../fonts/Yekan.woff",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${myFont.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <ReactQueryProvider>
            <MainPagePrefetcher />
            <main className="relative mx-auto h-auto min-h-screen w-full max-w-[1700px] bg-secondary">
              <Navbar />
              {children}
            </main>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
