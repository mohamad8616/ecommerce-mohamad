import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/app/components/ui/Sidebar";
import { categories } from "./navbar/NavLinks";
import { GiClothes } from "react-icons/gi";

const items = categories.map((category) => ({
  title: category,
  icon: category.includes("لباس") && <GiClothes />,
}));

export function AppSidebar() {
  return (
    <Sidebar
      side="right"
      variant="floating"
      collapsible="icon"
      className="z-20 mt-16 hidden bg-muted text-lg font-bold lg:static lg:mt-24"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">دسته بندی</SidebarGroupLabel>
          <SidebarSeparator />
          <SidebarGroupContent className="mt-5">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {/* <a href={item.url}> */}
                    {/* <item.icon /> */}
                    <span>{item.title}</span>
                    {/* </a> */}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
