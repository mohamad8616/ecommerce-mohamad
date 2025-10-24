import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/Sidebar";
import { AppSidebar } from "@/app/components/ProductSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-auto">{children}</main>
    </SidebarProvider>
  );
}
