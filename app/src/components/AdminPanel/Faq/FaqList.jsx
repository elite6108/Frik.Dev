import FaqCard from './FaqCard';

function FaqList({ faqsByCategory, onEdit, onDelete, onTogglePublish }) {
  return (
    <div className="space-y-8 p-6 mx-auto">
      {Object.entries(faqsByCategory).map(([category, faqs]) => (
        <section key={category} className="bg-gray-200 dark:bg-gray-700 rounded-lg px-5 py-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white capitalize mb-4">
            {category}
          </h3>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FaqCard
                key={faq.id}
                faq={{ ...faq, category }}
                onEdit={() => onEdit({ ...faq, category })}
                onDelete={() => onDelete({ ...faq, category })}
                onTogglePublish={() => onTogglePublish({ ...faq, category })}
              />
            ))}
            {faqs.length === 0 && (
              <p className="text-gray-500 dark:text-gray-300 text-center text-sm">No FAQs available in this category.</p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

export default FaqList;