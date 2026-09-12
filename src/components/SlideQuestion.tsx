import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, MessageCircle } from 'lucide-react';
import { SlideProps } from '../types';

export const SlideQuestion: React.FC<SlideProps> = ({ onNext }) => {
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sequentialDialogues = [
    'No... not letting you go 🥺',
    'Yenaku venum us 🥺',
    'Nenga... nanum... plsss 🥺',
    'Vera yarum vena 🥺',
    'Yen chelam yaruuuu? 🥺',
    "You know the answer... it's you. ❤️",
    'No escape for you, okay? 🙈',
    'Now come back and click YES. 🥺❤️',
  ];

  const moveNoButton = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate bounds so button remains inside the interactive stage
    const maxX = Math.max(100, (rect.width / 2) - 80);
    const maxY = Math.max(60, (rect.height / 2) - 50);

    // Pick a new position that is far enough from current
    const randomSignX = Math.random() > 0.5 ? 1 : -1;
    const randomSignY = Math.random() > 0.5 ? 1 : -1;

    const newX = (Math.random() * (maxX - 30) + 30) * randomSignX;
    const newY = (Math.random() * (maxY - 20) + 20) * randomSignY;

    setNoPosition({ x: newX, y: newY });
    setHasMoved(true);
    setDialogueIndex((prev) => (prev + 1) % sequentialDialogues.length);
  };

  const handleYesClick = () => {
    // Massive confetti and heart celebration
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#ff1493', '#ff3366', '#ffffff', '#ffd700', '#e11d48'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Center starburst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff3366', '#ff69b4', '#ffffff', '#ffd700'],
    });

    setShowCelebrationModal(true);

    // Automatically transition to Slide 5 after 2.8 seconds
    setTimeout(() => {
      onNext();
    }, 2800);
  };

  return (
    <div className="min-h-[82vh] flex flex-col items-center justify-center px-4 py-8 max-w-2xl mx-auto text-center relative z-10">
      {/* Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-xs font-mono tracking-widest text-rose-300 uppercase shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          A LITTLE QUESTION FOR YOU
        </span>
      </div>

      {/* Heading */}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow mb-3 leading-snug">
        Will you promise to be mine forever, babby? 🥺<span className="text-rose-500 inline-block animate-pulse">❤️</span>
      </h2>

      {/* Subtitle */}
      <p className="font-cormorant italic text-xl sm:text-2xl text-rose-300 font-medium mb-1">
        Think very carefully before you choose... 🙈👉👈
      </p>

      {/* Hint */}
      <p className="text-xs sm:text-sm font-mono text-rose-400/80 mb-8">
        (There is only one true answer in your heart ❤️)
      </p>

      {/* Interactive Arena */}
      <div
        ref={containerRef}
        id="question-interactive-arena"
        className="relative w-full min-h-[280px] sm:min-h-[320px] rounded-3xl glass-romantic-strong border border-rose-500/30 flex flex-col items-center justify-center p-6 overflow-hidden shadow-2xl"
      >
        {/* Cute Floating Dialogue Bubble */}
        {hasMoved && (
          <div
            id="runaway-dialogue-bubble"
            className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-900/90 border border-rose-400/50 text-rose-100 shadow-xl animate-bounce text-sm sm:text-base font-serif"
          >
            <MessageCircle className="w-4 h-4 text-pink-300 shrink-0" />
            <span>{sequentialDialogues[dialogueIndex]}</span>
          </div>
        )}

        {/* Buttons Row */}
        <div className="relative flex flex-wrap items-center justify-center gap-6 sm:gap-10 w-full">
          {/* Big Glowing YES Button */}
          <button
            id="answer-yes-btn"
            onClick={handleYesClick}
            className="group relative inline-flex items-center gap-2.5 px-8 sm:px-12 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 text-white font-serif text-xl sm:text-2xl font-bold tracking-wide glow-pill transition-all duration-300 transform hover:scale-110 active:scale-100 cursor-pointer border border-rose-300/60 shadow-2xl shadow-rose-600/50"
          >
            <span>YES ❤️ ✨</span>
            <Sparkles className="w-5 h-5 text-yellow-200 group-hover:rotate-12 transition-transform" />
          </button>

          {/* Runaway NO Button */}
          <button
            id="answer-no-btn"
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
            style={{
              transform: hasMoved
                ? `translate(${noPosition.x}px, ${noPosition.y}px)`
                : 'translate(0px, 0px)',
              transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-950/70 hover:bg-rose-900/80 text-rose-300/90 hover:text-white border border-rose-500/30 text-base font-serif font-medium cursor-pointer transition-colors shadow-md select-none"
          >
            <span>NO 🥺</span>
          </button>
        </div>

        {/* Footer Hint inside Arena */}
        {hasMoved && (
          <p className="mt-8 text-xs sm:text-sm text-pink-300/85 font-mono italic animate-pulse">
            Hehe, you can't click NO anymore, babby... the button is running away! 🏃‍♀️💨
          </p>
        )}
      </div>

      {/* Celebration Modal when YES is clicked */}
      {showCelebrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-romantic-strong rounded-3xl p-8 sm:p-10 max-w-md w-full border border-rose-400/60 shadow-2xl text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-rose-600/30 border border-rose-400 mx-auto flex items-center justify-center text-4xl animate-bounce">
              💖
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              I Knew It! Forever & Always! ❤️
            </h3>
            <p className="font-cormorant italic text-xl text-rose-200">
              Opening my promise & love letter to you... ✨
            </p>
            <div className="w-full bg-rose-950/60 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-full w-full animate-[pulse_1s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
