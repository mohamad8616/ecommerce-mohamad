import NavbarProfile from "../components/navbar/NavbarProfile";
import CustomSidebar from "../components/ui/CustomSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative h-auto w-full space-y-3 p-1 md:p-5">
      <NavbarProfile classname=" divide-stone-600" />
      <div className="flex h-full">
        <CustomSidebar classname="" />
        <div className="h-full w-full flex-4">{children}</div>
      </div>
    </main>
  );
}
