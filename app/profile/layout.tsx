import { AppSidebar } from "@/app/components/ProfileSidebar";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="relative z-40 mx-auto mt-7 w-screen max-w-[1400px]">
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </aside>
  );
}
