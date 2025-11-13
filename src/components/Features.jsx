import React from 'react';
// Ícones para cada feature (ainda podemos usá-los no texto)
import { HiLockClosed, HiClock, HiOutlineScale } from 'react-icons/hi';

// Dados da feature 1
const feature1 = {
  name: 'Total Privacy',
  description: "Your conversations are 100% private and encrypted. We don't judge, we just help.",
  icon: HiLockClosed,
  // Você substituiria este placeholder por sua ilustração
  imageUrl: 'https://placehold.co/600x400/F2798F/white?text=Illustration+1\\n(Privacy)',
};

// Dados da feature 2
const feature2 = {
  name: 'Available 24/7',
  description: 'Get instant advice anytime, day or night, exactly when you need it.',
  icon: HiClock,
  imageUrl: 'https://placehold.co/600x400/F2798F/white?text=Illustration+2\\n(24/7+Availability)',
};

// Dados da feature 3
const feature3 = {
  name: 'Impartial Analysis',
  description: 'Hitch uses AI to understand context and offer a neutral perspective, without taking sides.',
  icon: HiOutlineScale,
  imageUrl: 'https://placehold.co/600x400/F2798F/white?text=Illustration+3\\n(Impartial+AI)',
};

function Features() {
  return (
    // Container principal da seção
    <div className="bg-[url('/public/img_features.png')] py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Título da Seção (igual ao de antes, centralizado) */}
        <div className="mx-auto max-w-2xl lg:text-center mb-16 sm:mb-24">
          <p className="text-base font-semibold leading-7 text-[#F14A5B]">
            How it helps
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for clarity
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Hitch isn't just a chatbot. It's a purpose-built tool designed to give you the insights
            you need, right when you need them.
          </p>
        </div>

        {/* Layout de 3 seções empilhadas */}
        <div className="space-y-24">
          
          {/* --- Feature 1: Text | Image --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Coluna de Texto */}
            <div className="lg:pr-8">
              <div className="flex items-center mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2798F] mr-4">
                  <feature1.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <h3 className="text-2xl font-bold text-gray-900">{feature1.name}</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {feature1.description}
              </p>
            </div>
            {/* Coluna de Imagem */}
            <div>
              <img 
                src={feature1.imageUrl} 
                alt={feature1.name} 
                className="w-full h-auto rounded-lg shadow-xl"
                onError={(e) => e.target.src = 'https://placehold.co/600x400?text=Image+Failed'}
              />
            </div>
          </div>

          {/* --- Feature 2: Image | Text --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Coluna de Imagem (Primeiro no mobile, mas segundo no desktop com 'lg:order-last') */}
            <div className="lg:order-last">
              <img 
                src={feature2.imageUrl} 
                alt={feature2.name} 
                className="w-full h-auto rounded-lg shadow-xl"
                onError={(e) => e.target.src = 'https://placehold.co/600x400?text=Image+Failed'}
              />
            </div>
            {/* Coluna de Texto (Segundo no mobile, mas primeiro no desktop) */}
            <div className="lg:pl-8">
              <div className="flex items-center mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2798F] mr-4">
                  <feature2.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <h3 className="text-2xl font-bold text-gray-900">{feature2.name}</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {feature2.description}
              </p>
            </div>
          </div>

          {/* --- Feature 3: Text | Image --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Coluna de Texto */}
            <div className="lg:pr-8">
              <div className="flex items-center mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2798F] mr-4">
                  <feature3.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <h3 className="text-2xl font-bold text-gray-900">{feature3.name}</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {feature3.description}
              </p>
            </div>
            {/* Coluna de Imagem */}
            <div>
              <img 
                src={feature3.imageUrl} 
                alt={feature3.name} 
                className="w-full h-auto rounded-lg shadow-xl"
                onError={(e) => e.target.src = 'https://placehold.co/600x400?text=Image+Failed'}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Features;
