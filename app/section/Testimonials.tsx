"use client";

import avatar1 from "@/public/assets/avatar-1.png";
import avatar2 from "@/public/assets/avatar-2.png";
import avatar3 from "@/public/assets/avatar-3.png";
import avatar4 from "@/public/assets/avatar-4.png";
import avatar5 from "@/public/assets/avatar-5.png";
import avatar6 from "@/public/assets/avatar-6.png";
import avatar7 from "@/public/assets/avatar-7.png";
import avatar8 from "@/public/assets/avatar-8.png";
import avatar9 from "@/public/assets/avatar-9.png";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const testimonials = [
  {
    text: "Ive connected this app with the Meta Trader 5 Investor login and manage my trades through MetaTrader 5",
    imageSrc: avatar1.src,
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  {
    text: "I was a bit sceptical about this website but it has been 4 months now and I have no issue. I've made over $7,000",
    imageSrc: avatar2.src,
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "Heard about this Website from a friend about 8 Months ago and I'm surprised its not more popular. Been making money ever since",
    imageSrc: avatar3.src,
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "Unmatched Affiliate Rewards, Compared to the other companies that does affiliate, This one pays out waaayyy more!",
    imageSrc: avatar4.src,
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "I am a Beginner in Trading and I have made more through this website than trading on my own.",
    imageSrc: avatar5.src,
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "I've made over $200 in less than a week from the Passive account.",
    imageSrc: avatar6.src,
    name: "Erica Stan",
    username: "@ericadastan",
  },
  {
    text: "Easy to use, I am literally making money from the click of a button.",
    imageSrc: avatar7.src,
    name: "Jordan Petels",
    username: "@jpateldesign",
  },
  {
    text: "Customer Service took a while to respond but they solved my problem.",
    imageSrc: avatar8.src,
    name: "Leigh-Ann Dawson",
    username: "@leedaw-tech",
  },
  {
    text: "A Pro trader here, I must say this trading platform takes the emotions out of trading and you dont have to have prior trading knowledge.",
    imageSrc: avatar9.src,
    name: "Tim Harper",
    username: "@tharper9",
  },
  {
    text: "This site is a LIFESAVER. I was in so much debt and wanted to make some quick cash",
    imageSrc: avatar1.src,
    name: "David Lamel",
    username: "@lameldd",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => (
  <div className={props.className}>
    <motion.div
      animate={{
        translateY: "-50%",
      }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...new Array(2)].fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(({ text, imageSrc, name, username }, idx) => (
            <div className="card" key={idx}>
              <div className="text-black">{text}</div>
              <div className="flex items-center gap-2 mt-5">
                <Image
                  src={imageSrc}
                  alt={name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex text-black flex-col">
                  <div className="font-medium tracking-tight leading-5">
                    {name}
                  </div>
                  <div className="leading-5 tracking-tight">{username}</div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  return (
    <section className="bg-white">
      <div className="container">
        <div className="section-heading">
          <div className="flex justify-center gap-6">
            <div className="tag text-black font-semi-bold">Testimonials</div>
          </div>
          <h2 className="section-title mt-5">What our users say</h2>
          <p className="section-description my-5">
            See for yourself what our satisfied users have to say. Join now and
            your success story could be next!
          </p>
        </div>
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};
