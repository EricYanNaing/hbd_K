import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

const BirthdayPage = ({ onNavigate }) => {
  const starCanvasRef = useRef(null);
  const fireworksCanvasRef = useRef(null);
  const petalsCanvasRef = useRef(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    initializeAnimations();
    setTimeout(() => {
      setAnimationStarted(true);
    }, 1000);
  }, []);

  const initializeAnimations = () => {
    const starCanvas = starCanvasRef.current;
    const fireworksCanvas = fireworksCanvasRef.current;
    const petalsCanvas = petalsCanvasRef.current;

    if (!starCanvas || !fireworksCanvas || !petalsCanvas) return;

    // Set canvas sizes
    const resizeCanvas = () => {
      starCanvas.width = window.innerWidth;
      starCanvas.height = window.innerHeight;
      fireworksCanvas.width = window.innerWidth;
      fireworksCanvas.height = window.innerHeight;
      petalsCanvas.width = window.innerWidth;
      petalsCanvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star animation
    const starCtx = starCanvas.getContext('2d');
    const stars = [];
    
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.02 + 0.01
      });
    }

    const animateStars = () => {
      starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
      
      stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity >= 1 || star.opacity <= 0.3) {
          star.speed = -star.speed;
        }
        
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        starCtx.fill();
      });
      
      requestAnimationFrame(animateStars);
    };

    animateStars();

    // Fireworks animation
    const fireworksCtx = fireworksCanvas.getContext('2d');
    const fireworks = [];

    const createFirework = () => {
      const firework = {
        x: Math.random() * fireworksCanvas.width,
        y: fireworksCanvas.height,
        targetY: Math.random() * fireworksCanvas.height * 0.5,
        particles: [],
        exploded: false,
        color: {
          r: Math.floor(Math.random() * 255),
          g: Math.floor(Math.random() * 255),
          b: Math.floor(Math.random() * 255)
        }
      };
      
      fireworks.push(firework);
    };

    const animateFireworks = () => {
      fireworksCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      fireworksCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
      
      fireworks.forEach((firework, index) => {
        if (!firework.exploded) {
          firework.y -= 5;
          
          fireworksCtx.beginPath();
          fireworksCtx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
          fireworksCtx.fillStyle = `rgb(${firework.color.r}, ${firework.color.g}, ${firework.color.b})`;
          fireworksCtx.fill();
          
          if (firework.y <= firework.targetY) {
            firework.exploded = true;
            for (let i = 0; i < 30; i++) {
              firework.particles.push({
                x: firework.x,
                y: firework.y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 60,
                maxLife: 60
              });
            }
          }
        } else {
          firework.particles.forEach((particle, pIndex) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1;
            particle.life--;
            
            const opacity = particle.life / particle.maxLife;
            fireworksCtx.beginPath();
            fireworksCtx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            fireworksCtx.fillStyle = `rgba(${firework.color.r}, ${firework.color.g}, ${firework.color.b}, ${opacity})`;
            fireworksCtx.fill();
            
            if (particle.life <= 0) {
              firework.particles.splice(pIndex, 1);
            }
          });
          
          if (firework.particles.length === 0) {
            fireworks.splice(index, 1);
          }
        }
      });
      
      requestAnimationFrame(animateFireworks);
    };

    animateFireworks();

    // Start fireworks
    const fireworkInterval = setInterval(createFirework, 800);
    setTimeout(() => clearInterval(fireworkInterval), 10000);

    // Petals animation
    const petalsCtx = petalsCanvas.getContext('2d');
    const petals = [];

    for (let i = 0; i < 30; i++) {
      petals.push({
        x: Math.random() * petalsCanvas.width,
        y: Math.random() * petalsCanvas.height - petalsCanvas.height,
        size: Math.random() * 10 + 5,
        speedY: Math.random() * 2 + 1,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360
      });
    }

    const animatePetals = () => {
      petalsCtx.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);
      
      petals.forEach(petal => {
        petal.y += petal.speedY;
        petal.x += Math.sin(petal.y * 0.01) + petal.speedX;
        petal.rotation += 2;
        
        if (petal.y > petalsCanvas.height) {
          petal.y = -20;
          petal.x = Math.random() * petalsCanvas.width;
        }
        
        petalsCtx.save();
        petalsCtx.translate(petal.x, petal.y);
        petalsCtx.rotate(petal.rotation * Math.PI / 180);
        
        petalsCtx.beginPath();
        petalsCtx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2);
        petalsCtx.fillStyle = `rgba(255, 150, 200, 0.8)`;
        petalsCtx.fill();
        
        petalsCtx.restore();
      });
      
      requestAnimationFrame(animatePetals);
    };

    animatePetals();

    return () => {
      clearInterval(fireworkInterval);
      window.removeEventListener('resize', resizeCanvas);
    };
  };

  const createFloatingHeart = () => {
    const heart = document.createElement('div');
    heart.className = 'absolute pointer-events-none text-red-500 text-3xl animate-pulse';
    heart.innerHTML = '❤️';
    heart.style.left = `${Math.random() * 80 + 10}%`;
    heart.style.top = `${Math.random() * 80 + 10}%`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, 3000);
  };

  const handleCelebrate = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => createFloatingHeart(), i * 200);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800"></div>
      
      {/* Canvas elements */}
      <canvas ref={starCanvasRef} className="absolute inset-0 pointer-events-none z-10"></canvas>
      <canvas ref={petalsCanvasRef} className="absolute inset-0 pointer-events-none z-20"></canvas>
      <canvas ref={fireworksCanvasRef} className="absolute inset-0 pointer-events-none z-30"></canvas>

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-40">
        <h1 className={`text-4xl md:text-6xl font-bold text-center mb-8 transition-all duration-2000 ${animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
            Happy Birthday, K!
          </span>
        </h1>
        
        <p className={`text-lg md:text-xl text-center max-w-2xl mx-4 mb-8 transition-all duration-2000 delay-500 ${animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Every moment seeing you feels like a celebration 🎉
But today’s got its own kind of magic ✨
Here’s to a year full of joy, adventure, and unforgettable memories 🌈🌟🎂
        </p>
        
        {/* <button
          className={`px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-bold text-lg shadow-lg transition-all duration-2000 delay-1000 hover:scale-105 hover:shadow-xl ${animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          onClick={handleCelebrate}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5" />
            Celebrate Our Love
            <Heart className="w-5 h-5" />
          </div>
        </button> */}
        
        <button
          className={`mt-8 px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg text-white font-semibold shadow-lg transition-all duration-2000 delay-1500 hover:scale-105 ${animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          onClick={() => onNavigate('final')}
        >
          Check my birthday wish card →
        </button>
      </div>
    </div>
  );
};

export default BirthdayPage;