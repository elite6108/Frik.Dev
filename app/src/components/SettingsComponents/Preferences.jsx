export default function Preferences() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-colors duration-200">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Preferences</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Customize your experience</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white">Dark Mode</h3>
          </div>
          <button
            type="button"
            onClick={() => document.dispatchEvent(new CustomEvent('toggle-theme'))}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md transition-all duration-200 cursor-pointer hover:scale-101"
          >
            Toggle Theme
          </button>
        </div>

      </div>
    </div>
  );
}