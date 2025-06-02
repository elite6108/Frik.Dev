import ActionBar from "../components/Projects/ActionBar";
import ProjectCard from "../components/Projects/ProjectCard";
import { FiFolderPlus } from "react-icons/fi";

export default function MyProjects() {
  const sampleProjects = [
    {
      id: 1,
      title: "Portfolio Website",
      createdAt: "Jan 1, 2025",
      status: "Draft",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      id: 2,
      title: "E-commerce App",
      createdAt: "Feb 15, 2025",
      status: "Published",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Blog Platform",
      createdAt: "Mar 22, 2025",
      status: "In Review",
      gradient: "from-green-500 to-teal-500",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 pt-20 px-4 md:px-15 pb-12 text-gray-800 dark:text-white">
      <div className="space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
          My Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-10">
          Create, manage, and deploy your web projects with Frik's AI-powered
          tools.
        </p>

        <ActionBar />
        {sampleProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-gray-200 dark:bg-grid-gray-700/25 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.6),rgba(255,255,255,0.3))]" />

            <div className="relative">
              <div className="mx-auto h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <FiFolderPlus className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>

              <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                No projects yet
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Get started by creating your first project. Use Frik
                AI assistant to help you build amazing websites in minutes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}