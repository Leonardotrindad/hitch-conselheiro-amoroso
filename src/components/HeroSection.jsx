import React from 'react';

function HeroSection() {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start p-8 lg:p-20">
        
        <div className="max-w-lg">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">
            It's not always easy to deal with love. <br /> That's why{" "}
            <span className="text-[#F14A5B] font-oleo-test">Hitch </span>
            exists.
          </h1>

    

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10">
            Hitch uses generative artificial intelligence to understand the
            context of your conversations and offer personalized advice. It
            doesn't judge or take sides — it simply helps you see the situation
            more clearly.
          </p>

        
     
          <button
            className="flex items-center bg-[#F2798F] text-white font-bold 
            w-full justify-center
                       py-4 px-8
                       border border-gray-900
                       transition-all duration-300 ease-in-out
                       transform 
                   
                       -translate-x-1.5 -translate-y-1.5
                       shadow-[6px_6px_0px_#111827]

                       hover:bg-pink-600
                      "
          >
            <span className="mr-3 text-xl">Let's talk</span>
            <img src="/public/svg/chat.svg" alt="Chat with heart icon" className="ml-2 h-7 w-7" />
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2  flex justify-center items-center p-8 lg:p-16">
        
        <img 
          src="/public/img_home.png" 
          alt="home" 
          className="w-full max-w-3xl h-auto"
        />
      </div>
    </div>
  );
}

export default HeroSection;