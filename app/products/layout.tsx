import { AppSidebar } from "@/app/components/ProductSidebar";
import { SidebarProvider } from "@/app/components/ui/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-auto w-full lg:w-3/4">{children}</main>
    </SidebarProvider>
  );
}
