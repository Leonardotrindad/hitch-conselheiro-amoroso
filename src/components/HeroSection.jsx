function HeroSection() {
  return (
    <div className="flex lg:flex-row ">
      <div className="w-full bg-[url('/hero-bg.png')] bg-no-repeat bg-cover bg-center text-left min-h-screen  flex items-start">
        <div className="w-full max-w-none p-8 sm:p-12 lg:px-24 flex flex-col items-center text-center pt-24 sm:pt-28 lg:pt-20">
          
          <h1 className="w-full text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">
            It's not always easy to deal with love. <br /> That's why{" "}
            <span className="text-[#F14A5B] font-oleo-test">Hitch </span>
            exists.
          </h1>
          
          <p className="w-full md:w-10/12 lg:w-8/12 xl:w-7/12 max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed mb-6 mx-auto">
            Hitch uses generative artificial intelligence to understand the
            context of your conversations and offer personalized advice. It
            doesn't judge or take sides — it simply helps you see the situation
            more clearly.
          </p>

          <button
            className="mx-auto flex items-center justify-center w-64 bg-[#F2798F] text-white font-bold 
                       py-3 px-6 
                       border border-gray-900
                       transition-all duration-300 ease-in-out
                       transform 
                       -translate-x-1.5 hover:-translate-y-1.5 
                       shadow-[6px_6px_0px_#111827]">
            <span className="mr-3 text-lg">Let's talk</span>
            <img src="/public/svg/chat.svg" alt="Chat with heart icon" className="ml-3 h-6 w-6" />
          </button>
        </div>
      </div>

      {/* ===== COLUNA DIREITA (IMAGEM) ===== */}
    </div>
  );
}

export default HeroSection;