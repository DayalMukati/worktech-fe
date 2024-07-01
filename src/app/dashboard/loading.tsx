import Icons from "@/components/ui/icon";
import React from "react";
import "@/components/loaders/loading.css";
function Loading() {
  return (
    <>
      <div className="app_height  items-center justify-center flex flex-col ">
        <span className="loader"></span>
        <p>Loading...</p>
      </div>
    </>
  );
}

export default Loading;
