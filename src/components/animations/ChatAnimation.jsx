import React from 'react';
import Lottie from 'react-lottie-player'; 

import animacaoChat from '../../assets/animations/chat.json';

function ChatAnimation() {
  return (
    <div className="w-full h-80 bg-white text-gray-400 flex items-center justify-center">
      <Lottie
        loop
        animationData={animacaoChat}
        play
        className="w-full h-80 object-cover"
      />
    </div>
  );
}

export default ChatAnimation;