import React from 'react';
import Lottie from 'react-lottie-player'; 

import animacaoHitchFace from '../../assets/animations/hitch_face.json';

function HitchFaceAnimation() {
  return (
    <div className="w-full h-80 bg-white text-gray-400 flex items-center justify-center">
      <Lottie
        loop
        animationData={animacaoHitchFace}
        play
        className="w-full h-80 object-cover"
      />
    </div>
  );
}

export default HitchFaceAnimation;