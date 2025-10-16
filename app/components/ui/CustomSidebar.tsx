import { cn } from "@/lib/utils";
import React from "react";

const CustomSidebar = ({ classname }: { classname: string }) => {
  return (
    <div className={cn("h-full w-full flex-1 border-2", classname)}>
      CustomSidebar
    </div>
  );
};

export default CustomSidebar;
