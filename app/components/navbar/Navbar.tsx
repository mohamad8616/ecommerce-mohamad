import { auth } from "@/lib/auth";
import NavbarLg from "./NavbarLg";
import { headers } from "next/headers";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user
    ? {
        ...session.user,
        image: session.user.image ?? null, // Convert undefined to null
      }
    : null;

  return (
    <main className="sticky top-0 z-50 w-full lg:top-3 ">
      <NavbarLg user={user} />
    </main>
  );
};

export default Navbar;
