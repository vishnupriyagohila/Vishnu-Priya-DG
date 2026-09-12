import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Heart } from 'lucide-react';
import { SlideProps } from '../types';
import { MediaUploader } from './MediaUploader';

export const SlideChapter2: React.FC<SlideProps> = ({ onNext, onPrev, media, onUpdateMedia }) => {
  return (
    <div className="min-h-[82vh] max-w-3xl mx-auto px-4 py-8 relative z-10">
      {/* Chapter Badge */}
      <div className="flex justify-center mb-3">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-950/70 border border-rose-500/30 text-xs font-mono tracking-widest text-rose-300 uppercase shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          CHAPTER 2: THE FIRST DATE
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow mb-2">
          The Day I Knew... Our First Date <span className="text-rose-500">❤️</span>
        </h2>
        <p className="font-cormorant italic text-xl sm:text-2xl text-rose-300/90 font-medium">
          The moment time stood completely still
        </p>
      </div>

      {/* Photo Card 2 */}
      <div className="max-w-md mx-auto mb-10">
        <MediaUploader
          id="photo2"
          imageSrc={media.photo2}
          defaultFallbackUrl="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop"
          caption="Our First Date"
          subtext="THE BEGINNING OF FOREVER ✨"
          aspectRatio="portrait"
          onImageChange={(dataUrl) => onUpdateMedia('photo2', dataUrl)}
        />
      </div>

      {/* Deep Quote Card */}
      <div className="relative rounded-2xl p-6 sm:p-9 bg-gradient-to-br from-rose-950/80 via-[#180a14] to-purple-950/60 border border-rose-400/35 shadow-2xl text-center mb-10 overflow-hidden">
        <div className="absolute top-2 left-4 text-4xl text-rose-400/20 font-serif select-none">“</div>
        <div className="absolute bottom-2 right-4 text-4xl text-rose-400/20 font-serif select-none">”</div>
        <p className="font-cormorant italic text-xl sm:text-2xl text-rose-100/95 leading-relaxed font-normal">
          “There is always one night or one day when you realise you met someone... The meet when you see his soul, feel him around you even without seeing... There's always that one night that tells you that you're falling... ✨”
        </p>
      </div>

      {/* Section Header: HOW THAT DAY FELT */}
      <div className="glass-romantic-strong rounded-3xl p-6 sm:p-9 border border-rose-500/30 mb-10 space-y-6 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-rose-500/20 pb-3">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-rose-200">
            HOW THAT DAY FELT
          </h3>
        </div>

        <p className="text-rose-100/90 text-base sm:text-lg leading-relaxed font-light">
          The moment we sat together, every hesitation vanished into the night. It wasn't just a simple date — it was the quiet certainty of two souls feeling completely at peace. Looking into your eyes, laughing at the smallest things, I knew right then that you were never going to be just another person to me.
        </p>

        <p className="text-rose-200/90 text-base sm:text-lg leading-relaxed font-light italic">
          Laying on your chest that's always felt like home, I could smell the scent of your perfume at the back of your neck but...
        </p>

        {/* Special Quote Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-900/40 via-pink-900/30 to-rose-900/40 border border-rose-400/40 text-center shadow-lg">
          <p className="font-cormorant italic text-xl sm:text-2xl text-pink-100 font-semibold leading-snug">
            “When the scent of the perfume fades away and your hands lay on my skin, you will always be my home 🫶🏻 ❤️”
          </p>
        </div>
      </div>

      {/* Photo Card 3 */}
      <div className="max-w-md mx-auto mb-10">
        <MediaUploader
          id="photo3"
          imageSrc={media.photo3}
          defaultFallbackUrl="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000&auto=format&fit=crop"
          caption="You Will Always Be My Home 🫶🏻 ❤️"
          subtext="OUR FIRST DATE MEMORY"
          aspectRatio="portrait"
          onImageChange={(dataUrl) => onUpdateMedia('photo3', dataUrl)}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-rose-900/30">
        <button
          id="chapter2-prev-btn"
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 hover:text-white border border-rose-500/20 text-sm font-medium transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Chapter</span>
        </button>

        <button
          id="chapter2-continue-btn"
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
