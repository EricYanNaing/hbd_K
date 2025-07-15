import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Gift, Star } from 'lucide-react';

const FinalPage = ({ onNavigate }) => {
  const [cardOpen, setCardOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Auto-open card after 2 seconds
    const timer = setTimeout(() => {
      setCardOpen(true);
      setShowConfetti(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const confettiColors = [
    'bg-pink-400',
    'bg-purple-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-yellow-400',
    'bg-red-400',
    'bg-indigo-400',
    'bg-teal-400'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 via-purple-200/50 to-blue-200/50"></div>
      
      {/* Floating decorations */}
      <div className="absolute top-5 left-5 text-3xl animate-bounce">⭐</div>
      <div className="absolute top-12 right-8 text-4xl animate-pulse">🎈</div>
      <div className="absolute bottom-5 left-8 text-3xl animate-bounce">🐱</div>
      
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 ${confettiColors[Math.floor(Math.random() * confettiColors.length)]} animate-bounce`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 2 + 1}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen relative z-20">
        <div className="relative">
          {/* Birthday Card */}
          <div 
            className={`w-96 h-[32rem] cursor-pointer transition-all duration-1000 transform-gpu ${cardOpen ? 'rotate-y-180' : ''}`}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
            onClick={() => setCardOpen(!cardOpen)}
          >
            {/* Card Front */}
            <div 
              className="absolute inset-0 bg-white rounded-lg shadow-2xl border-2 border-pink-200 backface-hidden"
              style={{
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="p-8 text-center h-full flex flex-col justify-center">
                <div className="text-pink-600 mb-4">
                  <h3 className="text-2xl font-bold">HAPPY</h3>
                  <h2 className="text-3xl font-bold">BIRTHDAY</h2>
                  <h3 className="text-2xl font-bold">to K!</h3>
                </div>
                
                {/* Decorative elements */}
                <div className="flex justify-center items-center mt-8">
                  <div className="relative">
                    {/* Cake */}
                    <div className="w-20 h-12 bg-gradient-to-r from-pink-400 to-pink-500 rounded-lg relative">
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-yellow-300 rounded-full"></div>
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gradient-to-t from-orange-400 to-red-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-24 h-2 bg-blue-400 rounded-full -mt-1"></div>
                  </div>
                </div>
                
                {/* Decorative streamers */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-pink-400 transform rotate-45"></div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-purple-400 transform rotate-45"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-blue-400 transform rotate-45"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-green-400 transform rotate-45"></div>
              </div>
            </div>
            
            {/* Card Inside */}
            <div 
              className="absolute inset-0 bg-white rounded-lg shadow-2xl border-2 border-pink-200 rotate-y-180"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="p-6 h-full flex flex-col">
                {/* Photo placeholder */}
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center border-4 border-pink-300">
                  <div className="text-4xl">🎉</div>
                </div>
                
                {/* Birthday message */}
                <div className="text-center text-pink-600 mb-4">
                  <h3 className="text-xl font-bold">HAPPY</h3>
                  <h2 className="text-2xl font-bold">BIRTHDAY</h2>
                </div>
                
                {/* Personal message */}
                <div className="relative flex-1">
                  <div
                    className="bg-pink-50/80 border border-pink-200 rounded-lg p-3 text-xs text-gray-700 space-y-2 shadow-inner"
                    style={{ lineHeight: '1.5', fontSize: '0.9rem' }}
                  >
                    <p className="font-semibold">Hey, K!</p>
                    <p>
                      Just wanted to say happy birthday — hope today brings you everything that makes you smile (and maybe a little bit of cake too).
                      You deserve to be celebrated in the best way, because you make the world better just by being in it.
                    </p>
                    <br/>
                    <p>
                      Glad I get to know you — and hoping this is just the beginning of even more great memories.
                    </p>
                    <p>Wishing you an amazing year ahead 🌟</p>
                    <p className="text-right font-semibold text-pink-600 mt-4">eric</p>
                  </div>
                </div>
                
                {/* Floating hearts */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(10)].map((_, i) => (
                    <Heart
                      key={i}
                      className="absolute text-pink-400 animate-pulse"
                      size={Math.random() * 10 + 10}
                      style={{
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation button */}
          <button
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
            onClick={() => onNavigate('index')}
          >
            <Sparkles className="w-4 h-4" />
            Start Again
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FinalPage;