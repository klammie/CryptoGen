import Link from "next/link";
import { BookOpen, HelpCircle, HeadphonesIcon, ArrowRight } from "lucide-react";

export default function HelpPage() {
  const helpOptions = [
    {
      title: "How it Works",
      description: "Learn how our AI trading system analyzes the market and executes trades.",
      href: "/dashboard/help/works",
      icon: BookOpen,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Frequently Asked Questions",
      description: "Find quick answers to common questions about accounts, deposits, and trading.",
      href: "/dashboard/help/faq",
      icon: HelpCircle,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Customer Support",
      description: "Need personalized help? Reach out to our dedicated support team.",
      href: "/dashboard/help/support",
      icon: HeadphonesIcon,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            How can we help you?
          </h1>
          <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">
            Explore our resources or get in touch with our support team.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {helpOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.href}
                href={option.href}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col"
              >
                <div className={`w-12 h-12 rounded-xl ${option.color} flex items-center justify-center mb-5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {option.title}
                </h2>
                <p className="text-sm text-gray-500 flex-1 mb-4">
                  {option.description}
                </p>
                <div className="flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}