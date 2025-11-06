"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/app/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          size="lg"
          className="text-primary lg:text-stone-100"
        >
          <Sun className="h-[1rem] w-[1rem] scale-100 rotate-0 transition-all lg:h-[1.3rem] lg:w-[1.3rem] dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1rem] w-[1rem] scale-0 rotate-90 transition-all lg:h-[1.2rem] lg:w-[1.2rem] dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun />
          روشن
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon />
          تاریک
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          سیستم
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
