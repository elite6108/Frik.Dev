import { useState } from "react";
import Chatbox from "../components/BuilderComponents/Chatbox";
import IDE from "../components/BuilderComponents/IDE";

function Builder() {
  const [codeGenerated, setCodeGenerated] = useState(false);
  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:items-center lg:justify-between w-[95%] mx-auto pt-15">
          <div className={`w-full ${codeGenerated ? "lg:w-[33%]" : "sm:w-[70%] md:w-[60%] lg:w-[34%] mx-auto"}`}><Chatbox /></div>
          <div className={`w-full ${codeGenerated ? "block lg:w-[65%]" : "hidden"}`}>
            <IDE />
          </div>
        </div>
    </div>
  );
}

export default Builder;