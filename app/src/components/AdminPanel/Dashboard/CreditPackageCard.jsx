function CreditPackageCard({ name, price, credits }) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow border border-gray-200 dark:border-gray-600 transition hover:shadow-md">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base md:text-lg font-medium text-gray-800 dark:text-white">
          {name}
        </h3>
        <p className="mt-1 text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
          ${price}
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {credits} credits
        </p>
      </div>
    </div>
  );
}

export default CreditPackageCard;