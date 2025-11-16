import CustomSidebar from "../components/profile/CustomSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative h-auto min-h-screen w-full space-y-3 p-1 md:p-5">
      <div className="flex h-full">
        <CustomSidebar classname="" />
        <div className="h-full w-full flex-4">{children}</div>
      </div>
    </main>
  );
}
