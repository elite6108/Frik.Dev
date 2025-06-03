import StatCard from "./StatCard";
import CreditPackageCard from "./CreditPackageCard";
import Transactions from "./Transactions";
import LiveUsers from "./LiveUsers";
import SupportTickets from "./SupportTickets";

const stats = [
  { label: "Total Users", value: 0 },
  { label: "Active Users", value: 0 },
  { label: "Total Projects", value: 0 },
  { label: "Total Credits", value: 0 },
];

const creditPackages = [
  { id: 1, name: "Basic", price: 9.99, credits: 100 },
  { id: 2, name: "Pro", price: 19.99, credits: 250 },
  { id: 3, name: "Enterprise", price: 49.99, credits: 1000 },
];

function Dashboard() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium leading-6 text-gray-800 dark:text-white">
            Credit Packages
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {creditPackages.map((pkg) => (
              <CreditPackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        </div>
      </div>
      <Transactions />
      <LiveUsers />
      <SupportTickets />
    </div>
  );
}

export default Dashboard;