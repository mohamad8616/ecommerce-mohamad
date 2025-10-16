// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarSeparator,
// } from "@/app/components/ui/Sidebar";

// // Menu items.
// const items = [
//   {
//     title: "Home",
//     url: "#",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ];

// export function AppSidebar() {
//   return (
//     <Sidebar
//       side="right"
//       variant="floating"
//       collapsible="icon"
//       className="absolute right-0 z-50 text-lg font-bold text-stone-900 dark:text-stone-200"
//     >
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel className="text-lg">
//             اظلاعات کاربری
//           </SidebarGroupLabel>
//           <SidebarSeparator />
//           <SidebarGroupContent className="mt-5">
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <a href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter className=" bg-blue-400">svsv</SidebarFooter>
//     </Sidebar>
//   );
// }
