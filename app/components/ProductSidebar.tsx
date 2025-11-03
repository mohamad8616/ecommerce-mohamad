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
import { GiClothes } from "react-icons/gi";
import { categories } from "./navbar/NavLinks";

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
                    <div className="my-1 flex w-full items-center justify-between bg-secondary px-4 py-2 text-lg group-checked:bg-blue-100">
                      <label className="text-primary" htmlFor={item.title}>
                        {item.title}
                      </label>
                      <input
                        type="checkbox"
                        className="cursor-pointer has-checked:bg-green-600"
                      />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarMenuButton className=" mt-2 w-full cursor-pointer bg-primary text-center text-secondary transition-colors duration-150">
              مشاهده نتایج
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
