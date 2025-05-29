const FaqCard = ({ faq }) => {
  const buttonBase =
    "inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out cursor-pointer hover:scale-102";
  const getStatusButtonClass = (published) =>
    published
      ? `${buttonBase} text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-blue-500`
      : `${buttonBase} text-white bg-green-600 hover:bg-green-700 focus:ring-blue-500`;

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-5 py-4 flex justify-between items-start gap-4">
        <div className="flex-grow">
          <h4 className="text-md font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            {faq.question}
            {!faq.is_published && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                Draft
              </span>
            )}
          </h4>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
            {faq.answer}
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            Order: {faq.order}
          </p>
        </div>
        <div className="flex flex-row space-x-2">
          <button
            type="button"
            className={getStatusButtonClass(faq.is_published)}
          >
            {faq.is_published ? "Unpublish" : "Publish"}
          </button>
          <button
            type="button"
            className={`${buttonBase} text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`}
          >
            Edit
          </button>
          <button
            type="button"
            className={`${buttonBase} text-white bg-red-600 hover:bg-red-700 focus:ring-red-500`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaqCard;