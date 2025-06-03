import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TextAreaInput = ({ name, placeholder, isLoading, rows = 4 }) => (
  <div>
    <Field
      as="textarea"
      id={name}
      name={name}
      rows={rows}
      placeholder={placeholder}
      disabled={isLoading}
      className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 text-gray-700 dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-800 text-xs mt-2"
    />
  </div>
);

const TextInput = ({ name, type = "text", placeholder, isLoading }) => (
  <div>
    <Field
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      disabled={isLoading}
      className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 text-gray-700 dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-800 text-xs mt-2"
    />
  </div>
);

const TicketFormSchema = Yup.object().shape({
  subject: Yup.string().required("Subject is required."),
  description: Yup.string().required("Description is required."),
});

export default function TicketForm({ isLoading = false, onSubmit }) {
  const initialValues = {
    subject: "",
    description: "",
  };

  return (
    <div className="w-full md:w-1/2 lg:w-[37%] mx-auto bg-white dark:bg-gray-800 px-6 py-8 rounded-lg border border-gray-300 dark:border-gray-700">
      <h2 className="text-2xl font-medium text-center text-gray-800 dark:text-gray-100 mb-6">
        Submit a Support Ticket
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={TicketFormSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit?.(values);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <TextInput
              name="subject"
              type="text"
              placeholder="Subject"
              isLoading={isLoading}
            />
            <TextAreaInput
              name="description"
              placeholder="Describe your issue"
              isLoading={isLoading}
              rows={6}
            />
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-1/2 mx-auto block py-3 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 hover:scale-101 transition-transform duration-200 cursor-pointer"
            >
              Submit Ticket
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}