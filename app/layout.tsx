import type { Metadata } from "next";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "فروشگاه آنلاین",
  description: "فروشگاه آنلاین محمد",
};

const myFont = localFont({
  src: "./components/fonts/Yekan.woff",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${myFont.className}`}>
        <ThemeProvider>
          <main className='w-screen h-screen max-w-[1400px] mx-auto'>
            <Navbar />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
