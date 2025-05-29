import { useState } from 'react';
import { HiOutlineQuestionMarkCircle, HiPlus } from 'react-icons/hi';
import FaqForm from './FaqForm';
import FaqList from './FaqList';

const buttonClass = "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer hover:scale-102 transition-transform duration-200 ease-in-out";

const initialFaqsByCategory = {
  general: [
    {
      id: 1,
      question: 'What is your return policy?',
      answer: 'You can return any item within 30 days of purchase.',
      is_published: true,
      order: 1,
    },
    {
      id: 2,
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship worldwide with applicable fees.',
      is_published: false,
      order: 2,
    },
  ],
  billing: [
    {
      id: 3,
      question: 'When will I be charged?',
      answer: 'You will be charged immediately upon purchase.',
      is_published: true,
      order: 1,
    },
  ],
  technical: [
    {
      id: 4,
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" at the login screen.',
      is_published: true,
      order: 1,
    },
  ],
};

function FAQ() {
  const [faqsByCategory, setFaqsByCategory] = useState(initialFaqsByCategory);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const handleAddNew = () => {
    setEditingFaq(null);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingFaq(null);
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setIsFormVisible(true);
  };

  const handleSave = (newFaq) => {
    const updated = { ...faqsByCategory };

    if (!newFaq.id) {
      const newId = Date.now();
      const category = newFaq.category;
      const newItem = { ...newFaq, id: newId, is_published: false };
      updated[category] = [...(updated[category] || []), newItem];
    } else {
      const oldCategory = editingFaq.category;
      const newCategory = newFaq.category;

      if (oldCategory !== newCategory) {
        updated[oldCategory] = updated[oldCategory].filter((f) => f.id !== newFaq.id);
        updated[newCategory] = [...(updated[newCategory] || []), newFaq];
      } else {
        updated[oldCategory] = updated[oldCategory].map((f) =>
          f.id === newFaq.id ? { ...f, ...newFaq } : f
        );
      }
    }

    setFaqsByCategory(updated);
    setIsFormVisible(false);
    setEditingFaq(null);
  };

  const handleDelete = (faq) => {
    const updated = { ...faqsByCategory };
    updated[faq.category] = updated[faq.category].filter((f) => f.id !== faq.id);
    setFaqsByCategory(updated);
  };

  const handleTogglePublish = (faq) => {
    const updated = { ...faqsByCategory };
    updated[faq.category] = updated[faq.category].map((f) =>
      f.id === faq.id ? { ...f, is_published: !f.is_published } : f
    );
    setFaqsByCategory(updated);
  };

  const hasFaqs = Object.values(faqsByCategory).some((faqs) => faqs.length > 0);

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
        {!isFormVisible && (
          <button className={buttonClass} onClick={handleAddNew}>
            <HiPlus className="-ml-1 mr-2 h-5 w-5" />
            Add New FAQ
          </button>
        )}
      </div>

      {isFormVisible ? (
        <FaqForm
          initialData={editingFaq}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      ) : hasFaqs ? (
        <FaqList
          faqsByCategory={faqsByCategory}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onTogglePublish={handleTogglePublish}
        />
      ) : (
        <div className="text-center py-12">
          <HiOutlineQuestionMarkCircle className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No FAQs found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating a new FAQ.
          </p>
          <div className="mt-6">
            <button className={buttonClass} onClick={handleAddNew}>
              <HiPlus className="-ml-1 mr-2 h-5 w-5" />
              Add New FAQ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FAQ;