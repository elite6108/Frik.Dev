function FaqFormUI() {
  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300';
  const inputClass = 'mt-2 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3.5 py-2.5 focus:outline-none focus:ring-1 dark:focus:ring-blue-500';
  const buttonBase = 'inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform duration-200 ease-in-out';
  const cancelButton = `${buttonBase} border border-gray-300 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-blue-500 dark:focus:ring-offset-gray-900 cursor-pointer hover:scale-105`;
  const submitButton = `${buttonBase} border border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 cursor-pointer hover:scale-105`;

  return (
    <div className="p-6 sm:p-8 border-b border-gray-300 dark:border-gray-700">
      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Add New FAQ
      </h4>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="col-span-1 md:col-span-4">
            <label htmlFor="question" className={labelClass}>Question</label>
            <input type="text" name="question" id="question" className={inputClass} />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select id="category" name="category" className={inputClass} >
              <option value="general">General</option>
              <option value="billing">Billing</option>
              <option value="technical">Technical</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-6">
            <label htmlFor="answer" className={labelClass}>
              Answer
            </label>
            <textarea
              id="answer"
              name="answer"
              rows="4"
              className={inputClass}
            ></textarea>
          </div>

          <div className="col-span-1 md:col-span-1">
            <label htmlFor="order" className={labelClass}>
              Display Order
            </label>
            <input
              type="number"
              name="order"
              id="order"
              min="0"
              className={inputClass}
              placeholder="0"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button type="button" className={cancelButton}>
            Cancel
          </button>
          <button type="submit" className={submitButton}>
            Add FAQ
          </button>
        </div>
      </form>
    </div>
  );
}

export default FaqFormUI;