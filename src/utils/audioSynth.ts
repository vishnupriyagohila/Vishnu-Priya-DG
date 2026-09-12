// Romantic background audio synthesizer using Web Audio API
// Generates a soft, dreamy music-box / harp romantic melody for the love letter
class RomanticAudioSynth {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;

  private notes = [
    // D Major / B Minor romantic pentatonic frequencies
    293.66, // D4
    329.63, // E4
    369.99, // F#4
    440.00, // A4
    493.88, // B4
    587.33, // D5
    659.25, // E5
    739.99, // F#5
    880.00, // A5
  ];

  private melodySequence = [
    // Warm romantic lullaby arpeggios
    0, 2, 3, 5, 4, 3, 2, 0,
    1, 3, 4, 6, 5, 4, 3, 1,
    2, 4, 5, 7, 6, 5, 4, 2,
    3, 5, 6, 8, 7, 6, 5, 3
  ];

  private stepIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public play() {
    this.initContext();
    if (!this.ctx || this.isRunning) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isRunning = true;
    this.stepIndex = 0;
    this.scheduleNotes();
  }

  public pause() {
    this.isRunning = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, vol)) * 0.25, this.ctx.currentTime, 0.1);
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  private scheduleNotes() {
    if (!this.isRunning || !this.ctx || !this.masterGain) return;

    const noteIdx = this.melodySequence[this.stepIndex % this.melodySequence.length];
    const freq = this.notes[noteIdx % this.notes.length];
    const now = this.ctx.currentTime;

    // Create bell/harp oscillator
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm bell envelope with soft decay
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    // Secondary sub-harmonic for warm acoustic guitar undertone
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 0.5, now);
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.exponentialRampToValueAtTime(0.08, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc2.connect(gain2);
    gain2.connect(this.masterGain);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 1.8);
    osc2.stop(now + 1.8);

    this.stepIndex++;

    // Tempo: ~340ms between notes for a tender flowing rhythm
    this.timerId = window.setTimeout(() => {
      this.scheduleNotes();
    }, 340);
  }
}

export const romanticSynth = new RomanticAudioSynth();
