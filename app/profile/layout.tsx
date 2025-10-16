import NavbarProfile from "../components/navbar/NavbarProfile";
import CustomSidebar from "../components/ui/CustomSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-dvh w-full space-y-3 overflow-hidden p-5">
      <NavbarProfile classname="divide-y-2 divide-stone-600" />
      <div className="flex h-full">
        <CustomSidebar classname="" />
        <div className="h-full w-full flex-4 p-6">{children}</div>
      </div>
    </main>
  );
}
