import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/navbar/Navbar";
import ReactQueryProvider from "./components/ReactQueryProvider";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "فروشگاه آنلاین",
  description: "فروشگاه آنلاین محمد",
};

const myFont = localFont({
  src: "./fonts/Yekan.woff",
});

// const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fa' dir='rtl'>
      <body className={`${myFont.className}`}>
        <ReactQueryProvider>
          <ThemeProvider>
            <main className='w-screen  max-w-[1400px] mx-auto relative'>
              <Navbar />
              {children}
            </main>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
