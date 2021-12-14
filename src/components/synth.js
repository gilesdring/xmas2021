const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

const dist = ctx.createWaveShaper();
const env = ctx.createGain();
const limiter = ctx.createDynamicsCompressor();
env.gain.value = 0;

limiter.connect(ctx.destination);
env.connect(limiter);
dist.connect(env);

const makeDistortionCurve = (amount) => {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};

dist.curve = makeDistortionCurve(10);
dist.oversample = '4x';

export const playNote = (freq) => {
  const osc = ctx.createOscillator();
  const startTime = ctx.currentTime;
  const endTime = startTime + 0.2;
  env.gain.setValueAtTime(1, startTime);
  osc.frequency.setValueAtTime(freq, startTime);
  env.gain.linearRampToValueAtTime(0, endTime);
  // osc.frequency.linearRampToValueAtTime(freq * 0.7, endTime);
  osc.connect(dist);
  osc.start(startTime);
  osc.stop(endTime);
}
