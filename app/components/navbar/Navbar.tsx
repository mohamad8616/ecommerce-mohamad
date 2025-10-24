import { getSession } from "@/app/_customhooks/hooks";
import NavbarLg from "./NavbarLg";
import NavbarSm from "./NavbarSm";

const Navbar = async () => {
  const session = await getSession();
  const user = session?.user
    ? {
        ...session.user,
        image: session.user.image ?? null, // Convert undefined to null
      }
    : null;

  return (
    <main className="sticky top-0 z-50 w-full lg:top-3 ">
      <NavbarSm user={user} />
      <NavbarLg user={user} />
    </main>
  );
};

export default Navbar;
