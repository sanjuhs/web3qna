import React from "react";

function Loader() {
  return (
    <div className="h-[70vh]">
      <div class="flex flex-row justify-center items-center h-full">
        <svg className="animate-bounce h-4 w-4 mr-3 border-2 rounded-full border-black"></svg>
        <svg className="animate-bounce h-4 w-4 mr-3 border-2 rounded-full border-black"></svg>
        <svg className="animate-bounce h-4 w-4 mr-3 border-2 rounded-full border-black"></svg>
      </div>
    </div>
  );
}

export default Loader;
