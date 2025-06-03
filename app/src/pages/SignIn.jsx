import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email.").required("Email is required."),
  password: Yup.string().min(8, "Password must contain atleast 8 characters.").required("Password is required."),
});

const TextInput = ({
  name,
  type,
  placeholder,
  isLoading,
  showToggle = false,
  showPassword,
  togglePassword,
}) => (
  <div>
    <div className="relative h-11">
      <Field
        id={name}
        name={name}
        type={showToggle && showPassword ? "text" : type}
        placeholder={placeholder}
        className="w-full h-full px-3 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        disabled={isLoading}
      />
      {showToggle && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-gray-500"
          tabIndex={-1}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}
    </div>
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-700 text-xs mt-2"
    />
  </div>
);

export default function SignIn({
  onSubmit,
  isLoading,
  error,
  handleGitHubSignIn,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex items-center justify-center bg-white dark:bg-gray-800 px-6 py-8 sm:px-6 lg:px-12 w-full md:w-1/2 lg:w-[33%] mx-auto rounded-lg border border-gray-300 dark:border-gray-700 mt-20">
      <div className="w-full space-y-8">
        <div>
          <h2 className="mt-4 text-center text-3xl font-bold text-gray-700 dark:text-gray-200">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
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
            <Form className="space-y-6">
              <TextInput
                name="email"
                type="email"
                placeholder="Email address"
                isLoading={isLoading}
              />
              <TextInput
                name="password"
                type="password"
                placeholder="Password"
                isLoading={isLoading}
                showToggle
                showPassword={showPassword}
                togglePassword={togglePassword}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-700 dark:text-gray-400 cursor-pointer">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                  />
                  <span className="ml-2">Remember me</span>
                </label>
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
                className="w-[80%] mx-auto block py-2.5 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 hover:scale-101 transition-transform duration-200 cursor-pointer"
              >
                Sign in
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-4 w-[80%] mx-auto">
            <button
              onClick={handleGitHubSignIn}
              disabled={isLoading}
              className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 hover:scale-101 transition-transform duration-200 cursor-pointer"
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