import React, { useRef, useState } from 'react';
import { Camera, Upload, Sparkles } from 'lucide-react';

interface MediaUploaderProps {
  id: string;
  imageSrc: string | null;
  defaultFallbackUrl: string;
  caption: string;
  subtext: string;
  onImageChange: (dataUrl: string) => void;
  aspectRatio?: 'square' | 'portrait' | 'video' | 'landscape';
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  id,
  imageSrc,
  defaultFallbackUrl,
  caption,
  subtext,
  onImageChange,
  aspectRatio = 'portrait',
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const displayImage = imageSrc || defaultFallbackUrl;
  const isCustomUploaded = Boolean(imageSrc);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      onImageChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const ratioClasses = {
    square: 'aspect-square max-h-[380px]',
    portrait: 'aspect-[3/4] max-h-[460px]',
    landscape: 'aspect-[4/3] max-h-[360px]',
    video: 'aspect-[9/16] max-h-[500px]',
  }[aspectRatio];

  return (
    <div
      id={`photo-card-wrapper-${id}`}
      className={`relative group rounded-3xl overflow-hidden glass-romantic-strong border transition-all duration-300 ${
        dragOver ? 'border-rose-400 scale-[1.02] shadow-2xl shadow-rose-600/40' : 'border-rose-500/30 hover:border-rose-400/60'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
        id={`photo-input-${id}`}
      />

      {/* Frame / Photo Display */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`relative w-full ${ratioClasses} bg-[#120810] overflow-hidden flex items-center justify-center cursor-pointer`}
      >
        <img
          src={displayImage}
          alt={caption}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d060a]/90 via-transparent to-black/25 pointer-events-none" />

        {/* Top Status Badge */}
        <div className="absolute top-3 left-3 z-10">
          {isCustomUploaded ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-[10px] font-mono text-emerald-200 backdrop-blur-md shadow-md">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span>Your Photo Loaded</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-400/30 text-[10px] font-mono text-rose-300 backdrop-blur-md shadow-md">
              <Camera className="w-3 h-3 text-rose-400" />
              <span>Tap to replace with your photo</span>
            </span>
          )}
        </div>

        {/* Change Photo Overlay Button */}
        <button
          id={`change-photo-btn-${id}`}
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-rose-900/90 backdrop-blur-md text-xs text-rose-200 border border-rose-400/50 shadow-xl cursor-pointer transition-all duration-300 group-hover:scale-105"
          title="Click to change or upload this photo"
          type="button"
        >
          <Camera className="w-3.5 h-3.5 text-rose-400" />
          <span className="font-medium">{isCustomUploaded ? '📷 Change Photo' : '📷 Add Your Photo'}</span>
        </button>

        {/* Drag & Drop Hint Overlay on hover */}
        <div
          className={`absolute inset-0 bg-rose-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center transition-opacity duration-300 pointer-events-none ${
            dragOver ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Upload className="w-12 h-12 text-rose-300 animate-bounce mb-2" />
          <p className="font-serif text-lg text-white font-semibold">Drop Your Photo Here</p>
          <p className="text-xs text-rose-200">Will replace this photo instantly</p>
        </div>
      </div>

      {/* Caption & Subtext Details */}
      <div className="p-4 sm:p-5 relative z-10 text-center bg-gradient-to-b from-[#120710]/90 to-[#0d060a]">
        <h4 className="font-serif text-lg sm:text-xl font-semibold text-rose-100 tracking-wide drop-shadow-sm">
          {caption}
        </h4>
        <p className="text-[11px] sm:text-xs tracking-widest font-mono text-rose-400/90 uppercase mt-1 font-medium">
          {subtext}
        </p>
      </div>
    </div>
  );
};
