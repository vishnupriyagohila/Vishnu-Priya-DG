import React, { useRef } from 'react';
import { X, Upload, Camera, Video, Music, Sparkles, Check } from 'lucide-react';
import { MediaAssets } from '../types';

interface MediaSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaAssets;
  onUpdateMedia: (key: keyof MediaAssets, dataUrl: string, name?: string) => void;
}

export const MediaSetupModal: React.FC<MediaSetupModalProps> = ({
  isOpen,
  onClose,
  media,
  onUpdateMedia,
}) => {
  const multiFileInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // Handle batch selection of photos
  const handleMultiFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = (Array.from(files) as File[]).filter(f => f.type.startsWith('image/'));
    const photoKeys: (keyof MediaAssets)[] = ['photo1', 'photo2', 'photo3', 'photo4', 'photo5'];

    fileList.forEach((file, index) => {
      if (index < photoKeys.length) {
        const reader = new FileReader();
        reader.onload = () => {
          onUpdateMedia(photoKeys[index], reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleSinglePhoto = (key: keyof MediaAssets, file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      onUpdateMedia(key, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onUpdateMedia('video', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onUpdateMedia('audio', reader.result as string, file.name);
    };
    reader.readAsDataURL(file);
  };

  const photoSlots = [
    { key: 'photo1' as keyof MediaAssets, label: 'Photo 1: 14th April – The Day We Met' },
    { key: 'photo2' as keyof MediaAssets, label: 'Photo 2: Our First Date' },
    { key: 'photo3' as keyof MediaAssets, label: 'Photo 3: You Will Always Be My Home' },
    { key: 'photo4' as keyof MediaAssets, label: 'Photo 4: Us Through Everything' },
    { key: 'photo5' as keyof MediaAssets, label: 'Photo 5: Forever My Home (You & Me)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#140810] border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-rose-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-rose-950/80 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-500/30 transition-colors"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950 border border-rose-500/40 text-xs font-mono text-rose-300">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>MEMORIES SETUP</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Upload Your Photos, Video & Song
          </h3>
          <p className="text-xs sm:text-sm text-rose-300/80 font-light max-w-lg mx-auto">
            Choose your files from your device to personalize the love letter for Jothi Ramalingar. Everything is saved automatically!
          </p>
        </div>

        {/* Batch Upload Button */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-rose-950/80 via-pink-950/60 to-rose-950/80 border border-rose-400/40 text-center space-y-2">
          <input
            type="file"
            ref={multiFileInputRef}
            onChange={handleMultiFiles}
            multiple
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => multiFileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-sm sm:text-base glow-pill border border-rose-300/40 transition-all cursor-pointer shadow-lg"
          >
            <Upload className="w-4 h-4" />
            <span>Select All 5 Photos at Once (Multi-Select)</span>
          </button>
          <p className="text-xs text-rose-300/70 font-mono">
            Or upload each photo individually below in order 1 to 5:
          </p>
        </div>

        {/* 5 Photos Grid */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-mono tracking-widest text-rose-400 uppercase font-semibold">
            Photos (Slots 1 to 5)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {photoSlots.map((slot, idx) => {
              const currentSrc = media[slot.key];
              return (
                <div
                  key={slot.key}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-black/40 border border-rose-500/20 hover:border-rose-400/40 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-rose-950/60 border border-rose-500/30 overflow-hidden flex items-center justify-center shrink-0">
                    {currentSrc ? (
                      <img
                        src={currentSrc}
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-5 h-5 text-rose-400/60" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-rose-100 truncate">{slot.label}</p>
                    <span className="text-[10px] font-mono text-rose-400/80">
                      {currentSrc ? '✅ Photo Loaded' : 'Default photo active'}
                    </span>
                  </div>
                  <label className="px-2.5 py-1 rounded-full bg-rose-900/50 hover:bg-rose-800 text-[11px] font-medium text-rose-200 border border-rose-500/30 cursor-pointer transition-colors whitespace-nowrap">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleSinglePhoto(slot.key, f);
                      }}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Video & Audio Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pt-2 border-t border-rose-900/30">
          {/* 5s Video */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-rose-500/20 space-y-2">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-semibold text-rose-200">5-Second Kiss Video</span>
            </div>
            <p className="text-[11px] text-rose-300/80">
              {media.video ? '✅ Custom Video Loaded' : 'No video uploaded yet'}
            </p>
            <input
              type="file"
              ref={videoInputRef}
              onChange={handleVideo}
              accept="video/*"
              className="hidden"
            />
            <button
              onClick={() => videoInputRef.current?.click()}
              className="w-full py-2 rounded-xl bg-rose-950/70 hover:bg-rose-900 text-xs font-medium text-rose-200 border border-rose-500/30 transition-colors"
            >
              📹 {media.video ? 'Replace 5s Video' : 'Upload 5s Video'}
            </button>
          </div>

          {/* Audio Song */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-rose-500/20 space-y-2">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-semibold text-rose-200">Background Love Song</span>
            </div>
            <p className="text-[11px] text-rose-300/80 truncate">
              {media.audioName || (media.audio ? 'Custom Song Loaded' : 'Eppadi Vandhaayo (Synth)')}
            </p>
            <input
              type="file"
              ref={audioInputRef}
              onChange={handleAudio}
              accept="audio/*"
              className="hidden"
            />
            <button
              onClick={() => audioInputRef.current?.click()}
              className="w-full py-2 rounded-xl bg-rose-950/70 hover:bg-rose-900 text-xs font-medium text-rose-200 border border-rose-500/30 transition-colors"
            >
              🎵 {media.audio ? 'Change Song File' : 'Upload MP3 Song'}
            </button>
          </div>
        </div>

        {/* Done Button */}
        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-base glow-pill border border-rose-300/40 transition-all cursor-pointer shadow-xl"
          >
            <Check className="w-4 h-4" />
            <span>Save & View Love Story</span>
          </button>
        </div>
      </div>
    </div>
  );
};
