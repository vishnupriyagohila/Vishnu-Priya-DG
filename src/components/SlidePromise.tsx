import React, { useState } from 'react';
import { Heart, CheckCircle2, RotateCcw, ArrowRight, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SlideProps } from '../types';
import { MediaUploader } from './MediaUploader';

interface SlidePromiseProps extends SlideProps {
  onResetToBeginning: () => void;
  onOpenSongPicker: () => void;
}

export const SlidePromise: React.FC<SlidePromiseProps> = ({
  onNext,
  onResetToBeginning,
  onOpenSongPicker,
  media,
  onUpdateMedia,
}) => {
  const [isSealed, setIsSealed] = useState(false);

  const handleSeal = () => {
    setIsSealed(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff1493', '#ff3366', '#ffffff', '#e11d48'],
    });
  };

  return (
    <div className="min-h-[82vh] max-w-3xl mx-auto px-4 py-8 relative z-10 space-y-10">
      {/* Badge & Subtitle */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-xs font-mono tracking-widest text-rose-300 uppercase shadow-lg">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          MY APOLOGY & FOREVER PROMISE
        </span>
        <p className="font-cormorant italic text-2xl sm:text-3xl text-rose-300 font-medium">
          Manichukonga d yen thangoo 🥺
        </p>
      </div>

      {/* Recipient Header */}
      <div className="text-center">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow">
          To My Dearest <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400">Jothi Ramalingar</span> ❤️
        </h2>
        <p className="text-rose-400 font-mono text-xs sm:text-sm tracking-widest uppercase mt-2">
          A promise straight from my soul to yours
        </p>
      </div>

      {/* Interactive Promise Card */}
      <div className="glass-romantic-strong rounded-3xl p-6 sm:p-9 border border-rose-500/40 text-center shadow-2xl relative overflow-hidden transition-all duration-500">
        <h3 className="font-serif text-2xl font-bold text-rose-100 mb-3">
          My Solemn Promise To You
        </h3>
        <p className="font-cormorant italic text-xl sm:text-2xl text-pink-200 leading-relaxed font-normal max-w-2xl mx-auto mb-6">
          “I promise with every beat of my heart that I will never hurt you anymore. You are too precious to ever see you sad because of me.”
        </p>

        {!isSealed ? (
          <button
            id="seal-promise-btn"
            onClick={handleSeal}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-500 text-white font-serif text-lg font-medium glow-pill border border-rose-300/40 shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <span>👉 Tap to Seal My Promise 🩸❤️</span>
          </button>
        ) : (
          <div className="inline-flex flex-col items-center gap-2 p-5 rounded-2xl bg-rose-950/80 border border-rose-400/50 text-rose-100 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-2 text-lg sm:text-xl font-serif font-bold text-emerald-300">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <span>✅ My Sacred Promise Is Sealed ❤️</span>
            </div>
            <p className="font-cormorant italic text-lg sm:text-xl text-rose-200">
              Forever protecting your smile and your heart, my babby. 🫶🏻
            </p>
          </div>
        )}
      </div>

      {/* Detailed Letter Card: From Your Thangoo */}
      <div className="relative rounded-3xl glass-romantic p-7 sm:p-10 border border-rose-500/30 shadow-2xl space-y-6 text-rose-100/90 leading-relaxed font-light text-base sm:text-lg">
        <div className="flex items-center justify-between border-b border-rose-500/20 pb-4">
          <span className="font-cursive text-3xl sm:text-4xl text-rose-300">From Your Thangoo ❤️</span>
          <span className="text-xs font-mono text-rose-400/80 tracking-widest uppercase">Deep Apology & Love</span>
        </div>

        <p className="font-serif italic text-lg sm:text-xl text-rose-200">
          Manichukonga d yen thangoo 🥺...
        </p>

        <p>
          It breaks my heart knowing that I caused you pain. There is honestly nothing in this world more important to me than your smile, your peace, and us. I never ever want to be the reason tears come to your eyes or worry fills your thoughts.
        </p>

        <p>
          Looking back at where everything started — from that very first hello on Bumble, to our late-night conversations that slowly became the safest part of my everyday life. 28th March brought you into my life, and 14th April showed me that my heart had already surrendered to you.
        </p>

        {/* Featured Letter Quote */}
        <div className="p-5 sm:p-6 rounded-2xl bg-rose-950/50 border-l-4 border-rose-500 my-4">
          <p className="font-cormorant italic text-xl sm:text-2xl text-rose-100 font-medium leading-relaxed">
            “Laying on your chest that's always felt like home... when the scent of perfume fades away and your hands lay on my skin, you will always be my home 🫶🏻 💕”
          </p>
        </div>

        <p>
          I promise to listen to you more, cherish you more, hold you tighter, and love you better every single day. I won't ever hurt you anymore. Vera yarum vena... yenaku nenga mattum pothum.
        </p>

        <p className="text-rose-200 font-medium">
          Please let go of the hurt, hold my hand, and let's restart our little world together. ❤️
        </p>

        <div className="pt-4 border-t border-rose-500/20 text-right space-y-1">
          <p className="text-sm font-sans text-rose-400">With endless love, deepest apology, and all my heart,</p>
          <p className="font-cursive text-3xl sm:text-4xl text-pink-300">Forever your thangoo 🫶🏻</p>
        </div>
      </div>

      {/* Memory Gallery: Our Little World */}
      <div className="space-y-6 pt-4">
        <div className="text-center space-y-1">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Our Little World <span className="text-rose-400">✨</span>
          </h3>
          <p className="text-sm text-rose-300/80 font-cormorant italic text-lg">
            The moments that remind me why I love you so much
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Photo Card 4 */}
          <MediaUploader
            id="photo4"
            imageSrc={media.photo4}
            defaultFallbackUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
            caption="Us ❤️"
            subtext="THROUGH EVERYTHING"
            aspectRatio="square"
            onImageChange={(dataUrl) => onUpdateMedia('photo4', dataUrl)}
          />

          {/* Photo Card 5 */}
          <MediaUploader
            id="photo5"
            imageSrc={media.photo5}
            defaultFallbackUrl="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop"
            caption="Forever My Home 🫶🏻 ❤️"
            subtext="YOU & ME"
            aspectRatio="square"
            onImageChange={(dataUrl) => onUpdateMedia('photo5', dataUrl)}
          />
        </div>
      </div>

      {/* Navigation to Slide 6 (Postcard) */}
      <div className="flex justify-center pt-6">
        <button
          id="promise-to-postcard-btn"
          onClick={onNext}
          className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-lg tracking-wide glow-pill transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer border border-rose-300/40"
        >
          <span>Open Final Surprise Postcard 💌</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="pt-8 border-t border-rose-900/30 flex flex-wrap items-center justify-center gap-4 text-center">
        <button
          id="read-again-btn"
          onClick={onResetToBeginning}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-950/60 hover:bg-rose-900/70 text-rose-300 hover:text-white border border-rose-500/30 text-sm font-medium transition-all cursor-pointer shadow-md"
        >
          <RotateCcw className="w-4 h-4" />
          <span>↻ Read Our Story Again From The Beginning</span>
        </button>

        <button
          id="footer-song-btn"
          onClick={onOpenSongPicker}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-950/60 hover:bg-rose-900/70 text-rose-300 hover:text-white border border-rose-500/30 text-sm font-medium transition-all cursor-pointer shadow-md"
        >
          <Music className="w-4 h-4" />
          <span>🎵 Add / Change Song ♫</span>
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-xs sm:text-sm text-rose-400/80 font-mono tracking-wider pt-2">
        Made with endless love and a sincere heart for <strong className="text-rose-200 font-serif font-semibold">Jothi Ramalingar</strong> 🌸
      </div>
    </div>
  );
};
