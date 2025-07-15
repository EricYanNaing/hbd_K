import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const CakePage = ({ onNavigate }) => {
  const [candleBlown, setCandleBlown] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [ribbons, setRibbons] = useState([]);

  const ribbonColors = [
    'from-pink-400 to-pink-600',
    'from-purple-400 to-purple-600',
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-yellow-400 to-yellow-600',
    'from-red-400 to-red-600',
    'from-indigo-400 to-indigo-600',
    'from-teal-400 to-teal-600'
  ];

  const createRibbon = () => {
    const ribbon = {
      id: Date.now() + Math.random(),
      left: Math.random() * 100,
      color: ribbonColors[Math.floor(Math.random() * ribbonColors.length)],
      delay: Math.random() * 0.5
    };
    
    setRibbons(prev => [...prev, ribbon]);
    
    setTimeout(() => {
      setRibbons(prev => prev.filter(r => r.id !== ribbon.id));
    }, 3000);
  };

  const handleCakeClick = () => {
    if (candleBlown) return;
    
    setCandleBlown(true);
    
    // Start ribbon rain
    const ribbonInterval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => createRibbon(), i * 100);
      }
    }, 200);
    
    // Show button after 2 seconds
    setTimeout(() => {
      setShowButton(true);
    }, 2000);
    
    // Stop ribbon rain after 5 seconds
    setTimeout(() => {
      clearInterval(ribbonInterval);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300/50 via-purple-300/50 to-blue-300/50"></div>
      
      {/* Ribbon Rain */}
      {ribbons.map(ribbon => (
        <div
          key={ribbon.id}
          className={`absolute w-4 h-12 bg-gradient-to-b ${ribbon.color} rounded-md animate-bounce`}
          style={{
            left: `${ribbon.left}%`,
            top: '-50px',
            animationDelay: `${ribbon.delay}s`,
            animationDuration: '3s',
            animationFillMode: 'forwards'
          }}
        />
      ))}
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-8 text-center animate-pulse">
          Let's Cut the Cake! 🎂
        </h1>
        
        <div 
          className="relative cursor-pointer transform transition-all duration-300 hover:scale-105"
          onClick={handleCakeClick}
        >
          {/* Cake Container */}
          <div className="relative w-64 h-64 flex flex-col items-center justify-end">
            {/* Cake Layers */}
            <div className="relative">
              {/* Bottom Layer */}
              <div className="w-60 h-20 bg-gradient-to-r from-pink-400 to-pink-500 rounded-lg shadow-lg relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-5 h-6 bg-white rounded-full"></div>
                <div className="absolute -top-3 left-8 w-5 h-6 bg-white rounded-full"></div>
                <div className="absolute -top-3 right-8 w-5 h-6 bg-white rounded-full"></div>
              </div>
              
              {/* Middle Layer */}
              <div className="w-52 h-18 bg-gradient-to-r from-pink-300 to-pink-400 rounded-lg shadow-lg relative -mt-2 mx-auto">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-5 h-6 bg-white rounded-full"></div>
                <div className="absolute -top-3 left-6 w-5 h-6 bg-white rounded-full"></div>
                <div className="absolute -top-3 right-6 w-5 h-6 bg-white rounded-full"></div>
              </div>
              
              {/* Top Layer */}
              <div className="w-44 h-16 bg-gradient-to-r from-pink-200 to-pink-300 rounded-lg shadow-lg relative -mt-2 mx-auto">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-5 h-6 bg-white rounded-full"></div>
                <div className="absolute -top-3 left-4 w-5 h-6 bg-white rounded-full"></div>
                <div className="absolute -top-3 right-4 w-5 h-6 bg-white rounded-full"></div>
                
                {/* Candle */}
                {!candleBlown && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-5 h-12 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-full">
                    {/* Flame */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-5 h-6 bg-gradient-to-t from-orange-400 to-red-400 rounded-full animate-bounce"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Next Page Button */}
        <button
          className={`mt-12 px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-full shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl flex items-center gap-3 ${showButton ? 'opacity-100 translate-y-0 animate-pulse' : 'opacity-0 translate-y-8'}`}
          onClick={() => onNavigate('final')}
        >
          Next Page
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      
      <style jsx>{`
        @keyframes ribbonFall {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(100px);
          }
          100% {
            transform: translateY(100vh) rotate(360deg) translateX(-100px);
          }
        }
        
        .animate-bounce {
          animation: ribbonFall 3s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default CakePage;