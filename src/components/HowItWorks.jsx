import React from "react";
import ChatAnimation from "./animations/ChatAnimation";
import AnaliseAnimation from "./animations/AnaliseAnimation";
import IdeaAnimation from "./animations/IdeaAnimation";

function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Share Your Context",
      description:
        "Describe your situation. The more details, the better our AI can understand.",
      Animation: ChatAnimation,
    },
    {
      id: 2,
      title: "AI Analysis",
      description:
        "Hitch analyzes patterns and emotions impartially, without judgment.",
      Animation: AnaliseAnimation,
    },
    {
      id: 3,
      title: "Receive Your Perspective",
      description:
        "Receive clear advice that helps you see the situation from a new angle.",
      Animation: IdeaAnimation,
    },
  ];

return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#fcf3f1]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
                Here's how{" "}
                <span className="text-[#F14A5B] font-oleo-test">Hitch</span> helps.
            </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 text-center mb-8 sm:mb-12 px-4 sm:px-0">
            Hitch isn't just a chatbot. It's a purpose-built tool designed to give you the insights
            you need, right when you need them.
          </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
                {steps.map((step) => {
                    const AnimationComponent = step.Animation;

                    return (
                        <div
                            key={step.id}
                            className={`bg-white border border-gray-900 shadow-md
                                       flex flex-col 
                                       transition-all duration-300 ease-in-out
                                       transform 
                                       hover:-translate-x-1 hover:-translate-y-1 sm:hover:-translate-x-1.5 sm:hover:-translate-y-1.5 
                                       hover:shadow-[4px_4px_0px_#111827] sm:hover:shadow-[6px_6px_0px_#111827]
                                      `}
                        >
                            <div className="p-3 sm:p-4 rounded-t-lg">
                                <AnimationComponent />
                            </div>

                            <div className="p-4 sm:p-6 text-left">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                                    {step.title}
                                </h3>

                                <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <span className="text-xs sm:text-sm text-gray-500 mt-8 sm:mt-12 block text-center px-4 sm:px-0">
                *Please note: Hitch is an AI for entertainment and insights. It does
                not replace professional or therapeutic advice. The process is
                anonymous and your conversations are not stored.*
            </span>{" "}
        </div>
    </section>
);
}

export default HowItWorks;
