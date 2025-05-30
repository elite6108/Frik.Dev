import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Too short!").required("Password is required"),
});

export default function SignIn({
  onSubmit,
  isLoading,
  error,
  handleGitHubSignIn,
}) {
  return (
    <div className="flex items-center justify-center bg-white dark:bg-gray-800 px-6 py-8 sm:px-6 lg:px-12 w-full md:w-1/2 lg:w-[33%] mx-auto rounded-lg border border-gray-300 dark:border-gray-700">
      <div className="w-full space-y-8">
        <div>
          <h2 className="mt-4 text-center text-3xl font-bold text-gray-700 dark:text-gray-200">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-500">
            Or{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              create a new account
            </Link>
          </p>
        </div>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="flex flex-col space-y-4">
                <div>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="rounded-lg relative block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 placeholder-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    disabled={isLoading}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-700 text-xs mt-1.5"
                  />
                </div>
                <div>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="rounded-lg relative block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 placeholder-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    disabled={isLoading}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-700 text-xs mt-1.5"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-400 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:underline text-xs"
                >
                  Forgot your password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-[80%] block mx-auto py-2.5 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 outline-none disabled:opacity-50 hover:scale-101 cursor-pointer transition-transform duration-200"
              >
                Sign in
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGitHubSignIn}
              disabled={isLoading}
              className="inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer w-[80%] hover:scale-101 outline-none transition-transform duration-200"
            >
              <FaGithub className="w-5 h-5 mr-2" />
              Sign in with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
