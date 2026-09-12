/**
 * Spatial Multi-Channel Ambient Acoustic Chaos Mixer
 * IELTS CD-IELTS Sensory Stress Inoculation & Audio Telemetry (Band 7.5 - 8.5+)
 */

export type ChaosChannelType = 'exam_audio' | 'keyboard_clatter' | 'human_ambient' | 'hvac_hum';

export interface ChannelState {
  id: ChaosChannelType;
  labelVi: string;
  volume: number; // 0.0 to 1.0
  isMuted: boolean;
  isSolo: boolean;
  currentLevel: number; // 0 to 100 for VU meter
}

export interface AcousticChaosConfig {
  targetSNRDb: number; // 3dB (extreme disaster) to 18dB (mild background)
  autoInoculationMode: boolean; // Auto-decrease SNR over time
  spikeFrequencySec: number; // Interval for random surprise acoustic spikes
}

export class SpatialAudioChaosMixer {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private channelGains: Map<ChaosChannelType, GainNode> = new Map();
  private channelSources: Map<ChaosChannelType, AudioNode[]> = new Map();
  private hvacFilter: BiquadFilterNode | null = null;
  private isPlaying: boolean = false;
  private spikeTimer: NodeJS.Timeout | null = null;
  private onSpikeCallback?: (spikeType: string) => void;

  constructor() {
    // Lazy AudioContext initialization on first user interaction
  }

  public async initAudio(): Promise<boolean> {
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioContext = new AudioCtx();
      }

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.setValueAtTime(0.9, this.audioContext.currentTime);
      this.masterGain.connect(this.audioContext.destination);

      // Create 4 independent channel gain nodes
      const channels: ChaosChannelType[] = ['exam_audio', 'keyboard_clatter', 'human_ambient', 'hvac_hum'];
      channels.forEach((ch) => {
        if (!this.audioContext || !this.masterGain) return;
        const gain = this.audioContext.createGain();
        gain.gain.setValueAtTime(ch === 'exam_audio' ? 0.85 : 0.25, this.audioContext.currentTime);
        gain.connect(this.masterGain);
        this.channelGains.set(ch, gain);
      });

      // Special Low-Pass Filter for HVAC Room Hum (400Hz cutoff)
      this.hvacFilter = this.audioContext.createBiquadFilter();
      this.hvacFilter.type = 'lowpass';
      this.hvacFilter.frequency.setValueAtTime(320, this.audioContext.currentTime);
      this.hvacFilter.Q.setValueAtTime(2.0, this.audioContext.currentTime);
      const hvacGain = this.channelGains.get('hvac_hum');
      if (hvacGain) {
        this.hvacFilter.connect(hvacGain);
      }

