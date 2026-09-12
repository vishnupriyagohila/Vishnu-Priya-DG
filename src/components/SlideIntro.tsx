import React from 'react';
import { Heart, Sparkles, ArrowRight, Camera } from 'lucide-react';
import { SlideProps } from '../types';

interface SlideIntroProps extends SlideProps {
  onOpenMediaSetup?: () => void;
}

export const SlideIntro: React.FC<SlideIntroProps> = ({ onNext, onOpenMediaSetup }) => {
  return (
    <div className="min-h-[82vh] flex flex-col items-center justify-center px-4 py-8 max-w-2xl mx-auto text-center relative z-10">
      {/* Top Glowing Heart Emblem */}
      <div className="relative mb-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-rose-950 via-rose-900/60 to-pink-900/40 border border-rose-500/40 flex items-center justify-center glow-heart shadow-2xl shadow-rose-900/50 mx-auto transition-transform hover:scale-110 duration-500">
          <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-rose-500 fill-rose-500 animate-pulse" />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-rose-900/80 px-3 py-0.5 rounded-full border border-rose-400/40 text-[11px] font-mono text-rose-200 tracking-wider flex items-center gap-1 shadow-md">
          <Sparkles className="w-3 h-3 text-pink-300" />
          <span>LOVE LETTER</span>
        </div>
      </div>

      {/* Main Heading & Sub-heading */}
      <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md mb-2">
        Hii babyyy <span className="text-rose-500 inline-block animate-bounce">❤️</span>
      </h1>
      <p className="font-cormorant italic text-2xl sm:text-3xl text-rose-300/95 font-medium tracking-wide mb-8">
        Manichukonga d yen thangoo 🥺
      </p>

      {/* Message Card */}
      <div className="w-full glass-romantic-strong rounded-3xl p-6 sm:p-9 border border-rose-500/30 text-center shadow-2xl relative overflow-hidden backdrop-blur-2xl mb-8">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-rose-500/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-pink-500/20 to-transparent pointer-events-none" />

        <div className="space-y-4 text-rose-100/90 text-base sm:text-lg leading-relaxed font-sans font-light">
          <p className="font-medium text-rose-200">
            Okay... enough of everything.
          </p>
          <p>
            Let's forget all the little things for a moment...<br />
            and start from the very beginning. ❤️
          </p>
          <div className="py-2 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-rose-500/30" />
            <span className="font-serif text-rose-300 text-sm tracking-widest uppercase">Our Journey</span>
            <span className="h-px w-12 bg-rose-500/30" />
          </div>
          <p className="font-cormorant text-xl sm:text-2xl text-pink-200 italic">
            Our story... our memories... our little world. 🫶🏻
          </p>
          <p className="pt-2 text-rose-300 font-medium">
            Ready, babby? 👀❤️
          </p>
        </div>
      </div>

      {/* Glowing Pill Button */}
      <div className="flex flex-col items-center gap-3">
        <button
          id="intro-continue-btn"
          onClick={onNext}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-lg tracking-wide glow-pill transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-rose-300/40"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>

        {onOpenMediaSetup && (
          <button
            id="intro-media-setup-btn"
            onClick={onOpenMediaSetup}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-mono tracking-wider transition-colors cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-rose-400" />
            <span>📸 Insert Jothi's Photos & Music (Quick Setup)</span>
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-xs sm:text-sm text-rose-400/80 font-mono tracking-wider flex items-center justify-center gap-1.5">
        <span>Made with</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        <span>specially for <strong className="text-rose-200 font-serif font-semibold">Jothi Ramalingar</strong> 🌸</span>
      </div>
    </div>
  );
};
