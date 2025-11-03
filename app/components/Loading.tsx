import React from "react";
import { Spinner } from "./ui/Spinner";

const Loading = ({ classname }: { classname?: string }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner className={`${classname}`} />
    </div>
  );
};

export default Loading;
