import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/Sheet";

const ChangePasswordSheet = ({ userId }: { userId?: string }) => {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer rounded bg-primary px-2 py-1 text-primary-foreground">
        تغییر رمز عبور{" "}
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ChangePasswordSheet;
