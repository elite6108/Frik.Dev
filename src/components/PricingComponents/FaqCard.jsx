import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FaqCard({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow transition-all duration-300 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div
        aria-expanded={open}
        aria-controls={`faq-${question}`}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white">
          {question}
        </span>
        <span className="ml-4">
          {open ? (
            <Minus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Plus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </span>
      </div>

      <div
        id={`faq-${question}`}
        className={`transition-all duration-300 px-6 text-sm text-gray-600 dark:text-gray-300 ${
          open ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        {answer}
      </div>
    </div>
  );
}