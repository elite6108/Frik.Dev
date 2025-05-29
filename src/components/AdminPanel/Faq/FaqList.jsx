import FaqCard from './FaqCard';

const testFaqsByCategory = {
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

function FaqList() {
  return (
    <div className="space-y-8 p-6 mx-auto">
      {Object.entries(testFaqsByCategory).map(([category, faqs]) => (
        <section key={category} className="bg-gray-200 dark:bg-gray-700 rounded-lg p-5">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white capitalize mb-4">
            {category}
          </h3>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FaqCard key={faq.id} faq={faq} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default FaqList;