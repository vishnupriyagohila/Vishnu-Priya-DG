import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Calendar, Heart } from 'lucide-react';
import { SlideProps } from '../types';
import { MediaUploader } from './MediaUploader';

export const SlideChapter1: React.FC<SlideProps> = ({ onNext, onPrev, media, onUpdateMedia }) => {
  return (
    <div className="min-h-[82vh] max-w-3xl mx-auto px-4 py-8 relative z-10">
      {/* Chapter Badge */}
      <div className="flex justify-center mb-3">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-950/70 border border-rose-500/30 text-xs font-mono tracking-widest text-rose-300 uppercase shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          CHAPTER 1: THE SPARK
        </span>
      </div>

      {/* Title */}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white drop-shadow mb-8 leading-tight">
        And then... there was <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">28th March</span>. ✨
      </h2>

      {/* Story Narrative Cards */}
      <div className="space-y-5 mb-10">
        <div className="glass-romantic rounded-2xl p-5 sm:p-6 border border-rose-500/20 text-rose-100/90 leading-relaxed font-light text-base sm:text-lg">
          <p>
            It all started from Bumble... But honestly, we didn't even talk that much in the beginning. 😂 Just a few conversations here and there...
          </p>
        </div>

        <div className="glass-romantic rounded-2xl p-5 sm:p-6 border border-rose-500/20 text-rose-100/90 leading-relaxed font-light text-base sm:text-lg">
          <p>
            And then somehow, we started talking more. A little more every day. A little closer every time. ❤️
          </p>
        </div>

        {/* Highlighted Quote Box */}
        <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-rose-950/70 via-pink-950/60 to-rose-950/70 border border-rose-400/40 shadow-xl text-center overflow-hidden">
          <div className="absolute top-2 left-4 text-4xl text-rose-400/30 font-serif select-none">“</div>
          <div className="absolute bottom-2 right-4 text-4xl text-rose-400/30 font-serif select-none">”</div>
          <p className="font-cormorant italic text-2xl sm:text-3xl text-rose-100 font-semibold tracking-wide">
            “I was literally falling for you from Day 1. 🥹”
          </p>
        </div>

        <div className="glass-romantic rounded-2xl p-5 sm:p-6 border border-rose-500/20 text-rose-100/90 leading-relaxed font-light text-base sm:text-lg">
          <p>
            I don't even know why. There was no proper reason. No big moment. I just... started falling for you.
          </p>
        </div>

        {/* Accent Card */}
        <div className="rounded-2xl p-5 sm:p-6 bg-white/[0.04] border border-rose-300/30 text-center shadow-lg">
          <p className="font-serif text-lg sm:text-xl text-rose-200 italic">
            Maybe my heart knew something that my brain didn't. 🤍
          </p>
        </div>

        <div className="glass-romantic rounded-2xl p-5 sm:p-6 border border-rose-500/20 text-rose-100/90 leading-relaxed font-light text-base sm:text-lg">
          <p>
            And without even realizing it... you were slowly becoming someone really special to me. 🙈
          </p>
        </div>
      </div>

      {/* Section Break: 14th April */}
      <div className="my-10 text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-rose-500/50" />
          <span className="text-xs font-mono tracking-widest text-rose-400 uppercase flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> AND THEN CAME...
          </span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-rose-500/50" />
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
          14th April. <span className="text-rose-500">❤️</span>
        </h3>
        <p className="text-rose-300/90 font-mono text-sm uppercase tracking-wider">
          The day we finally met.
        </p>

        <div className="max-w-xl mx-auto py-2">
          <p className="font-cormorant italic text-xl sm:text-2xl text-pink-200 font-medium">
            “But little did I know... that meeting you would make me fall even harder. 🫶🏻”
          </p>
        </div>
      </div>

      {/* Photo Card 1 */}
      <div className="max-w-md mx-auto mb-10">
        <MediaUploader
          id="photo1"
          imageSrc={media.photo1}
          defaultFallbackUrl="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=1000&auto=format&fit=crop"
          caption="14th April – The Day We Met"
          subtext="WHEN MY WHOLE WORLD CHANGED ❤️"
          aspectRatio="portrait"
          onImageChange={(dataUrl) => onUpdateMedia('photo1', dataUrl)}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-rose-900/30">
        <button
          id="chapter1-back-btn"
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 hover:text-white border border-rose-500/20 text-sm font-medium transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          id="chapter1-continue-btn"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-base font-medium glow-pill border border-rose-300/40 transition-all cursor-pointer transform hover:-translate-y-0.5"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
