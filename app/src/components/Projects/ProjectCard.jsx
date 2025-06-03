import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function ProjectCard({ project }) {
  const { title, createdAt, gradient } = project;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">

      <div className={`h-2 w-full rounded-t-xl bg-gradient-to-r ${gradient}`} />

      <div className="px-5 py-10 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Created on {createdAt}</p>
          </div>

          <div className="flex gap-2 text-gray-500 dark:text-gray-300">
            <button
              type="button"
              title="Edit"
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
            >
              <FiEdit2 className="h-5 w-5" />
            </button>
            <button
              type="button"
              title="Delete"
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
            >
              <FiTrash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}