import { Formik, Form, Field } from 'formik';

export default function Profile({ initialValues, onSubmit }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-colors duration-200">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Update your personal information
        </p>
      </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="p-6 space-y-6">
            {['name', 'company', 'role'].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize"
                >
                  {field}
                </label>
                <Field
                  id={field}
                  name={field}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            ))}

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 cursor-pointer py-2.5 bg-blue-600 text-white rounded-md shadow-sm hover:scale-101 transition-all duration-200"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}