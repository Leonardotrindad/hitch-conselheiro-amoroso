import { Link } from "react-router-dom";
import { useState } from "react";


function HeroSection() {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <div className="flex lg:flex-row relative">
      <div data-testid="hero-bg" className="w-full bg-[url('/bg-mobile.png')] md:bg-[url('/hero-bg.png')] bg-no-repeat bg-cover bg-center text-left min-h-screen flex items-start justify-center" style={{backgroundAttachment: 'scroll'}}>
        <div className="w-full max-w-4xl p-4 sm:p-8 md:p-12 lg:px-16 flex flex-col items-center text-center pt-48 sm:pt-52 md:pt-56">
          
          {/* Bloco do texto principal e Learn more - mais próximo da logo */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 mb-48 sm:mb-52 md:mb-56">
            <h1 className="w-full text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight">
              It's not always easy to deal with love. <br className="hidden sm:block" /> 
              <span className="sm:hidden"> </span>That's why{" "}
              <span data-testid="hitch-name" className="text-[#F14A5B] font-oleo-test">Hitch </span>
              exists.
            </h1>
            
            <div className="w-full max-w-xl mx-auto px-4 sm:px-0">
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="group relative inline-flex items-center gap-2 text-sm sm:text-base md:text-lg text-gray-700 hover:text-[#F14A5B] transition-all duration-300 font-medium"
              >
                <span>Learn more</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${showDescription ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F14A5B] group-hover:w-full transition-all duration-300"></div>
              </button>
              
              {showDescription && (
                <div data-testid="hero-description" className="mt-6 overflow-hidden">
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg transform transition-all duration-500 ease-out animate-in slide-in-from-top">
                    Hitch uses generative artificial intelligence to understand the
                    context of your conversations and offer personalized advice. It
                    doesn't judge or take sides — it simply helps you see the situation
                    more clearly.
                  </p>
                </div>
              )}
            </div>
          </div>

          <Link to="/chat"
            className="mx-auto  flex items-center justify-center w-40 sm:w-48 md:w-56 bg-[#F2798F] text-white font-bold 
                       py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 
                       border border-gray-900
                       transition-all duration-300 ease-in-out
                       transform 
                       -translate-x-1 sm:-translate-x-1.5 hover:-translate-y-1 sm:hover:-translate-y-1.5 
                       shadow-[4px_4px_0px_#111827] sm:shadow-[6px_6px_0px_#111827]">
            <span className="mr-2 sm:mr-3 text-sm sm:text-base md:text-lg">Let's talk</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;