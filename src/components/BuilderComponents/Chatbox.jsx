import {
  HiOutlineChatBubbleLeftEllipsis,
  HiMiniBolt,
  HiOutlineUserCircle,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";

const messages = [
  { type: "assistant", content: "Assistant response message." },
  { type: "user", content: "User message goes here." },
  { type: "assistant-error", content: "Error message from assistant." },
];

function Chatbox() {
  return (
    <div className="flex flex-col justify-between w-full mx-auto px-6 pt-4 pb-3 border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 rounded-2xl shadow-lg max-h-[85vh]">
      
      <div className="flex-1 overflow-y-auto space-y-6 pr-1">
        <div className="flex flex-col items-center justify-center text-center px-4 space-y-3 pt-4">
          <div className="h-16 w-16 rounded-full bg-blue-600/10 flex items-center justify-center">
            <HiOutlineChatBubbleLeftEllipsis className="text-blue-500 text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            How can I help you?
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
            Ask me to create a web app, explain code, or help you with your project.
          </p>
        </div>

        {messages.map((msg, index) => {
          if (msg.type === "assistant") {
            return (
              <div key={index} className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center mt-1 shadow-md">
                  <HiMiniBolt className="text-white text-lg" />
                </div>
                <div className="max-w-[85%] bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
                  {msg.content}
                </div>
              </div>
            );
          } else if (msg.type === "user") {
            return (
              <div key={index} className="flex items-start justify-end gap-3">
                <div className="max-w-[85%] bg-blue-600 text-white rounded-2xl rounded-tr-none p-4 shadow-sm">
                  {msg.content}
                </div>
                <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center mt-1 shadow-md">
                  <HiOutlineUserCircle className="text-gray-300 text-lg" />
                </div>
              </div>
            );
          } else if (msg.type === "assistant-error") {
            return (
              <div key={index} className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center mt-1 shadow-md">
                  <HiMiniBolt className="text-white text-lg" />
                </div>
                <div className="max-w-[85%] bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800 rounded-2xl rounded-tl-none p-4 shadow-sm">
                  {msg.content}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="pt-4 border-t border-gray-300 dark:border-gray-800 mt-2">
        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full">
          <input
            type="text"
            placeholder="Ask anything"
            className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none px-4 py-2"
          />
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-3.5 rounded-full transition flex items-center justify-center cursor-pointer"
          >
            <HiOutlinePaperAirplane className="text-xl" />
          </button>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-right">
          47 credits remaining
        </p>
      </div>
    </div>
  );
}

export default Chatbox;