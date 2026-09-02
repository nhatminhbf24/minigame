/**
 * High Reliability Vietnamese Sound Engine for Bé Nhật Minh
 * - 100% accurate native Vietnamese voice pronunciation
 * - Smart Audio Caching (0ms latency after first play)
 * - Web Audio API for snappy pop sounds and vehicle horns
 * - Failsafe fallback: never reads garbled English if Vietnamese voice is missing
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private voiceEnabled: boolean = true;
  private viVoice: SpeechSynthesisVoice | null = null;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private bufferCache: Map<string, AudioBuffer> = new Map();
  private isUnlocked: boolean = false;
  private activeUtterances: Set<SpeechSynthesisUtterance> = new Set();
  private currentAudio: HTMLAudioElement | null = null;
  private isPreloaded: boolean = false;

  // Authentic sound file mapping
  private soundFileMap: Record<string, string> = {
    // Animals
    dog: '/sounds/dog.mp3',
    puppy: '/sounds/dog.mp3',
    cat: '/sounds/cat.mp3',
    kitten: '/sounds/cat.mp3',
    lion: '/sounds/lion.mp3',
    tiger: '/sounds/tiger.mp3',
    elephant: '/sounds/elephant.mp3',
    cow: '/sounds/cow.mp3',
    horse: '/sounds/horse.mp3',
    sheep: '/sounds/sheep.mp3',
    goat: '/sounds/sheep.mp3',
    pig: '/sounds/pig.mp3',
    duck: '/sounds/duck.mp3',
    chicken: '/sounds/rooster.mp3',
    rooster: '/sounds/rooster.mp3',
    frog: '/sounds/frog.mp3',
    zebra: '/sounds/zebra.mp3',
    panda: '/sounds/panda.mp3',
    rabbit: '/sounds/rabbit.mp3',
    bunny: '/sounds/rabbit.mp3',
    squirrel: '/sounds/rabbit.mp3',
    monkey: '/sounds/monkey.mp3',
    penguin: '/sounds/penguin.mp3',
    bee: '/sounds/bee.mp3',
    owl: '/sounds/owl.mp3',
    bear: '/sounds/wolf.mp3',
    deer: '/sounds/moose.mp3',
    giraffe: '/sounds/moose.mp3',
    fox: '/sounds/wolf.mp3',
    leopard: '/sounds/leopard.mp3',
    rhino: '/sounds/rhinoceros.mp3',
    rhinoceros: '/sounds/rhinoceros.mp3',
    hippo: '/sounds/hippopotamus.mp3',
    hippopotamus: '/sounds/hippopotamus.mp3',
    crocodile: '/sounds/alligator.mp3',
    alligator: '/sounds/alligator.mp3',

    // Vehicles & Objects
    car: '/sounds/car_horn.ogg',
    bus: '/sounds/car_horn.ogg',
    truck: '/sounds/car_horn.ogg',
    delivery_truck: '/sounds/car_horn.ogg',
    race_car: '/sounds/car_horn.ogg',
    motorcycle: '/sounds/car_horn.ogg',
    excavator: '/sounds/car_horn.ogg',
    firetruck: '/sounds/firetruck_siren.ogg',
    police: '/sounds/firetruck_siren.ogg',
    ambulance: '/sounds/ambulance_siren.ogg',
    train: '/sounds/train_whistle.ogg',
    bullet_train: '/sounds/train_whistle.ogg',
    bicycle: '/sounds/bicycle_bell.ogg',
    airplane: '/sounds/airplane.ogg',
    helicopter: '/sounds/airplane.ogg',
    ship: '/sounds/ship_bell.ogg',
    boat: '/sounds/ship_bell.ogg',
    rocket: '/sounds/clown_horn.ogg',
  };

  constructor() {
    this.initVoices();
    this.setupGlobalUnlock();
  }

  private setupGlobalUnlock() {
    if (typeof window === 'undefined') return;

    const unlock = () => {
      if (this.isUnlocked) return;
      this.initContext();
      this.isUnlocked = true;
      this.preloadSounds();

      // Warm up TTS engine
      if ('speechSynthesis' in window) {
        window.speechSynthesis.resume();
      }

      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('touchend', unlock);
      window.removeEventListener('click', unlock);
    };

    window.addEventListener('touchstart', unlock, { passive: true });
    window.addEventListener('touchend', unlock, { passive: true });
    window.addEventListener('click', unlock, { passive: true });
  }

  /**
   * Preload audio files into Web Audio decoded buffers for 0ms latency
   */
  public async preloadSounds() {
    if (this.isPreloaded || typeof window === 'undefined') return;
    this.isPreloaded = true;

    const ctx = this.initContext();
    if (!ctx) return;

    const uniqueUrls = Array.from(new Set(Object.values(this.soundFileMap)));

    for (const url of uniqueUrls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
          this.bufferCache.set(url, audioBuffer);
        }
      } catch {
        // Fallback gracefully to on-demand or synthesis
      }
    }
  }

  private initContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private initVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const load = () => {
        const voices = window.speechSynthesis.getVoices();
        const vi = voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith('vi') ||
            v.lang.toLowerCase().includes('vn') ||
            v.name.toLowerCase().includes('vietnam')
        );
        this.viVoice = vi || null;
      };

      load();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = load;
      }
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public isVoiceEnabled(): boolean {
    return this.voiceEnabled;
  }

  /**
   * Crisp, organic bubble popping sound using Web Audio API
   */
  public playPop(frequencyVariation = 1.0) {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const baseFreq = 480 * frequencyVariation + (Math.random() * 80 - 40);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * 2.2, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + 0.08);

      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);

      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(15);
      }
    } catch {
      // Audio fallback
    }
  }

  /**
   * High-pitch sparkle chime for magic/surprise bubbles
   */
  public playSparkle() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.04;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.35, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {
      // Audio fallback
    }
  }

  /**
   * Vehicle & Animal Sounds - Real authentic sound playback with Web Audio synthesis fallback
   */
  public playSpecialSound(type: string, specificId?: string) {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();

    // Look up authentic audio file first
    const key = (specificId || type || '').toLowerCase();
    const soundUrl = this.soundFileMap[key] || this.soundFileMap[type?.toLowerCase()];

    if (soundUrl) {
      // 1. Try playing from pre-decoded AudioBuffer (ultra-low latency < 5ms)
      if (ctx && this.bufferCache.has(soundUrl)) {
        try {
          const buffer = this.bufferCache.get(soundUrl)!;
          const source = ctx.createBufferSource();
          const gain = ctx.createGain();
          source.buffer = buffer;

          const now = ctx.currentTime;
          const maxPlayTime = 1.8; // Capping sound duration to maximum 1.8s for toddler comfort
          const playDuration = Math.min(buffer.duration, maxPlayTime);

          gain.gain.setValueAtTime(0.85, now);
          // Smooth fade-out in the last 0.25s so it never abruptly clicks
          if (playDuration > 0.4) {
            gain.gain.setValueAtTime(0.85, now + playDuration - 0.25);
            gain.gain.exponentialRampToValueAtTime(0.001, now + playDuration);
          }

          source.connect(gain);
          gain.connect(ctx.destination);
          source.start(0);
          source.stop(now + playDuration);
          return;
        } catch {
          // Continue to fallback
        }
      }

      // 2. Try HTML5 Audio playback if buffer not decoded yet
      try {
        if (this.currentAudio) {
          this.currentAudio.pause();
          this.currentAudio.currentTime = 0;
        }
        let audio = this.audioCache.get(soundUrl);
        if (!audio) {
          audio = new Audio(soundUrl);
          audio.preload = 'auto';
          this.audioCache.set(soundUrl, audio);
        }
        audio.currentTime = 0;
        this.currentAudio = audio;
        audio.play().catch(() => {});

        // Automatically pause and reset after 1.8s
        setTimeout(() => {
          if (audio && !audio.paused) {
            audio.pause();
            audio.currentTime = 0;
          }
        }, 1800);
        return;
      } catch {
        // Continue to synthesis fallback
      }
    }

    // 3. Fallback to Web Audio synthesis
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      if (type === 'car' || type === 'excavator' || type === 'truck' || type === 'bus') {
        // Double honk "Bíp Bíp!"
        [0, 0.11].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(440, now + offset);
          gain.gain.setValueAtTime(0.35, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.09);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.09);
        });
      } else if (type === 'firetruck' || type === 'police' || type === 'ambulance') {
        // Siren wavering
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.linearRampToValueAtTime(960, now + 0.18);
        osc.frequency.linearRampToValueAtTime(620, now + 0.36);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.42);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.42);
      } else if (type === 'train') {
        // Train whistle tu-tu
        [587.33, 739.99].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.28, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.35);
        });
      } else if (type === 'puppy' || type === 'dog') {
        // Playful Puppy Woof!
        [0, 0.12].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(340, now + offset);
          osc.frequency.exponentialRampToValueAtTime(170, now + offset + 0.08);
          gain.gain.setValueAtTime(0.4, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.08);
        });
      } else if (type === 'kitten' || type === 'cat') {
        // Cute Kitten Meow
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.linearRampToValueAtTime(920, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.35);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'lion' || type === 'tiger') {
        // Deep friendly roar
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.15);
        osc.frequency.linearRampToValueAtTime(90, now + 0.45);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'elephant') {
        // Trumpet
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(560, now + 0.12);
        osc.frequency.linearRampToValueAtTime(420, now + 0.35);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.38);
      } else if (type === 'horse' || type === 'zebra') {
        // Horse whinny
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.15);
        osc.frequency.linearRampToValueAtTime(600, now + 0.32);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'frog') {
        // Frog croak "Ộp ộp"
        [0, 0.12].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(160, now + offset);
          osc.frequency.exponentialRampToValueAtTime(100, now + offset + 0.08);
          gain.gain.setValueAtTime(0.35, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.08);
        });
      } else if (type === 'sheep' || type === 'goat') {
        // Sheep "Be be"
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.3);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'pig') {
        // Pig oink
        [0, 0.1].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(220, now + offset);
          osc.frequency.exponentialRampToValueAtTime(140, now + offset + 0.07);
          gain.gain.setValueAtTime(0.3, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.07);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.07);
        });
      } else if (type === 'cow') {
        // Cow Moo
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.linearRampToValueAtTime(180, now + 0.2);
        osc.frequency.linearRampToValueAtTime(120, now + 0.5);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'duck' || type === 'chicken') {
        // Cheerful Quack
        [0, 0.1].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(480, now + offset);
          osc.frequency.exponentialRampToValueAtTime(260, now + offset + 0.09);
          gain.gain.setValueAtTime(0.3, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.09);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.09);
        });
      } else {
        this.playSparkle();
      }
    } catch {
      // Audio fallback
    }
  }

  /**
   * Gentle bubble blow sound
   */
  public playBubbleBlow() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.06);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Speak Vietnamese with 100% natural accent & high reliability:
   * 1. Try high-quality standard Vietnamese TTS audio (cached)
   * 2. Fallback to Web Speech API ONLY IF device has true Vietnamese voice
   * 3. If no Vietnamese voice is installed on OS, play pleasant chime instead of garbled English!
   */
  public speakVietnamese(text: string) {
    if (!this.voiceEnabled || !text) return;

    // Check Audio Cache first for instant playback
    const cleanText = text.trim();
    const ttsUrl = `/api/tts?text=${encodeURIComponent(cleanText)}`;

    // Try playing via HTML5 Audio element with high-quality Vietnamese audio
    try {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      }

      let audio = this.audioCache.get(cleanText);
      if (!audio) {
        audio = new Audio(ttsUrl);
        audio.preload = 'auto';
        this.audioCache.set(cleanText, audio);
      }

      this.currentAudio = audio;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If server TTS proxy failed (e.g. offline), fallback to device Web Speech API
          this.speakWithWebSpeechFallback(cleanText);
        });
      }
      return;
    } catch {
      this.speakWithWebSpeechFallback(cleanText);
    }
  }

  /**
   * Web Speech API fallback with strict Vietnamese voice filtering
   */
  private speakWithWebSpeechFallback(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      const synth = window.speechSynthesis;
      if (synth.paused) {
        synth.resume();
      }

      // Re-query voices in case they loaded lazily
      if (!this.viVoice) {
        const voices = synth.getVoices();
        this.viVoice =
          voices.find(
            (v) =>
              v.lang.toLowerCase().startsWith('vi') ||
              v.lang.toLowerCase().includes('vn') ||
              v.name.toLowerCase().includes('vietnam')
          ) || null;
      }

      // If NO Vietnamese voice is installed on user's OS (e.g. Windows/Android without VN language pack),
      // DO NOT let the browser read Vietnamese with an English voice!
      if (!this.viVoice) {
        this.playSparkle();
        return;
      }

      synth.cancel();

      const utter = new SpeechSynthesisUtterance(text);
      utter.voice = this.viVoice;
      utter.lang = this.viVoice.lang || 'vi-VN';
      utter.rate = 0.92;
      utter.pitch = 1.2;

      // Fix Chrome garbage collection bug
      this.activeUtterances.add(utter);
      utter.onend = () => {
        this.activeUtterances.delete(utter);
      };
      utter.onerror = () => {
        this.activeUtterances.delete(utter);
      };

      synth.speak(utter);
    } catch {
      // Audio fallback
    }
  }
}

export const soundManager = new SoundEngine();
