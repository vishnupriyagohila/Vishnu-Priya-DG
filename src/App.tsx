/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MediaAssets } from './types';
import { getAllMediaItems, saveMediaItem } from './utils/mediaStorage';
import { FloatingHeartsCanvas } from './components/FloatingHeartsCanvas';
import { HeaderPlayer } from './components/HeaderPlayer';
import { SlideIntro } from './components/SlideIntro';
import { SlideChapter1 } from './components/SlideChapter1';
import { SlideChapter2 } from './components/SlideChapter2';
import { SlideQuestion } from './components/SlideQuestion';
import { SlidePromise } from './components/SlidePromise';
import { SlidePostcard } from './components/SlidePostcard';
import { MediaSetupModal } from './components/MediaSetupModal';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const totalSlides = 6;
  const globalAudioPickerRef = useRef<HTMLInputElement | null>(null);

  const [media, setMedia] = useState<MediaAssets>({
    photo1: null,
    photo2: null,
    photo3: null,
    photo4: null,
    photo5: null,
    video: null,
    audio: null,
    audioName: null,
  });

  // Load saved media from IndexedDB on initial mount
  useEffect(() => {
    async function loadSavedAssets() {
      try {
        const stored = await getAllMediaItems();
        if (stored && Object.keys(stored).length > 0) {
          setMedia((prev) => ({
            photo1: stored['photo1'] || prev.photo1,
            photo2: stored['photo2'] || prev.photo2,
            photo3: stored['photo3'] || prev.photo3,
            photo4: stored['photo4'] || prev.photo4,
            photo5: stored['photo5'] || prev.photo5,
            video: stored['video'] || prev.video,
            audio: stored['audio'] || prev.audio,
            audioName: stored['audioName'] || prev.audioName,
          }));
        }
      } catch (e) {
        console.warn('Error loading media assets:', e);
      }
    }
    loadSavedAssets();
  }, []);

  const handleUpdateMedia = (key: keyof MediaAssets, dataUrl: string, name?: string) => {
    setMedia((prev) => ({
      ...prev,
      [key]: dataUrl,
      ...(name ? { audioName: name } : {}),
    }));

    saveMediaItem(key, dataUrl);
    if (name) {
      saveMediaItem('audioName', name);
    }
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpTo = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetToBeginning = () => {
    setCurrentSlide(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openGlobalSongPicker = () => {
    if (globalAudioPickerRef.current) {
      globalAudioPickerRef.current.click();
    } else {
      const headerUpload = document.getElementById('header-audio-file-input') as HTMLInputElement | null;
      headerUpload?.click();
    }
  };

  const handleGlobalAudioFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      handleUpdateMedia('audio', reader.result as string, file.name);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d060a] via-[#140810] to-[#180a12] text-rose-100 font-sans relative overflow-x-hidden">
      {/* Background Floating Hearts Canvas */}
      <FloatingHeartsCanvas />

      {/* Hidden global audio uploader */}
      <input
        type="file"
        ref={globalAudioPickerRef}
        onChange={handleGlobalAudioFile}
        accept="audio/*"
        className="hidden"
        id="global-audio-input"
      />

      {/* Sticky Top Header with progress dots and audio player */}
      <HeaderPlayer
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onSelectSlide={handleJumpTo}
        audioSrc={media.audio}
        audioName={media.audioName}
        onAudioUpload={(dataUrl, name) => handleUpdateMedia('audio', dataUrl, name)}
        onOpenMediaSetup={() => setIsMediaModalOpen(true)}
      />

      {/* Media Setup Modal */}
      <MediaSetupModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        media={media}
        onUpdateMedia={handleUpdateMedia}
      />

      {/* Main Slide Carousel Container */}
      <main className="relative z-10 py-4 sm:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full"
          >
            {currentSlide === 0 && (
              <SlideIntro
                onNext={handleNext}
                onPrev={handlePrev}
                onJumpTo={handleJumpTo}
                media={media}
                onUpdateMedia={handleUpdateMedia}
                onOpenMediaSetup={() => setIsMediaModalOpen(true)}
              />
            )}

            {currentSlide === 1 && (
              <SlideChapter1
                onNext={handleNext}
                onPrev={handlePrev}
                onJumpTo={handleJumpTo}
                media={media}
                onUpdateMedia={handleUpdateMedia}
              />
            )}

            {currentSlide === 2 && (
              <SlideChapter2
                onNext={handleNext}
                onPrev={handlePrev}
                onJumpTo={handleJumpTo}
                media={media}
                onUpdateMedia={handleUpdateMedia}
              />
            )}

            {currentSlide === 3 && (
              <SlideQuestion
                onNext={handleNext}
                onPrev={handlePrev}
                onJumpTo={handleJumpTo}
                media={media}
                onUpdateMedia={handleUpdateMedia}
              />
            )}

            {currentSlide === 4 && (
              <SlidePromise
                onNext={handleNext}
                onPrev={handlePrev}
                onJumpTo={handleJumpTo}
                media={media}
                onUpdateMedia={handleUpdateMedia}
                onResetToBeginning={handleResetToBeginning}
                onOpenSongPicker={openGlobalSongPicker}
              />
            )}

            {currentSlide === 5 && (
              <SlidePostcard
                onNext={handleNext}
                onPrev={handlePrev}
                onJumpTo={handleJumpTo}
                media={media}
                onUpdateMedia={handleUpdateMedia}
                onResetToBeginning={handleResetToBeginning}
                onOpenSongPicker={openGlobalSongPicker}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
