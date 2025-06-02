import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ReplySchema = Yup.object().shape({
  message: Yup.string().required("Reply cannot be empty"),
});

export default function MyTickets({ tickets, onReply }) {
  const [openTicketId, setOpenTicketId] = useState(null);

  const toggleTicket = (id) => {
    setOpenTicketId((prev) => (prev === id ? null : id));
  };

  const handleReplySubmit = (ticketId, message, resetForm) => {
    if (onReply) {
      onReply(ticketId, {
        from: "user",
        date: new Date().toISOString(),
        message,
      });
    }
    resetForm();
  };

  const statusStyles = {
    open: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400",
    closed: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  };

  const sectionTitleClass =
    "text-sm font-semibold text-gray-800 dark:text-gray-200";

  const paragraphClass = "text-sm text-gray-700 dark:text-gray-300";

  const bubbleClass = "bg-gray-50 dark:bg-gray-700 p-3 rounded-md";

  const ticketBoxClass =
    "p-5 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-300 dark:border-gray-700";

  return (
    <div className="space-y-6">
      {tickets.length > 0 ? (
        tickets.map((ticket) => {
          const isOpen = openTicketId === ticket.id;
          const statusClass =
            statusStyles[ticket.status] || statusStyles.closed;

          return (
            <div key={ticket.id} className={ticketBoxClass}>
              
              <div
                onClick={() => toggleTicket(ticket.id)}
                className="flex justify-between items-start sm:items-center cursor-pointer select-none"
                aria-expanded={isOpen}
                aria-controls={`ticket-${ticket.id}`}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {ticket.subject}
                  </h3>
                  <p className={`mt-1 text-sm line-clamp-2 ${paragraphClass}`}>
                    {ticket.description}
                  </p>
                </div>

                <div className="ml-4 flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${statusClass}`}
                  >
                    {ticket.status}
                  </span>
                  {isOpen ? (
                    <FaChevronUp className="text-gray-500 dark:text-gray-300" />
                  ) : (
                    <FaChevronDown className="text-gray-500 dark:text-gray-300" />
                  )}
                </div>
              </div>

              <div
                id={`ticket-${ticket.id}`}
                className={`border-t border-gray-200 dark:border-gray-600 space-y-5 overflow-hidden transition-all duration-300 px-5 text-gray-700 dark:text-gray-300
                  ${
                    isOpen
                      ? "max-h-[1000px] pb-5 opacity-100 mt-5 pt-5"
                      : "max-h-0 pb-0 opacity-0"
                  }`}
                aria-hidden={!isOpen}
              >
                <div>
                  <h4 className={sectionTitleClass}>Full Description</h4>
                  <p className={`mt-1 ${paragraphClass}`}>{ticket.description}</p>
                </div>

                {ticket.replies?.length > 0 && (
                  <div>
                    <h4 className={`${sectionTitleClass} mb-2`}>Replies</h4>
                    <div className="space-y-3">
                      {ticket.replies.map((reply, index) => (
                        <div key={index} className={bubbleClass}>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {reply.from === "support" ? "Support" : "You"} •{" "}
                            {new Date(reply.date).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-800 dark:text-gray-100">
                            {reply.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {ticket.status !== "closed" && (
                  <div>
                    <h4 className={`${sectionTitleClass} mb-2`}>Write a Reply</h4>
                    <Formik
                      initialValues={{ message: "" }}
                      validationSchema={ReplySchema}
                      onSubmit={(values, { resetForm }) =>
                        handleReplySubmit(ticket.id, values.message, resetForm)
                      }
                    >
                      {({ isSubmitting }) => (
                        <Form className="space-y-2">
                          <Field
                            as="textarea"
                            name="message"
                            rows="3"
                            placeholder="Type your message..."
                            className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm placeholder-gray-400 text-gray-700 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                          <ErrorMessage
                            name="message"
                            component="div"
                            className="text-xs text-red-700"
                          />
                          <div className="flex justify-end">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 transition-all duration-200 cursor-pointer hover:scale-101"
                            >
                              Send Reply
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-700 dark:text-gray-300 text-center">
          You have no tickets.
        </p>
      )}
    </div>
  );
}