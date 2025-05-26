const tickets = [
  {
    id: 1,
    subject: "Support request 1",
    status: "in progress",
    createdAt: "2023-05-01",
    user: "user1@example.com",
  },
  {
    id: 2,
    subject: "Support request 2",
    status: "resolved",
    createdAt: "2023-05-01",
    user: "user2@example.com",
  },
  {
    id: 3,
    subject: "Support request 3",
    status: "in progress",
    createdAt: "2023-05-01",
    user: "user3@example.com",
  },
];

function SupportTickets() {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
          Support Tickets
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage user support requests
        </p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {["ID", "Subject", "Status", "Created At", "User"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      #{ticket.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
                      {ticket.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ticket.status === "resolved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : ticket.status === "in progress"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {ticket.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {ticket.user}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No support tickets at the moment
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

export default SupportTickets;