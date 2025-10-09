import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Navbar from "./components/ui/Navbar";

export const metadata: Metadata = {
  title: "فروشگاه محمد",
  description: "فروشگاه آنلاین محمد",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={` antialiased`}>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
