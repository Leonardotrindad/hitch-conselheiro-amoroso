import React from 'react';
import Lottie from 'react-lottie-player';

import animacaoIdeia from '../../assets/animations/idea.json';

function IdeaAnimation() {
  return (
    <div className="w-full h-80 bg-white text-gray-400 flex items-center justify-center">
      <Lottie
        loop
        animationData={animacaoIdeia}
        play
        className="w-full h-80 object-cover"
      />
    </div>
  );
}

export default IdeaAnimation;