import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function PricingCard({ plan, billingPeriod }) {
  const price = billingPeriod === 'monthly' ? plan.price.monthly : plan.price.annually;
  const savings = plan.price.monthly && plan.price.annually
    ? Math.round(((plan.price.monthly * 12 - plan.price.annually) / (plan.price.monthly * 12)) * 100)
    : 0;

  const priceSuffix = billingPeriod === 'monthly' ? 'month' : 'year';

  const containerStyles = plan.highlight
    ? 'border-2 border-blue-500 dark:border-blue-400 shadow-2xl relative bg-gradient-to-br from-blue-50/60 to-white/80 dark:from-blue-950/30 dark:to-gray-800/40 backdrop-blur-sm'
    : 'border border-gray-200 dark:border-gray-700 shadow-lg bg-white/80 dark:bg-gray-800/60 backdrop-blur';

  return (
    <div className={`rounded-2xl overflow-hidden hover:shadow-xl ${containerStyles}`}>
      {plan.highlight && (
        <div className="absolute top-0 inset-x-0 px-4 py-3.5 bg-blue-600 text-white text-sm font-semibold text-center rounded-t-2xl tracking-wide">
          Most Popular
        </div>
      )}

      <div className={`p-8 h-full flex flex-col ${plan.highlight ? 'pt-14' : ''}`}>
        <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">{plan.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-grow leading-relaxed">{plan.description}</p>

        <div className="mb-8">
          <div className="flex items-end justify-center gap-2">
            <span className="text-5xl font-bold text-gray-800 dark:text-white">${price}</span>
            {price > 0 && (
              <span className="text-gray-500 dark:text-gray-400 text-base">/{priceSuffix}</span>
            )}
          </div>
          {billingPeriod === 'annually' && savings > 0 && (
            <p className="text-green-600 dark:text-green-400 text-sm mt-2">
              Save {savings}% annually
            </p>
          )}
        </div>

        <ul className="space-y-4 mb-8 text-sm text-left">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 leading-snug">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          to={plan.ctaLink}
          className={`w-full py-3 px-4 rounded-xl text-center font-medium hover:scale-101 transition-all duration-200 border ${
            plan.highlight
              ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600'
          }`}
        >
          {plan.cta}
        </Link>
      </div>
    </div>
  );
}