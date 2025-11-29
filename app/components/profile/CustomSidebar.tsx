"use client";

import { cn } from "@/lib/utils";
import { HelpCircle, Home, HistoryIcon, User, X, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/lib/actions";

const CustomSidebar = ({ classname }: { classname: string }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileOpen]);

  const menuItems = [
    { icon: Home, label: "صفحه اصلی", href: "/" },
    { icon: User, label: "پروفایل", href: "/profile" },
    { icon: HistoryIcon, label: "سوابق خرید", href: "/invoices" },
    { icon: HelpCircle, label: "پشتیبانی", href: "/support" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 h-screen bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          " z-40 h-screen w-80 transform border-l border-slate-200 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-800/80",
          "fixed top-0 right-0 z-40 w-80 transform lg:sticky",
          isMobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
          classname,
        )}
      >
        {/* Header */}
        <div className="border-b border-slate-200 p-6 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              منو
            </h2>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="rounded-lg p-1 transition-colors hover:bg-slate-100 lg:hidden dark:hover:bg-slate-700"
            >
              <X size={20} className="text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                  "hover:translate-x-1 hover:bg-blue-50 dark:hover:bg-slate-700/50",
                  active
                    ? "bg-primary text-primary-foreground shadow-lg shadow-blue-500/25"
                    : "text-slate-700 dark:text-slate-300",
                )}
              >
                <Icon
                  size={20}
                  className={cn(
                    "transition-transform duration-200 group-hover:scale-110",
                    active && "text-white",
                  )}
                />
                <span className="font-medium">{item.label}</span>
                {active && (
                  <div className="ml-auto h-6 w-1 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute right-0 bottom-0 left-0 border-t border-slate-200 p-6 dark:border-slate-700">
          <form action={logout}>
            <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition-all duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
              <LogOut
                size={20}
                className="transition-transform group-hover:scale-110"
              />
              <span className="font-medium">خروج از حساب</span>
            </button>
          </form>

          {/* Version Info */}
          <div className="mt-4 text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              نسخه ۱.۰.۰
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomSidebar;
