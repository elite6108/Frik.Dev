import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPassword({ onSubmit, isLoading, error }) {
  return (
    <div className="flex items-center justify-center bg-white dark:bg-gray-800 px-6 py-8 sm:px-6 lg:px-12 w-full md:w-1/2 lg:w-[33%] mx-auto rounded-lg border border-gray-300 dark:border-gray-700 mt-35">
      <div className="w-full space-y-4">
        <h2 className="text-center text-3xl font-bold text-gray-700 dark:text-gray-200">
          Forgot password?
        </h2>
        <p className="text-center text-sm md:text-base text-gray-600 dark:text-gray-400">
          Enter your email we will send you a link to reset it.
        </p>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values.email);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={isLoading}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-700 text-xs mt-2"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-[60%] mx-auto block py-2.5 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 hover:scale-101 transition-transform duration-200 cursor-pointer"
              >
                Send reset link
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}