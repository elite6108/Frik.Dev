const AdminTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'credits', label: 'Credit Management' },
    { id: 'live', label: 'Live Users' },
    { id: 'tickets', label: 'Tickets' },
    { id: 'faqs', label: 'FAQs' }
  ];

  return (
    <div className="border-b border-gray-300 dark:border-gray-700 mb-6 overflow-x-auto">
      <nav
        className="flex space-x-2 sm:justify-start whitespace-nowrap px-2 sm:px-0"
        aria-label="Tabs"
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              cursor-pointer py-3 px-2 sm:px-4 border-b-2 font-medium text-sm transition-all duration-300
              ${activeTab === tab.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }
            `}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminTabs;