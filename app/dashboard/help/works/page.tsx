import { Brain, LineChart, Zap } from "lucide-react";

export default function WorksPage() {
  const steps = [
    {
      number: "01",
      title: "AI Learning & Pattern Recognition",
      description:
        "Our AI uses advanced machine learning to scan vast amounts of market data—analyzing price movements, volatility, trends, volume, and technical indicators. It filters out noise and prioritizes high-probability setups, negating emotional decision-making.",
      icon: Brain,
      color: "from-indigo-500 to-purple-500",
    },
    {
      number: "02",
      title: "Real-Time Market Analysis",
      description:
        "The market is continuously analyzed using advanced computational techniques. Machine learning models separate actionable signals from noise by evaluating trend strength, momentum, support/resistance levels, and macroeconomic influences to deliver precise insights.",
      icon: LineChart,
      color: "from-emerald-500 to-teal-500",
    },
    {
      number: "03",
      title: "Automated Trade Execution",
      description:
        "When optimal conditions are met, our AI executes trades automatically with zero human delay. The system integrates strict risk management strategies, including stop-loss and take-profit settings, to safeguard capital and tailor trades to your risk profile.",
      icon: Zap,
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            How Our AI Trading Works
          </h1>
          <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">
            A fully automated, data-driven approach to maximize your trading potential while managing risk.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-start"
              >
                {/* Icon & Number */}
                <div className="flex-shrink-0 flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-4xl font-bold text-gray-100 hidden md:block">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}