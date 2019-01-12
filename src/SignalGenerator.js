class SignalGenerator {
  constructor(){
    this.source = null;
  }
  playFrequency(frequency,duration) {
    let audioContext = new AudioContext();
    // create 2 second worth of audio buffer, with single channels and sampling rate of your device.
    let sampleRate = audioContext.sampleRate;
    duration = sampleRate*(duration/1000);
    let numChannels = 1;
    let buffer  = audioContext.createBuffer(numChannels, duration, sampleRate);
    // fill the channel with the desired frequency's data
    let channelData = buffer.getChannelData(0);
    for (let i = 0; i < duration; i++) {
      channelData[i]=Math.sin(2*Math.PI*frequency*i/(sampleRate));
    }

    // create audio source node.
    this.source = audioContext.createBufferSource();
    this.source.buffer = buffer;
    this.source.connect(audioContext.destination);

    // finally start to play
    this.source.start(0);
  }
  stop(){
    this.source.stop();
  }
}
export default new SignalGenerator()
