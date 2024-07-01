import Icons from "@/components/ui/icon";
import React from "react";

function Loading() {
  return (
    <>
      <div className="app_height  items-center justify-center flex flex-col">
        <img src="/image.png" alt="" className="h-16 w-16" />
        <div className="flex justify-center items-center">
          <Icons icon="gg:spinner"  className="mr-1 w-8 h-8 amimate-spin"></Icons>{" "}
          <p>Loading...</p>
        </div>
      </div>
    </>
  );
}

export default Loading;
