import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/Sheet";

const EditProfileSheet = ({
  user,
}: {
  user:
    | {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined | undefined;
      }
    | undefined;
}) => {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer rounded bg-primary px-2 py-1 text-primary-foreground">
        ویرایش پروفایل
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="mt-5">
          <SheetTitle>ویرایش پروفایل</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfileSheet;
