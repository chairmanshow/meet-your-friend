export interface VoiceService {
  startCall: () => Promise<void>;
  endCall: () => Promise<void>;
  toggleMute: () => void;
  toggleSpeaker: () => void;
  isMuted: boolean;
  isSpeakerOn: boolean;
}

class VoiceServiceImplementation implements VoiceService {
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  public isMuted: boolean = false;
  public isSpeakerOn: boolean = true;

  async startCall(): Promise<void> {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      
      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      const destination = this.audioContext.createMediaStreamDestination();
      source.connect(destination);
      
      console.log('Call started successfully');
    } catch (error) {
      console.error('Failed to start call:', error);
      throw error;
    }
  }

  async endCall(): Promise<void> {
    this.mediaStream?.getTracks().forEach(track => track.stop());
    await this.audioContext?.close();
    this.mediaStream = null;
    this.audioContext = null;
    console.log('Call ended');
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.mediaStream) {
      this.mediaStream.getAudioTracks().forEach(track => {
        track.enabled = !this.isMuted;
      });
    }
  }

  toggleSpeaker(): void {
    this.isSpeakerOn = !this.isSpeakerOn;
    // In production, this would toggle speaker output
    console.log(`Speaker ${this.isSpeakerOn ? 'on' : 'off'}`);
  }
}

export const voiceService = new VoiceServiceImplementation();
