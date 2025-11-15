"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/Sheet";

import UpdatePassword from "./UpdatePasswordForm";
import EditprofileForm from "./EditprofileForm";
import { ScrollArea } from "../ui/scroll-area";

export type EditProf = {
  name: string;
  image?: string | null | undefined | undefined;
  userId: string;
};

const EditProfileSheet = ({ user }: { user: EditProf }) => {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer rounded bg-primary px-2 py-1 text-primary-foreground">
        ویرایش پروفایل
      </SheetTrigger>
      <ScrollArea>
        <SheetContent side="left" className="overflow-y-scroll p-1 md:p-6">
          <SheetHeader className="mt-5">
            <SheetTitle>ویرایش پروفایل</SheetTitle>
          </SheetHeader>
          <EditprofileForm user={user} />
          <SheetDescription>تغییر رمز عبور</SheetDescription>
          <UpdatePassword />
        </SheetContent>
      </ScrollArea>
    </Sheet>
  );
};

export default EditProfileSheet;
