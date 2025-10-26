import React from "react";
import { Spinner } from "./ui/Spinner";

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  );
};

export default Loading;
