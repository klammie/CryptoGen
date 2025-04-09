"use client";
import { useRef } from "react";
import Head from "next/head";

const About = () => {
  const heroRef = useRef(null);

  return (
    <div className="w-full min-h-screen">
      <Head>
        <title>About Us - CryptoGen</title>
        <meta
          name="description"
          content="Learn more about CryptoGen, your trusted platform for cryptocurrency trading."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <section
        ref={heroRef}
        className="flex flex-col justify-center items-center px-4 py-10 min-h-screen bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-hidden"
      >
        <div className="flex justify-center items-center w-full">
          <img
            className="w-11/12 sm:w-3/4 lg:w-1/2 h-auto rounded-lg mx-auto"
            src="/assets/StockCake-Robot Analyzing Data_1742163711.jpg"
            alt="Ceo"
          />
        </div>
        <div className="flex flex-col px-4 md:px-8 items-center lg:px-16">
          <div className="flex flex-col items-center mx-auto gap-8">
            <div className="w-full text-center">
              <h1 className="text-4xl font-bold m-4 text-white">About Us</h1>
              <p className="text-lg text-center leading-7 text-white">
                I remember when I was first introduced to trading. Even though I
                was aware of the risks, I still lost a lot. It took me about two
                years of consistent learning and analyzing the market to start
                recovering some of my losses. I share this because trading is
                not as easy as many people online make it seem. In fact, some
                even have affiliate programs with trading platforms, earning
                commissions whether you win or lose. Now, imagine an application
                created by traders, for traders. An application designed to
                eliminate those long hours spent sitting in front of a computer
                analyzing the market, implementing strategies, and waiting for
                setups to play out. No more entering trades too early out of
                fear of missing out, or too late due to a lack of confidence in
                your strategy. In summary, trading can be profitable if you take
                the time to learn the core fundamentals and understand how the
                market works. However, pairing that knowledge with emotional
                control can take years to develop. Unfortunately, in trading, a
                loss means losing money, which is something no one likes. That’s
                where <strong>CryptoGren</strong> comes in.{" "}
                <strong>CryptoGren</strong> removes the hard work and mental
                strain from trading, offering a one-click interface powered by
                cutting-edge artificial intelligence. This AI is specifically
                developed to analyze the market 24/7, searching for A+
                strategies, executing trades within split seconds with optimal
                risk management depending on the account type and with ZERO
                emotions. Our application has been tested over time and proven
                to maximize profits, all with just one click, allowing you to
                enjoy what you love. Not sure where to start? We also offer demo
                accounts to help you get acquainted with the app. Manage trades
                through our app or connect to the MetaTrader Investor login.
              </p>

              <div className="flex flex-col md:flex-row justify-center items-center md:pt-10 mt-6 text-white gap-4">
                <div className="w-full md:w-1/3 text-center">
                  <h2 className="text-lg font-medium">Win Rate</h2>
                  <p className="text-2xl text-orange-400 font-semibold">+78%</p>
                </div>
                <div className="w-full md:w-1/3 text-center">
                  <h2 className="text-lg font-medium">Active Users</h2>
                  <p className="text-2xl text-orange-400 font-semibold">
                    +31,600
                  </p>
                </div>
                <div className="w-full md:w-1/3 text-center">
                  <h2 className="text-lg font-medium">Amount Paid-Out</h2>
                  <p className="text-2xl text-orange-400 font-semibold">
                    +$17,045,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
