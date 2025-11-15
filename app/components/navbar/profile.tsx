import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { logout } from "@/lib/actions";
import { User } from "@/lib/auth";
import { IoPerson } from "react-icons/io5";

import { ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";

const Profile = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" flex items-center gap-x-1.5 rounded-full border-2 p-1 text-primary">
        <IoPerson size={20} />
        <ChevronDown size={16} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={15}
        className="space-y-2 p-2 text-right text-sm"
      >
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="ml-auto text-right" asChild>
          <Link
            href="/profile"
            className="ml-auto inline-block rounded px-2 py-1"
          >
            پروفایل
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/invoices"
            className="ml-auto inline-block rounded px-2 py-1"
          >
            سوابق خرید
          </Link>
        </DropdownMenuItem>
        <form action={logout}>
          <Button variant="destructive" type="submit" className="ml-auto">
            {" "}
            خروج از حساب کاربری
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