      return true;
    } catch (e) {
      console.warn('Web Audio API initialization prevented or not allowed:', e);
      return false;
    }
  }

  /**
   * Generates continuous synthetic ambient audio streams
   */
  public startAmbientChaos(snrDb: number = 12): void {
    if (!this.audioContext) return;
    this.stopAmbientChaos();
    this.isPlaying = true;

    // 1. HVAC Hum Generator: Pink noise + 60Hz hum
    this.createSyntheticHVAC();

    // 2. Continuous Keyboard Typing simulation
    this.createSyntheticKeyboardLoop();

    // 3. Ambient Room Shuffling & Breathing
    this.createSyntheticHumanAmbientLoop();

    this.setSNR(snrDb);
  }

  public stopAmbientChaos(): void {
    this.isPlaying = false;
    if (this.spikeTimer) clearInterval(this.spikeTimer);

    // Stop and disconnect all active sources
    this.channelSources.forEach((sources) => {
      sources.forEach((src) => {
        try {
          if ('stop' in src && typeof (src as AudioScheduledSourceNode).stop === 'function') {
            (src as AudioScheduledSourceNode).stop();
          }
          src.disconnect();
        } catch {
          // ignore already stopped
        }
      });
    });
    this.channelSources.clear();
  }

  /**
   * Dynamically adjusts noise channels gain based on Signal-to-Noise Ratio (SNR) in dB
   */
  public setSNR(snrDb: number): void {
    if (!this.audioContext) return;
    const clampedSNR = Math.max(3, Math.min(20, snrDb));
    
    // As SNR decreases from 18dB -> 3dB, noise level ratio increases
    // SNR = 20 * log10(Signal / Noise) => Noise = Signal / 10^(SNR / 20)
    const examGain = 0.9;
    const noiseMultiplier = Math.min(0.85, examGain / Math.pow(10, clampedSNR / 20));

    const now = this.audioContext.currentTime;

    const keyGain = this.channelGains.get('keyboard_clatter');
    if (keyGain) keyGain.gain.setTargetAtTime(noiseMultiplier * 0.9, now, 0.1);

    const humGain = this.channelGains.get('human_ambient');
    if (humGain) humGain.gain.setTargetAtTime(noiseMultiplier * 0.6, now, 0.1);

    const hvacG = this.channelGains.get('hvac_hum');
    if (hvacG) hvacG.gain.setTargetAtTime(noiseMultiplier * 0.7, now, 0.1);
  }

  public setChannelVolume(channel: ChaosChannelType, volume: number): void {
    if (!this.audioContext) return;
    const gainNode = this.channelGains.get(channel);
    if (gainNode) {
      gainNode.gain.setTargetAtTime(Math.max(0, Math.min(1, volume)), this.audioContext.currentTime, 0.05);
    }
  }

  /**
   * Triggers a sudden acoustic spike (e.g. loud cough, dropped pen, chair screech)
   */
  public triggerAcousticSpike(spikeType: 'loud_cough' | 'dropped_pen' | 'chair_screech' = 'loud_cough'): void {
    if (!this.audioContext || !this.isPlaying) return;

    const humGain = this.channelGains.get('human_ambient');
    if (!humGain) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    if (spikeType === 'dropped_pen') {
      const osc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.12);

      clickGain.gain.setValueAtTime(0.8, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(clickGain);
      clickGain.connect(humGain);

      osc.start(now);
      osc.stop(now + 0.16);
    } else {
      // Cough noise burst
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.1));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(spikeType === 'chair_screech' ? 2400 : 700, now);
      filter.Q.setValueAtTime(4.0, now);

      const burstGain = ctx.createGain();
      burstGain.gain.setValueAtTime(0.9, now);
      burstGain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      noise.connect(filter);
      filter.connect(burstGain);
      burstGain.connect(humGain);

      noise.start(now);
      noise.stop(now + 0.36);
    }

    if (this.onSpikeCallback) {
      this.onSpikeCallback(spikeType);
    }
  }

  public setOnSpikeListener(cb: (spikeType: string) => void): void {
    this.onSpikeCallback = cb;
  }

  // --- Synthetic Sound Generators ---

  private createSyntheticHVAC(): void {
    if (!this.audioContext || !this.hvacFilter) return;
    const ctx = this.audioContext;

    // Pink noise buffer
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const whiteSource = ctx.createBufferSource();
    whiteSource.buffer = buffer;
    whiteSource.loop = true;
    whiteSource.connect(this.hvacFilter);
    whiteSource.start();

    // 60Hz Sub-rumble oscillator
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(62, ctx.currentTime);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.18, ctx.currentTime);
    subOsc.connect(subGain);
    subGain.connect(this.hvacFilter);
    subOsc.start();

    this.channelSources.set('hvac_hum', [whiteSource, subOsc]);
  }

  private createSyntheticKeyboardLoop(): void {
    if (!this.audioContext) return;
    const keyGain = this.channelGains.get('keyboard_clatter');
    if (!keyGain) return;

    // Schedule repetitive typing clicks
    const ctx = this.audioContext;
    const interval = setInterval(() => {
      if (!this.isPlaying) {
        clearInterval(interval);
        return;
      }
      // Rapid random keystrokes
      const now = ctx.currentTime;
      const click = ctx.createOscillator();
      const clickG = ctx.createGain();
      click.type = 'square';
      click.frequency.setValueAtTime(Math.random() * 800 + 1200, now);
      clickG.gain.setValueAtTime(0.12, now);
      clickG.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      click.connect(clickG);
      clickG.connect(keyGain);
      click.start(now);
      click.stop(now + 0.04);
    }, 140);
  }

  private createSyntheticHumanAmbientLoop(): void {
    if (!this.audioContext) return;
    // Periodic subtle random background events
    this.spikeTimer = setInterval(() => {
      if (!this.isPlaying) return;
      if (Math.random() < 0.35) {
        const events: Array<'loud_cough' | 'dropped_pen' | 'chair_screech'> = [
          'loud_cough',
          'dropped_pen',
          'chair_screech'
        ];
        const chosen = events[Math.floor(Math.random() * events.length)];
        this.triggerAcousticSpike(chosen);
      }
    }, 6000);
  }
}
