import { useState } from "react";
import PricingCard from "../components/PricingCard";
import FaqCard from "../components/FaqCard";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started with basic web development",
      price: {
        monthly: 0,
        annually: 0,
      },
      features: [
        "Up to 3 projects",
        "Basic AI code generation",
        "Standard templates",
        "Community support",
      ],
      cta: "Get Started",
      ctaLink: "",
      highlight: false,
    },
    {
      name: "Pro",
      description: "For developers who need more power and features",
      price: {
        monthly: 19,
        annually: 190,
      },
      features: [
        "Unlimited projects",
        "Advanced AI code generation",
        "Premium templates",
        "Priority support",
        "Custom domains",
        "Export options",
        "No watermarks",
      ],
      cta: "Upgrade Now",
      ctaLink: "",
      highlight: true,
    },
    {
      name: "Team",
      description: "For teams and businesses with advanced needs",
      price: {
        monthly: 49,
        annually: 490,
      },
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Role-based permissions",
        "Analytics dashboard",
        "API access",
        "Dedicated support",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      ctaLink: "",
      highlight: false,
    },
  ];

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit towards your next billing cycle.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "We offer a 14-day free trial on all paid plans. No credit card required to start. You can experience all the features before making a decision.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and for annual plans, we can also provide invoicing options for enterprise customers.",
    },
    {
      question: "Is there a long-term commitment?",
      answer:
        "No, all our plans are subscription-based and you can cancel at any time. For annual plans, you pay upfront for the year but can still cancel anytime (no refunds for partial years).",
    },
  ];

  const billingOptions = [
    { label: "Monthly", value: "monthly" },
    { label: "Annually", value: "annually", badge: "Save 20%" },
  ];

  return (
    <div className="pt-20 pb-16 px-2 sm:px-6 lg:px-8 w-full bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Choose the perfect plan for your needs. Always know what you'll pay.
        </p>

        <div className="flex justify-center mt-8">
          <div className="relative flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {billingOptions.map(({ label, value, badge }) => {
              const isActive = billingPeriod === value;
              return (
                <button
                  key={value}
                  onClick={() => setBillingPeriod(value)}
                  className={`relative w-32 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none cursor-pointer
                    ${
                      isActive
                        ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  {label}
                  {badge && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mx-auto px-4">
        {plans.map((plan, index) => (
          <PricingCard key={index} plan={plan} billingPeriod={billingPeriod} />
        ))}
      </div>

      <div className="mt-20 mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-50 mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <FaqCard key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}
