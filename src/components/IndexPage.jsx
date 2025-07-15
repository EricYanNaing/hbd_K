import React, { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, Gift } from 'lucide-react';

const IndexPage = ({ onNavigate }) => {
  const [showSecondMessage, setShowSecondMessage] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [containerClicked, setContainerClicked] = useState(false);
  const decorationsRef = useRef(null);

  useEffect(() => {
    createDecorations();
  }, []);

  const createDecorations = () => {
    const decorationsContainer = decorationsRef.current;
    if (!decorationsContainer) return;

    // Create floating bubbles
    for (let i = 0; i < 20; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      
      const size = Math.random() * 60 + 20;
      const posX = Math.random() * 100;
      const delay = Math.random() * 20;
      const duration = Math.random() * 10 + 10;
      
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${posX}%`;
      bubble.style.animationDuration = `${duration}s`;
      bubble.style.animationDelay = `${delay}s`;
      
      decorationsContainer.appendChild(bubble);
    }
  };

  const createHearts = () => {
    const hearts = ['❤️', '💖', '💕', '💓', '💗', '💘', '💝'];
    
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        const randomEmoji = hearts[Math.floor(Math.random() * hearts.length)];
        heart.innerHTML = randomEmoji;
        heart.className = 'absolute pointer-events-none text-2xl animate-pulse';
        heart.style.left = `${Math.random() * 80 + 10}%`;
        heart.style.top = `${Math.random() * 80 + 10}%`;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
          heart.remove();
        }, 3000);
      }, i * 100);
    }
  };

  const handleContainerClick = () => {
    if (containerClicked) return;
    setContainerClicked(true);
    setShowSecondMessage(true);
    setShowButton(true); // show instantly
    setShowGif(true);    // show instantly
    createHearts();
  };

  const handleEnterClick = () => {
    onNavigate('birthday');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300/50 via-purple-300/50 to-blue-300/50 animate-pulse"></div>
      
      {/* Top floating emojis */}
      <div className="absolute top-5 left-[15%] text-4xl animate-bounce">✨</div>
      <div className="absolute top-5 left-[35%] text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>🎂</div>
      <div className="absolute top-5 left-[65%] text-4xl animate-bounce" style={{animationDelay: '1s'}}>🎀</div>
      <div className="absolute top-5 left-[85%] text-4xl animate-bounce" style={{animationDelay: '1.5s'}}>🌸</div>

      {/* Side decorations */}
      <div className="absolute left-0 top-0 h-full w-16 flex flex-col justify-around items-center py-8">
        <span className="text-2xl animate-pulse" style={{animationDelay: '0.2s'}}>🌈</span>
        <span className="text-2xl animate-pulse" style={{animationDelay: '0.5s'}}>💖</span>
        <span className="text-2xl animate-pulse" style={{animationDelay: '0.8s'}}>🎁</span>
        <span className="text-2xl animate-pulse" style={{animationDelay: '1.1s'}}>✨</span>
        <span className="text-2xl animate-pulse" style={{animationDelay: '1.4s'}}>🦄</span>
      </div>

      <div className="absolute right-0 top-0 h-full w-16 flex flex-col justify-around items-center py-8">
        <span className="text-2xl animate-pulse" style={{animationDelay: '0.3s'}}>🌟</span>
        <span className="text-2xl animate-pulse" style={{animationDelay: '0.6s'}}>🍰</span>
        <span className="text-2xl animate-pulse" style={{animationDelay: '0.9s'}}>🎀</span>
        <span className="text-2xl animate-pulse" style={{animationDelay: '1.2s'}}>🌸</span>
        <span className="text-2xl animate-pulse" style={{animationDelay: '1.5s'}}>💝</span>
      </div>

      {/* Floating bubbles */}
      <div ref={decorationsRef} className="absolute inset-0 pointer-events-none"></div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10">
        <div 
          className="backdrop-blur-lg bg-white/25 border border-white/20 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center cursor-pointer transition-all duration-300 hover:bg-white/30 hover:scale-105"
          onClick={handleContainerClick}
          style={{ pointerEvents: containerClicked ? 'none' : 'auto' }}
        >
          <div className={`transition-all duration-500 ${showSecondMessage ? 'opacity-0 absolute' : 'opacity-100'}`}>
            <p className="text-2xl font-semibold text-purple-700 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6" />
              I have something for you...
              <Sparkles className="w-6 h-6" />
            </p>
          </div>
          
          <div className={`transition-all duration-1000 ${showSecondMessage ? 'opacity-100' : 'opacity-0 absolute'}`}>
            <p className="text-xl font-semibold text-purple-700 flex items-center justify-center gap-2">
              <Heart className="w-6 h-6 text-pink-500" />
              It's a special day for you...
              <Heart className="w-6 h-6 text-pink-500" />
            </p>
          </div>
        </div>

        <button
          className={`mt-8 px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-full shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl flex items-center gap-3 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          onClick={handleEnterClick}
        >
          <Sparkles className="w-5 h-5" />
          Check it out
          <Heart className="w-5 h-5" />
        </button>

        <div className={`mt-8 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${showGif ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-80 h-48 bg-gradient-to-r from-pink-300 to-purple-300 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bubble {
          position: absolute;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
          animation: bubbleFloat 15s linear infinite;
          opacity: 0.6;
        }

        @keyframes bubbleFloat {
          0% { transform: translateY(100vh) scale(0.3); opacity: 0.3; }
          100% { transform: translateY(-100px) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default IndexPage;