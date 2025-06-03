export default function Tabs({ activeTab, setActiveTab, tabs }) {
  return (
    <div className="w-full overflow-x-auto sm:overflow-visible">
      <nav className="inline-flex min-w-full sm:flex border-b border-gray-300 dark:border-gray-700 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 md:px-8 py-3 whitespace-nowrap text-sm sm:text-base font-medium border-b-2 transition-colors duration-200 cursor-pointer
              ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-blue-500"
              }`}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}