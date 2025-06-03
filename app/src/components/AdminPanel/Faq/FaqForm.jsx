import { useState } from "react";

function FaqForm({ initialData = null, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    question: initialData?.question || '',
    answer: initialData?.answer || '',
    category: initialData?.category || 'general',
    order: initialData?.order || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...initialData, ...formData });
  };

  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300';
  const inputClass =
    'mt-2 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3.5 py-2.5 focus:outline-none focus:ring-1 dark:focus:ring-blue-500';
  const buttonBase =
    'inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none transition-transform duration-200 ease-in-out';
  const cancelButton = `${buttonBase} border border-gray-300 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer hover:scale-105`;
  const submitButton = `${buttonBase} border border-transparent text-white bg-blue-600 hover:bg-blue-700 cursor-pointer hover:scale-105`;

  return (
    <div className="p-6 sm:p-8 border-b border-gray-300 dark:border-gray-700">
      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        {initialData ? 'Edit FAQ' : 'Add New FAQ'}
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="col-span-1 md:col-span-4">
            <label htmlFor="question" className={labelClass}>
              Question
            </label>
            <input
              type="text"
              name="question"
              id="question"
              className={inputClass}
              value={formData.question}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select
              id="category"
              name="category"
              className={inputClass}
              value={formData.category}
              onChange={handleChange}
            >
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
              value={formData.answer}
              onChange={handleChange}
              required
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
              value={formData.order}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button type="button" className={cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={submitButton}>
            {initialData ? 'Update FAQ' : 'Add FAQ'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FaqForm;