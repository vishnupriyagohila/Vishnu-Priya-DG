import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Upload, Play, Pause, Heart } from 'lucide-react';
import { romanticSynth } from '../utils/audioSynth';

interface HeaderPlayerProps {
  currentSlide: number;
  totalSlides: number;
  onSelectSlide: (index: number) => void;
  audioSrc: string | null;
  audioName: string | null;
  onAudioUpload: (audioDataUrl: string, name: string) => void;
  onOpenMediaSetup?: () => void;
}

export const HeaderPlayer: React.FC<HeaderPlayerProps> = ({
  currentSlide,
  totalSlides,
  onSelectSlide,
  audioSrc,
  audioName,
  onAudioUpload,
  onOpenMediaSetup,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize audio element when audioSrc changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      if (audioSrc) {
        audioRef.current.src = audioSrc;
        if (isPlaying) {
          audioRef.current.play().catch(() => {});
        }
      }
    }
  }, [audioSrc]);

  // Handle first user interaction anywhere to unlock audio playback smoothly
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // Start playing synth or audio
        startAudio();
      }
    };
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted, audioSrc]);

  const startAudio = () => {
    if (audioSrc && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Audio play failed, falling back to synth', e);
        romanticSynth.play();
        setIsPlaying(true);
      });
    } else {
      romanticSynth.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    romanticSynth.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      startAudio();
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
    romanticSynth.setVolume(nextMuted ? 0 : volume);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (!isMuted) {
      romanticSynth.setVolume(val);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      onAudioUpload(dataUrl, file.name);
      // Stop synth if it was running and prepare audio element
      romanticSynth.pause();
      if (audioRef.current) {
        audioRef.current.src = dataUrl;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => console.warn('Play upload failed', err));
      }
    };
    reader.readAsDataURL(file);
  };

  const slideNames = [
    'Intro & Apology',
    'Ch 1: The Spark',
    'Ch 2: The First Date',
    'A Little Question',
    'Apology & Promise',
    'Oru Kissyyy Pls',
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0d060a]/80 border-b border-rose-900/30 transition-all duration-300">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="max-w-5xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Romantic Title & Dots */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-rose-300 font-serif text-sm tracking-wide">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span className="hidden sm:inline font-semibold text-rose-200">For Jothi Ramalingar</span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 bg-rose-950/40 px-2.5 py-1 rounded-full border border-rose-800/30">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                id={`progress-dot-${idx}`}
                onClick={() => onSelectSlide(idx)}
                title={slideNames[idx] || `Slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === idx
                    ? 'w-5 h-2 bg-gradient-to-r from-rose-500 to-pink-500 shadow-sm shadow-rose-500/50'
                    : 'w-2 h-2 bg-rose-900/60 hover:bg-rose-700/80'
                }`}
                aria-label={`Go to ${slideNames[idx]}`}
              />
            ))}
          </div>
          <span className="text-xs text-rose-400/80 font-mono">
            {currentSlide + 1}/{totalSlides}
          </span>
        </div>

        {/* Right: Music Player Banner */}
        <div className="flex items-center gap-2 sm:gap-3 bg-rose-950/40 border border-rose-500/20 px-3 py-1.5 rounded-full shadow-inner shadow-rose-950/50">
          {/* Animated Equalizer */}
          <div className="flex items-end gap-0.5 h-4 w-4 px-0.5" title={isPlaying ? 'Music playing' : 'Music paused'}>
            <span
              className={`w-0.5 bg-rose-400 rounded-full transition-all duration-200 ${
                isPlaying ? 'animate-eq-1' : 'h-1 opacity-50'
              }`}
            />
            <span
              className={`w-0.5 bg-pink-400 rounded-full transition-all duration-200 ${
                isPlaying ? 'animate-eq-2' : 'h-2 opacity-50'
              }`}
            />
            <span
              className={`w-0.5 bg-rose-400 rounded-full transition-all duration-200 ${
                isPlaying ? 'animate-eq-3' : 'h-1.5 opacity-50'
              }`}
            />
            <span
              className={`w-0.5 bg-pink-500 rounded-full transition-all duration-200 ${
                isPlaying ? 'animate-eq-4' : 'h-1 opacity-50'
              }`}
            />
          </div>

          {/* Playing Status & Song name */}
          <div className="flex flex-col text-left max-w-[130px] sm:max-w-[200px] truncate">
            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-rose-500/50'}`} />
              <span className="text-[10px] font-bold tracking-wider uppercase text-rose-300">
                {isPlaying ? 'PLAYING' : 'PAUSED'}
              </span>
            </div>
            <span className="text-xs text-rose-200/90 font-medium truncate">
              {audioName || (audioSrc ? 'Custom Love Song' : 'Eppadi Vandhaayo ♫')}
            </span>
          </div>

          {/* Play/Pause Button */}
          <button
            id="audio-play-pause-btn"
            onClick={togglePlay}
            className="p-1.5 rounded-full bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 transition-colors border border-rose-500/30"
            title={isPlaying ? 'Pause music' : 'Play music'}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          {/* Mute toggle */}
          <button
            id="audio-mute-btn"
            onClick={toggleMute}
            className="p-1.5 rounded-full text-rose-300 hover:text-rose-100 hover:bg-rose-800/30 transition-colors hidden sm:inline-flex"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Add / Change Song Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="audio/*"
            className="hidden"
            id="header-audio-file-input"
          />
          <button
            id="header-upload-song-btn"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-rose-950/60 hover:bg-rose-900 text-rose-200 font-medium border border-rose-400/30 transition-all whitespace-nowrap cursor-pointer"
            title="Upload your MP3 or audio song track"
          >
            <Music className="w-3 h-3 text-rose-400" />
            <span className="hidden sm:inline">Song</span>
          </button>

          {/* Quick Upload Photos & Video Modal Trigger */}
          {onOpenMediaSetup && (
            <button
              id="header-open-media-modal-btn"
              onClick={onOpenMediaSetup}
              className="flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium border border-rose-300/40 shadow-sm transition-all whitespace-nowrap cursor-pointer glow-pill"
              title="Upload your 5 photos, 5s video, and song"
            >
              <Upload className="w-3 h-3" />
              <span>Photos & Video</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
