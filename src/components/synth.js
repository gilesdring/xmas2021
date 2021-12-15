import { ctx } from './audio-context';

const dist = ctx.createWaveShaper();
const limiter = ctx.createDynamicsCompressor();

limiter.connect(ctx.destination);
dist.connect(limiter);

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
  const startTime = ctx.currentTime;
  const endTime = startTime + 0.5;

  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, startTime);
  env.gain.exponentialRampToValueAtTime(0.1, startTime + 0.1);
  env.gain.exponentialRampToValueAtTime(0.0001, endTime);
  env.connect(dist);

  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, startTime);
  osc.connect(env);

  osc.start(startTime);
  osc.stop(endTime);
}
