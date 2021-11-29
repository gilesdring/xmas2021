(function () {
  'use strict';

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();
  // const osc = ctx.createOscillator({ type: 'sine' });

  const dist = ctx.createWaveShaper();
  const env = ctx.createGain();
  const limiter = ctx.createDynamicsCompressor();
  env.gain.value = 0;

  limiter.connect(ctx.destination);
  env.connect(limiter);
  dist.connect(env);
  // osc.connect(dist);

  // osc.start();

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

  const playNote = (freq) => {
    const osc = ctx.createOscillator();
    const startTime = ctx.currentTime;
    const endTime = startTime + 0.1;
    env.gain.setValueAtTime(1, startTime);
    osc.frequency.setValueAtTime(freq, startTime);
    env.gain.linearRampToValueAtTime(0, endTime);
    osc.frequency.linearRampToValueAtTime(freq * 0.4, endTime);
    osc.connect(dist);
    osc.start(startTime);
    osc.stop(endTime);
  };

  function* score() {
    const notes = [220, 330, 360, 380, 440, 660];
    const durations = [500, 800, 1000];
    let i = 0;
    while (true) {
      yield [notes[i % notes.length], durations[i % durations.length]];
      i++;
    }
  }

  const tune = score();

  const playSequence = () => {
    const [ freq, duration ] = tune.next().value;
    playNote(freq);
    const event = new CustomEvent('playnote', { detail: { freq, duration } });
    window.dispatchEvent(event);
    setTimeout(playSequence, duration);
  };

  const start = () => {
    playSequence();
  };

  let bgCol;
  const elves = [];

  function* activeElf(count) {
    let i = 0;
    while (true) {
      yield i % count;
      i++;
    }
  }

  class Elf {
    constructor({ x, y, width, height, color }) {
      this.color = color;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
    draw() {
      push();
      noStroke();
      fill(this.color);
      rect(this.x, this.y, this.width, this.height);
      pop();
    }
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    bgCol = 0;
    elves.push(
      new Elf({ x: 0, y: 0, width: width / 2, height: height / 2, color: 0 }),
      new Elf({ x: width/2, y: 0, width: width / 2, height: height / 2, color: 0 }),
      new Elf({ x: 0, y: height/2, width: width / 2, height: height / 2, color: 0 }),
      new Elf({ x: width/2, y: height/2, width: width / 2, height: height / 2, color: 0 }),
    );
    const currentElf = activeElf(elves.length);
    const handleNote = (e) => {
      elves[currentElf.next().value].color = color(
        random(255),
        random(255),
        random(255)
      );
    };
    window.addEventListener('playnote', handleNote);
  }

  function draw() {
    background(bgCol);
    elves.forEach((e) => e.draw());
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  window.setup = setup;
  window.draw = draw;
  window.windowResized = windowResized;

  start();

})();
