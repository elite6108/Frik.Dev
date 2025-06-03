import { useState } from "react";
import AdminTabs from "../components/AdminPanel/AdminTabs";
import Dashboard from "../components/AdminPanel/Dashboard/Dashboard";
import FAQ from "../components/AdminPanel/Faq/FAQ";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="w-full mx-auto px-8 sm:px-10 lg:px-20 pt-20 pb-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-medium text-gray-700 dark:text-gray-100">
          Admin Panel
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-500 dark:text-gray-400">
          Manage your platform, users, and resources
        </p>
      </div>

      <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "faqs" && <FAQ />}
    </div>
  );
}

export default Admin;