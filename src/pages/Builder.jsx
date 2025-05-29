import { useState } from "react";
import Chatbox from "../components/BuilderComponents/Chatbox";
import IDE from "../components/BuilderComponents/IDE";

function Builder() {
  const [codeGenerated, setCodeGenerated] = useState(true);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white p-2 md:p-4 transition-colors duration-200">
      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:items-center lg:justify-between w-[95%] p-4 mx-auto">
          <div className={`w-full ${codeGenerated ? "lg:w-[32%]" : "sm:w-[70%] md:w-[60%] lg:w-[38%] mx-auto"}`}><Chatbox /></div>
          <div className={`w-full ${codeGenerated ? "block lg:w-[66%]" : "hidden"}`}>
            <IDE />
          </div>
        </div>
    </div>
  );
}

export default Builder;