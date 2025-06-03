import {
  HiOutlineChatAlt2,
  HiOutlineEye,
  HiOutlineCube,
  HiOutlineDatabase,
} from "react-icons/hi";

const features = [
  {
    icon: HiOutlineChatAlt2,
    title: "Conversational Building",
    description:
      "Describe what you want in natural language, and Whathebot (our AI assistant) generates the code for you instantly. No more fighting with HTML and CSS.",
  },
  {
    icon: HiOutlineEye,
    title: "Real-time Preview",
    description:
      "See your website come to life as you chat. Our integrated StackBlitz WebContainers enable instant previews without any setup.",
  },
  {
    icon: HiOutlineCube,
    title: "Modular Components",
    description:
      "Frik generates clean, modular code that's easy to understand and maintain, keeping all files under 300 lines for optimal readability.",
  },
  {
    icon: HiOutlineDatabase,
    title: "Integrated Database",
    description:
      "Built-in Supabase integration for authentication, real-time database, and file storage, all accessible through our intuitive interface.",
  },
];

export default function Features() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-2xl text-blue-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Build websites at the speed of thought
          </p>
          <p className="mt-4 max-w-xl text-xl text-gray-500 lg:mx-auto">
            Our Frik platform enables you to create and iterate on websites
            faster than ever before.
          </p>
        </div>

        <div className="mt-10 grid gap-y-10 gap-x-8 md:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="relative pl-16">
              <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <p className="mt-2 text-base text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}