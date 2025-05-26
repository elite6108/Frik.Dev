const liveUsers = [
  {
    id: 1,
    email: "user1@example.com",
    status: "active",
    lastActive: "5 minutes ago",
    currentPage: "Dashboard",
  },
  {
    id: 2,
    email: "user2@example.com",
    status: "active",
    lastActive: "5 minutes ago",
    currentPage: "Settings",
  },
  {
    id: 3,
    email: "user3@example.com",
    status: "idle",
    lastActive: "5 minutes ago",
    currentPage: "Editor",
  },
  {
    id: 4,
    email: "user4@example.com",
    status: "idle",
    lastActive: "5 minutes ago",
    currentPage: "Dashboard",
  },
  {
    id: 5,
    email: "user5@example.com",
    status: "active",
    lastActive: "5 minutes ago",
    currentPage: "Projects",
  },
];

function LiveUsers() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium leading-6 text-gray-800 dark:text-white">
          Live Users
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Currently active users on the platform
        </p>
      </div>

      <div className="px-4 py-5 sm:p-6">
        <div className="overflow-x-auto">
          <table
            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
            role="table"
          >
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {["User", "Status", "Last Active", "Current Page"].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {liveUsers.length > 0 ? (
                liveUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.currentPage}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No active users at the moment
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LiveUsers;