import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .required("New password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match.")
    .required("Please confirm your password."),
});

export default function ResetPassword({ onSubmit, isLoading, error, token }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex items-center justify-center bg-white dark:bg-gray-800 px-6 py-8 sm:px-6 lg:px-12 w-full md:w-1/2 lg:w-[33%] mx-auto rounded-lg border border-gray-300 dark:border-gray-700 mt-15">
      <div className="w-full space-y-4">
        <h2 className="text-center text-3xl font-bold text-gray-700 dark:text-gray-200">
          Reset password
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Enter a new password for your account.
        </p>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit({ token, newPassword: values.password });
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              
              <div className="relative h-11">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="w-full h-full px-3 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-700 text-xs mt-2"
                />
              </div>

              <div className="relative h-11 mt-8 mb-10">
                <Field
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full h-full px-3 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
                >
                  {showConfirm ? <FaEye /> : <FaEyeSlash />}
                </button>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-700 text-xs mt-2"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-[60%] mx-auto block py-2.5 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 hover:scale-101 transition-transform duration-200 cursor-pointer"
              >
                Reset Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}