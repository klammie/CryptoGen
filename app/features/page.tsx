import Head from "next/head";

const Features = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center pt-10 p-4">
      <Head>
        <title>Features - CryptoTrade</title>
        <meta
          name="description"
          content="Discover the powerful features of CryptoTrade, your trusted platform for cryptocurrency trading."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-700">
          Features
        </h1>

        <div className="space-y-6">
          <section className="p-4 rounded-lg bg-blue-50">
            <h2 className="text-2xl font-semibold mb-2 text-blue-700">
              Advanced Trading Tools
            </h2>
            <p className="text-gray-600">
              CryptoGen offers a suite of advanced trading tools designed to
              empower traders with innovative resources. Access real-time market
              data, customizable charts, and automated trading strategies to
              optimize your trading experience.
            </p>
          </section>

          <section className="p-4 rounded-lg bg-green-50">
            <h2 className="text-2xl font-semibold mb-2 text-green-700">
              High Security Standards
            </h2>
            <p className="text-gray-600">
              Security is our top priority. CryptoGen employs industry-leading
              security measures to protect your assets and personal information.
              Our platform features two-factor authentication, cold storage, and
              end-to-end encryption to ensure the highest level of security.
            </p>
          </section>

          <section className="p-4 rounded-lg bg-yellow-50">
            <h2 className="text-2xl font-semibold mb-2 text-yellow-700">
              User-Friendly Interface
            </h2>
            <p className="text-gray-600">
              Our intuitive interface is designed for both beginners and
              experienced traders. With easy navigation, clear visuals, and
              comprehensive tools, you&apos;ll have everything you need to
              succeed in the world of cryptocurrency trading.
            </p>
          </section>

          <section className="p-4 rounded-lg bg-red-50">
            <h2 className="text-2xl font-semibold mb-2 text-red-700">
              24/7 Customer Support
            </h2>
            <p className="text-gray-600">
              We are committed to providing exceptional customer support. Our
              dedicated team is available 24/7 to assist you with any questions
              or concerns. Whether you need technical assistance or trading
              advice, we&apos;re here to help.
            </p>
          </section>

          <section className="p-4 rounded-lg bg-indigo-50">
            <h2 className="text-2xl font-semibold mb-2 text-indigo-700">
              Diverse Trading Options
            </h2>
            <p className="text-gray-600">
              CryptoGen offers a wide range of trading options to suit your
              needs. Choose from Passive trading, Semi Aggressive trading, and
              Aggressive trading, and explore various cryptocurrencies to
              diversify your portfolio.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Features;
