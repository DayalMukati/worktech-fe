 import React from "react";

function Loading() {
  return (
    <>
      <div className="app_height  items-center justify-center flex flex-col">
           <img src="/image.png" alt="" className="h-12 w-12 animate-spin" />
          <p>Loading...</p>
         
      </div>
    </>
  );
}

export default Loading;
 