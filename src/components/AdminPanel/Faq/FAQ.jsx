import { HiOutlineQuestionMarkCircle, HiPlus  } from 'react-icons/hi';
import FaqFormUI from './FaqForm';
import FaqList from './FaqList';

const classname = "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer hover:scale-102 transition-transform duration-200 ease-in-out";

function FAQ() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center flex-col sm:flex-row space-y-6 sm:space-y-0">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            FAQ Management
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage frequently asked questions displayed on the help page
          </p>
        </div>
        <button className={classname}><HiPlus className="-ml-1 mr-2 h-5 w-5" />Add New FAQ</button>
      </div>
      <FaqFormUI />
      <FaqList />
      <div className="text-center py-12">
        <HiOutlineQuestionMarkCircle className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
          No FAQs found
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Get started by creating a new FAQ.
        </p>
        <div className="mt-6">
          <button className={classname}><HiPlus className="-ml-1 mr-2 h-5 w-5" />Add New FAQ</button>
        </div>
      </div>
    </div>
  );
}

export default FAQ;