import { useState } from "react";
import Tabs from "../components/HelpPage/Tabs";
import FaqCard from "../components/FaqCard";
import TicketForm from "../components/HelpPage/TicketForm";
import MyTickets from "../components/HelpPage/MyTickets";

export default function Help() {
  const [activeTab, setActiveTab] = useState("faq");

  const tabs = [
    { id: "faq", label: "FAQ" },
    { id: "submit", label: "Submit a Ticket" },
    { id: "tickets", label: "My Tickets" },
  ];

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        'Click on "Forgot Password" at the login page and follow the instructions.',
    },
    {
      question: "How can I contact support?",
      answer: 'You can submit a ticket through the "Submit a Ticket" tab.',
    },
  ];

  const tickets = [
  {
    id: 1,
    subject: "Issue logging in",
    description: "I'm having trouble logging in with my credentials.",
    status: "open",
    replies: [
      {
        from: "support",
        date: "2025-05-01T10:00:00Z",
        message: "Please reset your password and try again.",
      },
      {
        from: "user",
        date: "2025-05-01T11:00:00Z",
        message: "That worked, thanks!",
      },
    ],
  },
  {
    id: 2,
    subject: "Billing discrepancy",
    description:
      "I was charged twice for my monthly subscription on May 1st.",
    status: "open",
    replies: [
      {
        from: "support",
        date: "2025-05-02T08:30:00Z",
        message: "We’re sorry for the inconvenience. A refund is being processed.",
      },
    ],
  },
  {
    id: 3,
    subject: "Feature request: Dark mode",
    description:
      "It would be great to have a dark mode option for better usability at night.",
    status: "closed",
    replies: [
      {
        from: "support",
        date: "2025-04-28T15:15:00Z",
        message: "Thanks for the suggestion! This feature is now available.",
      },
      {
        from: "user",
        date: "2025-04-28T16:00:00Z",
        message: "Awesome! Loving it already.",
      },
    ],
  }
  ];

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-12 py-20">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
        Help & Support
      </h1>
      <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 text-center mb-8">
        Have a question or need assistance? We're here to help!
      </p>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      <div className="mt-12">
        {activeTab === "faq" && (
          <>
            <div className="space-y-5">
              {faqs.map((faq, index) => (
                <FaqCard
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </>
        )}
        {activeTab === "submit" && <TicketForm />}
        {activeTab === "tickets" && <MyTickets tickets={tickets} />}
      </div>
    </div>
  );
}
