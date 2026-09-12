export interface SlideProps {
  onNext: () => void;
  onPrev?: () => void;
  onJumpTo?: (slideIndex: number) => void;
  media: MediaAssets;
  onUpdateMedia: (key: keyof MediaAssets, dataUrl: string, fileName?: string) => void;
}

export interface MediaAssets {
  photo1: string | null;
  photo2: string | null;
  photo3: string | null;
  photo4: string | null;
  photo5: string | null;
  video: string | null;
  audio: string | null;
  audioName: string | null;
}
