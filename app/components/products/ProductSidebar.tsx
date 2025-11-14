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
import Link from "next/link";
import { categories } from "../navbar/NavLinks";

const items = categories.map((category) => ({
  title: category,
  link: category.link,
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
          <SidebarGroupContent className="mt-5 flex justify-center p-2">
            <SidebarMenu>
              <SidebarMenuButton asChild>
                <Link
                  href={"/products"}
                  className="my-1 flex w-full items-center justify-between bg-secondary px-4 py-2 text-lg"
                >
                  <span>مشاهده همه محصولات</span>
                </Link>
              </SidebarMenuButton>
              <SidebarSeparator />
              {items.map((item, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.link}
                      className="my-1 flex w-full items-center justify-between bg-secondary px-4 py-2 "
                    >
                      <span>{item.title.title}</span>
                    </Link>
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
