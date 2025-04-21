import { Button } from "@/components/ui/button";
import Head from "next/head";
import Image from "next/image"; // ✅ Import Next.js Image component

const Affiliate = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex flex-col items-center p-4">
      <Head>
        <title>Affiliate Program - CryptoGen</title>
        <meta
          name="description"
          content="Join the CryptoGen Affiliate Program and earn commissions for promoting our platform."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex flex-col w-full max-w-4xl">
        <div className="flex flex-col md:flex-row mb-6">
          <div className="md:w-1/2">
            {/* ✅ Using Next.js Image component */}
            <Image
              src="/assets/3d-cryptocurrency-rendering-design.jpg"
              alt="Affiliate Image"
              className="w-full h-auto rounded-md shadow-lg"
              width={600} // Explicit width
              height={400} // Explicit height
              priority // Fast loading optimization
            />
          </div>
          <div className="md:w-1/2 md:pl-6 flex flex-col justify-center">
            <h1 className="text-3xl font-bold my-4">Earn BIG Commissions</h1>
            <h3 className="text-lg mb-2">
              Becoming an affiliate is easy, profitable, and FREE.
            </h3>
            <p className="text-base mb-20">
              The CryptoGen Affiliate Program is designed to reward you for
              promoting our platform. By joining our program, you can earn
              generous commissions every time a user uses your promo code.
            </p>
            <a href="/home">
              <Button>Sign up</Button>
            </a>
          </div>
        </div>
        <div className="flex mt-4 flex-col gap-5 md:flex-row">
          <section className="p-6 bg-green-50 rounded-lg shadow-md mb-6 md:mb-0 md:w-1/3">
            <h2 className="text-3xl font-semibold mb-4 text-green-700">
              How It Works
            </h2>
            <p className="text-gray-700 mb-4">
              Getting started with our affiliate program is simple:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>
                Sign up for our affiliate program and get your unique promo
                code.
              </li>
              <li>
                Share your promo code with your audience through various
                channels.
              </li>
              <li>
                Earn commissions for every new user who uses your promo code and
                starts trading.
              </li>
            </ol>
          </section>
          <section className="p-6 bg-yellow-50 rounded-lg shadow-md mb-6 md:mb-0 md:w-1/3">
            <h2 className="text-3xl font-semibold mb-4 text-yellow-700">
              Affiliate Benefits
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Generous commission rates</li>
              <li>Real-time tracking and reporting</li>
              <li>Marketing materials and support</li>
              <li>Exclusive promotions and bonuses</li>
              <li>Timely payouts</li>
              <li>Affiliate Contest</li>
              <li>Dedicated affiliate manager for personalized support</li>
              <li>Access to exclusive webinars and training sessions</li>
            </ul>
          </section>
          <section className="p-6 bg-red-50 rounded-lg shadow-md md:w-1/3">
            <h2 className="text-3xl font-semibold mb-4 text-red-700">
              Join Now
            </h2>
            <p className="text-gray-700">
              Ready to start earning with CryptoGen? Join our affiliate program
              today and take the first step towards financial freedom. Click the
              button above to sign up and get your unique promotional code.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Affiliate;
