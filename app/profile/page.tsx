import React from "react";
import { Button } from "../components/ui/Button";
import { signout } from "@/lib/actions";

const page = () => {
  return (
    <div className="text-stone-900 dark:text-stone-200">
      <form action={signout}>
        <Button type="submit" variant="destructive" className="">
          Signout
        </Button>
      </form>
    </div>
  );
};

export default page;
