import { Formik, Form, Field } from 'formik';

export default function Security({ onSubmit }) {
  return (
    <div className="space-y-8">
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm transition-colors duration-200">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Change Password</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Update your password to keep your account secure
          </p>
        </div>

        <Formik
          initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="p-6 space-y-6">
              {['currentPassword', 'newPassword', 'confirmPassword'].map((field, idx) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize"
                  >
                    {field.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <Field
                    type="password"
                    id={field}
                    name={field}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm cursor-pointer transition-all duration-200 hover:scale-101"
                >
                  Update Password
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}