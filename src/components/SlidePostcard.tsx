import React, { useRef, useState } from 'react';
import { Heart, RotateCcw, Video, Upload, Sparkles, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SlideProps } from '../types';

interface SlidePostcardProps extends SlideProps {
  onResetToBeginning: () => void;
  onOpenSongPicker: () => void;
}

export const SlidePostcard: React.FC<SlidePostcardProps> = ({
  onResetToBeginning,
  onOpenSongPicker,
  media,
  onUpdateMedia,
}) => {
  const [kissCount, setKissCount] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      onUpdateMedia('video', dataUrl);
      if (videoRef.current) {
        videoRef.current.src = dataUrl;
        videoRef.current.play().catch(() => {});
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSendKiss = () => {
    setKissCount((prev) => prev + 1);

    // Confetti hearts and kiss lips
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff1493', '#ff3366', '#ffffff', '#e11d48'],
      shapes: ['circle'],
    });

    // Spawn floating emoji
    const heart = document.createElement('div');
    heart.innerText = ['💋', '😘', '❤️', '🫶🏻', '💕'][Math.floor(Math.random() * 5)];
    heart.className = 'fixed text-3xl pointer-events-none z-50 animate-float-kiss';
    heart.style.left = `${Math.random() * 70 + 15}%`;
    heart.style.bottom = '15%';
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2000);
  };

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
  };

  return (
    <div className="min-h-[85vh] max-w-3xl mx-auto px-4 py-8 relative z-10 space-y-10">
      {/* Badge */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-xs font-mono tracking-widest text-rose-300 uppercase shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          FINAL SURPRISE POSTCARD
        </span>
      </div>

      {/* Main Postcard Frame */}
      <div className="relative rounded-3xl glass-romantic-strong border-2 border-rose-500/40 p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Postcard vintage airmail border effect */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(45deg,#e11d48,#e11d48_15px,#ffffff15_15px,#ffffff15_30px,#9333ea_30px,#9333ea_45px,#ffffff15_45px,#ffffff15_60px)] opacity-70" />

        {/* Top Postcard Header: Stamp & Cancellation Mark */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pt-2">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-rose-400/90 uppercase block">
              SPECIAL LOVE DELIVERY • PAR AVION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mt-1">
              ORU KISSSSYYY PLSSSS <span className="text-rose-400 inline-block animate-pulse">🥹💋</span>
            </h2>
            <p className="font-cormorant italic text-lg sm:text-xl text-rose-300/90 mt-1">
              Just one sweet kissy to melt away all the hurt and make everything right forever... 🥺❤️
            </p>
          </div>

          {/* Vintage Stamp */}
          <div className="relative border-2 border-dashed border-rose-400/60 p-2.5 rounded-xl bg-rose-950/60 flex flex-col items-center justify-center text-center shadow-md w-24 shrink-0 rotate-2 hover:rotate-0 transition-transform">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <span className="text-[9px] font-mono font-bold tracking-widest text-rose-200 mt-1">LOVE POST</span>
            <span className="text-[8px] text-pink-300/70 font-mono">14.04 • 28.03</span>
            {/* Postal Mark */}
            <div className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full border border-rose-400/50 flex items-center justify-center text-[7px] font-mono text-rose-300 rotate-[-15deg] pointer-events-none">
              SEALED
            </div>
          </div>
        </div>

        {/* 5-Second Video Player Section */}
        <div className="my-8">
          <div className="text-center mb-3 flex items-center justify-center gap-2">
            <Video className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-rose-300">
              Our 5-Second Tender Kiss Video
            </span>
          </div>

          <div className="relative max-w-sm mx-auto rounded-2xl overflow-hidden glass-romantic border border-rose-500/40 shadow-2xl group">
            <input
              type="file"
              ref={videoInputRef}
              onChange={handleVideoUpload}
              accept="video/*"
              className="hidden"
              id="video-upload-input"
            />

            {media.video ? (
              <div className="relative aspect-[9/16] max-h-[460px] bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={media.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onClick={toggleVideoPlayback}
                  className="w-full h-full object-cover cursor-pointer"
                />
                {/* Overlay Play Indicator when paused */}
                {!videoPlaying && (
                  <div
                    onClick={toggleVideoPlayback}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-full bg-rose-600/80 border border-rose-300 flex items-center justify-center text-white text-xl pl-1 shadow-lg">
                      ▶
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Fallback Video Card with upload prompt */
              <div
                onClick={() => videoInputRef.current?.click()}
                className="aspect-[9/16] max-h-[460px] bg-gradient-to-b from-rose-950/70 via-purple-950/50 to-stone-950/80 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-rose-950/80 transition-colors"
              >
                <div className="w-20 h-20 rounded-full bg-rose-600/20 border border-rose-400 flex items-center justify-center text-3xl mb-4 animate-bounce">
                  💋
                </div>
                <h4 className="font-serif text-lg font-bold text-white mb-1">
                  5-Second Love Video Clip
                </h4>
                <p className="text-xs text-rose-300/80 max-w-[200px] mb-4">
                  Tap to add your 5-second video clip of that tender kiss!
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-900/60 border border-rose-400/40 text-xs text-rose-200">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload / Add 5s Video</span>
                </span>
              </div>
            )}

            {/* Change video button top overlay */}
            <button
              id="change-video-btn"
              onClick={() => videoInputRef.current?.click()}
              className="absolute top-3 right-3 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/70 hover:bg-rose-900/80 backdrop-blur-md text-xs text-rose-200 border border-rose-400/40 shadow-lg cursor-pointer transition-all opacity-90 hover:opacity-100"
              title="Change video"
            >
              <Video className="w-3.5 h-3.5 text-rose-400" />
              <span>{media.video ? '📹 Change Video' : '📹 Upload Video'}</span>
            </button>
          </div>

          <p className="text-center text-xs text-rose-400/90 font-mono mt-2">
            That tender kissy that made my whole world freeze in love ✨
          </p>
        </div>

        {/* Interactive Kiss Button */}
        <div className="text-center space-y-3 pt-2">
          <button
            id="send-virtual-kiss-btn"
            onClick={handleSendKiss}
            className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 hover:from-pink-500 hover:to-rose-500 text-white font-serif text-xl font-bold tracking-wide glow-pill transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border border-pink-300/50 shadow-2xl"
          >
            <span>Send A Virtual Kissy 💋</span>
          </button>

          {kissCount > 0 && (
            <p className="text-sm sm:text-base text-pink-300 font-serif animate-fade-in">
              {kissCount === 1 ? (
                <span>Mwahhh! First kissy sent to Jothi! 😘❤️</span>
              ) : (
                <span>{kissCount} sweet kisses sent to my thangoo! 🫶🏻💋</span>
              )}
            </p>
          )}
        </div>

        {/* Postcard Handwritten Sign-off */}
        <div className="mt-8 pt-6 border-t border-rose-500/20 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-rose-400/70 uppercase">Delivered with love to:</span>
            <p className="font-serif font-bold text-rose-200 text-lg">Jothi Ramalingar</p>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-mono text-rose-400/70 uppercase">Forever Yours:</span>
            <p className="font-cursive text-3xl text-pink-300">Yen Thangoo ❤️</p>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="pt-6 border-t border-rose-900/30 flex flex-wrap items-center justify-center gap-4 text-center">
        <button
          id="postcard-reset-btn"
          onClick={onResetToBeginning}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-950/60 hover:bg-rose-900/70 text-rose-300 hover:text-white border border-rose-500/30 text-sm font-medium transition-all cursor-pointer shadow-md"
        >
          <RotateCcw className="w-4 h-4" />
          <span>↻ Read Our Story Again From The Beginning</span>
        </button>

        <button
          id="postcard-song-btn"
          onClick={onOpenSongPicker}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-950/60 hover:bg-rose-900/70 text-rose-300 hover:text-white border border-rose-500/30 text-sm font-medium transition-all cursor-pointer shadow-md"
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
