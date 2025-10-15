import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/navbar/Navbar";
import ReactQueryProvider from "./components/providers/ReactQueryProvider";
import "./globals.css";
import { ThemeProvider } from "./components/providers/Themeprovider";

export const metadata: Metadata = {
  title: "فروشگاه آنلاین",
  description: "فروشگاه آنلاین محمد",
};

const myFont = localFont({
  src: "../fonts/Yekan.woff",
});

// const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${myFont.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <main className="relative mx-auto w-screen max-w-[1400px] bg-pink-50 dark:bg-stone-900">
              <Navbar />
              {children}
            </main>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
