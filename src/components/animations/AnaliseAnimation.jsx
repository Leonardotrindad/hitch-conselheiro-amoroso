import React from 'react';
import Lottie from 'react-lottie-player';

import animacaoAnalise from '../../assets/animations/analise.json'; 

function AnaliseAnimation() {
  return (
    <div className="w-full h-80 bg-white text-gray-400 flex items-center justify-center">
      <Lottie
        loop
        animationData={animacaoAnalise}
        play
        className="w-full h-80 object-cover"
      />
    </div>
  );
}

export default AnaliseAnimation;