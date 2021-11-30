(function () {
  'use strict';

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

  const playNote = (freq) => {
    const osc = ctx.createOscillator();
    const startTime = ctx.currentTime;
    const endTime = startTime + 0.1;
    env.gain.setValueAtTime(1, startTime);
    osc.frequency.setValueAtTime(freq, startTime);
    env.gain.linearRampToValueAtTime(0, endTime);
    // osc.frequency.linearRampToValueAtTime(freq * 0.7, endTime);
    osc.connect(dist);
    osc.start(startTime);
    osc.stop(endTime);
  };

  const frequencies = {
    e3: 164.81,
    g3: 196.00,
    f3: 174.61,
    a3: 220.00,
    'b-3': 233.08,
    c4: 261.63,
    d4: 293.66,
    e4: 329.63,
    f4: 349.23,
    g4: 392.00,
  };

  function* score() {
    const notes = [
      'c4',
      'a3', 'b-3', 'c4', 'c4', 'c4',
      'd4', 'e4', 'f4', 'f4', 'f4',
      'a3', 'b-3', 'c4', 'c4', 'c4',
      'd4', 'c4', 'b-3', 'b-3',
      'a3', 'c4', 'f3', 'a3',
      'g3', 'b-3', 'e3',
      'f3'
    ];
    const durations = [
      250,
      250, 250, 500, 750, 250,
      250, 250, 500, 750, 250,
      250, 250, 500, 750, 250,
      250, 250, 500, 1000,
      500, 500, 500, 500,
      500, 1000, 500,
      3750,
    ];
    let i = 0;
    while (true) {
      yield [frequencies[notes[i % notes.length]], durations[i % durations.length]];
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
    setTimeout(playSequence, 1000);
  };

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
      rect(
        this.x * windowWidth,
        this.y * windowHeight,
        this.width * windowWidth,
        this.height * windowHeight
      );
      pop();
    }
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    clear();
    elves.push(
      new Elf({ x: 0.15, y: 0.15, width: 0.2, height: 0.2, color: 0 }),
      new Elf({ x: 0.65, y: 0.15, width: 0.2, height: 0.2, color: 0 }),
      new Elf({ x: 0.15, y: 0.65, width: 0.2, height: 0.2, color: 0 }),
      new Elf({ x: 0.65, y: 0.65, width: 0.2, height: 0.2, color: 0 })
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
    clear();
  }

  function draw() {
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
