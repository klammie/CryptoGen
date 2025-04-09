import Image from "next/image";
import AiLearning from "@/public/artificial-intelligence.png";
import Analyze from "@/public/analyze.png";
import Execute from "@/public/buy.png";

export default function Worksroute() {
  return (
    <div className="flex flex-col gap-10 mx-5 pb-4">
      <div className="font-bold text-xl text-center">
        <h1 className="text-3xl pb-5 pt-10 lg:text-4xl">
          How does it work you might ask?
        </h1>
      </div>

      {/* AI Learning Section */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <Image
          src={AiLearning}
          alt="AI Learning"
          className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
        />
        <div className="text-center md:text-left md:pl-10">
          <h4 className="text-lg font-semibold mb-3">
            Our AI is trained to identify specific market conditions
          </h4>
          <p className="text-sm md:text-base leading-6">
            Our AI uses advanced machine learning to scan vast amounts of market
            data—analyzing price movements, volatility, trends, volume, and
            technical indicators—to spot key trading conditions like trends,
            consolidations, breakouts, and reversals. By continuously learning
            and adapting, it filters out noise and prioritizes high-probability
            setups, negating emotional decision-making and aligning strategies
            with the user's risk profile to maximize trading returns.
          </p>
        </div>
      </div>

      {/* Analyze Market Section */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="text-center md:text-right md:pr-10">
          <h4 className="text-lg font-semibold mb-3">
            The market is then analyzed for these conditions
          </h4>
          <p className="text-sm md:text-base leading-6">
            The market is analyzed using advanced computational techniques that
            process real-time data such as price fluctuations, volume, and
            technical indicators to identify conditions matching predefined
            criteria. Machine learning models separate actionable signals from
            noise by evaluating factors like trend strength, momentum, support
            and resistance levels, and macroeconomic influences. This
            continuous, data-driven analysis enables the AI to deliver precise
            and timely insights for informed trading decisions.
          </p>
        </div>
        <Image
          src={Analyze}
          alt="Analyze Market"
          className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
        />
      </div>

      {/* Trade Execution Section */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <Image
          src={Execute}
          alt="Trade Execution"
          className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
        />
        <div className="text-center md:text-left md:pl-10">
          <h4 className="text-lg font-semibold mb-3">
            When conditions are met trades are executed
          </h4>
          <p className="text-sm md:text-base leading-6">
            When market conditions are met, our AI executes trades automatically
            using advanced algorithms for optimal timing and precision. It
            continuously monitors key signals like breakouts, reversals, and
            volatility shifts eliminating human delay and hesitation. The system
            also integrates risk management strategies, including stop-loss and
            take-profit settings, to safeguard capital and tailor trades to
            individual risk profiles, ensuring even the smallest opportunities
            are seized in dynamic market environments.
          </p>
        </div>
      </div>
    </div>
  );
}
