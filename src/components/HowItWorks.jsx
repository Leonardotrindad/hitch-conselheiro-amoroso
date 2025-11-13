import React from 'react';
import ChatAnimation from './animations/ChatAnimation'; 
import AnaliseAnimation from './animations/AnaliseAnimation'; 
import IdeaAnimation from './animations/IdeaAnimation'; 

function HowItWorks() {
    
    const steps = [
        {
            id: 1,
            title: "Share Your Context",
            description: "Describe your situation. The more details, the better our AI can understand.",
            Animation: ChatAnimation,
        },
        {
            id: 2,
            title: "AI Analysis",
            description: "Hitch analyzes patterns and emotions impartially, without judgment.",
            Animation: AnaliseAnimation,
        },
        {
            id: 3,
            title: "Receive Your Perspective",
            description: "Receive clear advice that helps you see the situation from a new angle.",
            Animation: IdeaAnimation,
        }
    ];

    return (
        <section className="py-20 bg-[#fcf3f1]"> 
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
  Here's how <span className="text-[#F14A5B] font-oleo-test">Hitch</span> helps.
</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    
                    {steps.map((step) => {
                        const AnimationComponent = step.Animation; 

                        return (
                            <div 
                                key={step.id} 
                                className={`bg-white border border-gray-900 shadow-md
                                           flex flex-col 
                                           transition-all duration-300 ease-in-out
                                           transform 
                                           hover:-translate-x-1.5 hover:-translate-y-1.5 
                                           hover:shadow-[6px_6px_0px_#111827]
                                          `}
                            >
                                
                                <div className=" p-4 rounded-t-lg">
                                    <AnimationComponent /> 
                                </div>
                                
                                
                                <div className="p-6 text-left">
                                    
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {step.title}
                                    </h3>

                                    <p className="text-gray-600">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
