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
        <DropdownMenuItem className="ml-autotext-right">
          <span className="ml-auto">پروفایل</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <span className="ml-auto">سوابق خرید</span>
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
