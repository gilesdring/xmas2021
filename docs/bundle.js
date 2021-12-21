(function () {
  'use strict';

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();

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

  const playNote = (freq) => {
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
  };

  // https:www.inspiredacoustics.comenMIDI_note_numbers_and_center_frequencies

  const freqTable = `
108:88:C8:4186.01
107:87:B7:3951.07
106:86:A#7:3729.31
105:85:A7:3520.00
104:84:G#7:3322.44
103:83:G7:3135.96
102:82:F#7:2959.96
101:81:F7:2793.83
100:80:E7:2637.02
99:79:D#7:2489.02
98:78:D7:2349.32
97:77:C#7:2217.46
96:76:C7:2093.00
95:75:B6:1975.53
94:74:A#6:1864.66
93:73:A6:1760.00
92:72:G#6:1661.22
91:71:G6:1567.98
90:70:F#6:1479.98
89:69:F6:1396.91
88:68:E6:1318.51
87:67:D#6:1244.51
86:66:D6:1174.66
85:65:C#6:1108.73
84:64:C6:1046.50
83:63:B5:987.77
82:62:A#5:932.33
81:61:A5:880.00
80:60:G#5:830.61
79:59:G5:783.99
78:58:F#5:739.99
77:57:F5:698.46
76:56:E5:659.26
75:55:D#5:622.25
74:54:D5:587.33
73:53:C#5:554.37
72:52:C5:523.25
71:51:B4:493.88
70:50:A#4:466.16
69:49:A4:440.00
68:48:G#4:415.30
67:47:G4:392.00
66:46:F#4:369.99
65:45:F4:349.23
64:44:E4:329.63
63:43:D#4:311.13
62:42:D4:293.66
61:41:C#4:277.18
60:40:C4:261.63
59:39:B3:246.94
58:38:A#3:233.08
57:37:A3:220.00
56:36:G#3:207.65
55:35:G3:196.00
54:34:F#3:185.00
53:33:F3:174.61
52:32:E3:164.81
51:31:D#3:155.56
50:30:D3:146.83
49:29:C#3:138.59
48:28:C3:130.81
47:27:B2:123.47
46:26:A#2:116.54
45:25:A2:110.00
44:24:G#2:103.83
43:23:G2:98.00
42:22:F#2:92.50
41:21:F2:87.31
40:20:E2:82.41
39:19:D#2:77.78
38:18:D2:73.42
37:17:C#2:69.30
36:16:C2:65.41
35:15:B1:61.74
34:14:A#1:58.27
33:13:A1:55.00
32:12:G#1:51.91
31:11:G1:49.00
30:10:F#1:46.25
29:9:F1:43.65
28:8:E1:41.20
27:7:D#1:38.89
26:6:D1:36.71
25:5:C#1:34.65
24:4:C1:32.70
23:3:B0:30.87
22:2:A#0:29.14
21:1:A0:27.50
`.split('\n').filter(x => x).map(x => x.split(":"));

  const noteTable = freqTable.reduce((a, [midi, key, note, freq]) => ({ ...a, [note]: freq }), {});
  freqTable.reduce((a, [midi, key, note, freq]) => ({ ...a, [key]: freq }), {});
  freqTable.reduce((a, [midi, key, note, freq]) => ({ ...a, [midi]: freq }), {});

  const noteToFreq = (note) => noteTable[note];

  const notes = [
    'C4', 'D4', 'C4', 'A3', 'F4', 'D4', 'C4',
    'C4', 'D4', 'C4', 'D4', 'C4', 'F4', 'E4',
    'A#3', 'C4', 'A#3', 'G3', 'E4', 'D4', 'C4',
    'C4', 'D4', 'C4', 'D4', 'C4', 'G4', 'F4',

    'C4', 'D4', 'C4', 'A3', 'F4', 'D4', 'C4',
    'C4', 'D4', 'C4', 'D4', 'C4', 'F4', 'E4',
    'A#3', 'C4', 'A#3', 'G3', 'E4', 'D4', 'C4',
    'C4', 'D4', 'C4', 'D4', 'C4', 'G4', 'F4',

    'D4', 'D4', 'F4', 'D4', 'C4', 'A3', 'C4', 
    'A#3', 'D4', 'C4', 'A#3', 'A3',
    'G3', 'G3', 'C4', 'C4', 'E4', 'E4', 'E4', 
    'F4', 'F4', 'E4', 'D4', 'C4', 'A#3', 'G3', 

    'C4', 'D4', 'C4', 'A3', 'F4', 'D4', 'C4',
    'C4', 'D4', 'C4', 'D4', 'C4', 'F4', 'E4',
    'A#3', 'C4', 'A#3', 'G3', 'E4', 'D4', 'C4',
    'C4', 'D4', 'C4', 'D4', 'C4', 'G4', 'F4',
  ].map(noteToFreq);

  const durations = [
    250, 500, 200, 500, 500, 500, 1500,
    300, 200, 300, 200, 500, 500, 2000,
    250, 500, 200, 500, 500, 500, 1500,
    300, 200, 300, 200, 500, 500, 2000,

    250, 500, 200, 500, 500, 500, 1500,
    300, 200, 300, 200, 500, 500, 2000,
    250, 500, 200, 500, 500, 500, 1500,
    300, 200, 300, 200, 500, 500, 2000,

    500, 500, 300, 700, 500, 300, 1200,
    500, 500, 500, 500, 2000,
    500, 500, 500, 500, 500, 500, 1000,
    500, 500, 500, 500, 500, 300, 1200,

    250, 500, 200, 500, 500, 500, 1500,
    300, 200, 300, 200, 500, 500, 2000,
    250, 500, 200, 500, 500, 500, 1500,
    300, 200, 300, 200, 500, 500, 2000,
  ];

  // import { notes, durations } from './scores/santa-claus-is-coming-to-town';

  function* score() {
    let i = 0;
    while (true) {
      yield [notes[i % notes.length], durations[i % durations.length]];
      i++;
    }
  }

  const tune = score();
  let playing = false;
  let tempo = 1;

  function setTempo(newTempo) {
    tempo = 120/newTempo;
  }

  const playSequence = () => {
    if (!playing) return;
    const [ freq, duration ] = tune.next().value;
    playNote(freq);
    const event = new CustomEvent('playnote', { detail: { freq, duration } });
    window.dispatchEvent(event);
    setTimeout(playSequence, duration * tempo);
  };

  const start = () => {
    playing = true;
    ctx.resume();
    setTimeout(playSequence, 1000);
  };

  const stop = () => {
    playing = false;
    ctx.suspend();
  };

  const elves = [];

  function* activeElf(count) {
    while (true) {
      yield Math.floor(Math.random() * count);
    }
  }
  function* angleAnimation() {
    let angle = 0;
    let frame = 0;
    while (frame < 9) {
      yield angle;
      if (frame < 6) angle-=15;
      else angle+=30;
      frame++;
    }
  }

  class Elf {
    constructor({ x, y, height: imgHeight, color }) {
      this.color = color;
      this.x = x;
      this.y = y;
      this.height = imgHeight;
      this.baseHeight = 380;
      this.aspect = 0.6;
    }
    get scale() {
      return (this.height * height) / this.baseHeight;
    }
    get width() {
      return this.height * this.aspect;
    }
    get pos() {
      return {
        x: (this.x - this.width / 2) * width,
        y: (this.y - this.height / 2) * height,
      };
    }
    animate() {
      this.animation = angleAnimation();
    }
    get armAngle() {
      if (!this.animation) return 0;
      return this.animation.next().value;
    }
    draw() {
      push();
      translate(this.pos.x, this.pos.y);
      scale(this.scale);
      image(sprite.body, 35, 100);
      image(sprite.hat, 0, 0);
      pop();
    }
    drawArms() {
      push();
      translate(this.pos.x, this.pos.y);
      this.drawLeftArm();
      this.drawRightArm();
      pop();
    }
    drawLeftArm() {
      push();
      scale(this.scale);
      translate(135, 195);
      image(sprite.leftArm, 0, 0);
      pop();
    }

    drawRightArm() {
      push();
      scale(this.scale);
      angleMode(DEGREES);
      translate(60, 237);
      rotate(this.armAngle);
      image(sprite.rightArm, -15, -20);
      pop();
    }
  }

  function canvasSize() {
    return min(windowWidth, windowHeight);
  }

  const sprite = {};

  function preload() {
    sprite.hat = loadImage('assets/hat.svg');
    sprite.body = loadImage('assets/body.svg');
    sprite.leftArm = loadImage('assets/left-hand.svg');
    sprite.rightArm = loadImage('assets/right-hand.svg');
    sprite.table = loadImage('assets/table.svg');
  }

  function setup() {
    const dim = canvasSize();
    createCanvas(dim, dim);
    clear();
    elves.push(
      new Elf({ x: 0.29, y: 0.5, height: 0.3 }),
      new Elf({ x: 0.43, y: 0.5, height: 0.3 }),
      new Elf({ x: 0.57, y: 0.5, height: 0.3 }),
      new Elf({ x: 0.71, y: 0.5, height: 0.3 })
    );
    const currentElf = activeElf(elves.length);
    const handleNote = (e) => elves[currentElf.next().value].animate();
    window.addEventListener('playnote', handleNote);
    clear();
  }
  function drawTable() {
    push();
    imageMode(CENTER);
    translate(width/2, height * 0.61);
    scale(0.8 * width / sprite.table.width);
    image(sprite.table, 0, 0);
    pop();
  }
  function draw() {
    clear();
    elves.forEach((e) => e.draw());
    drawTable();
    elves.forEach((e) => e.drawArms());
  }

  function windowResized() {
    const dim = canvasSize();
    resizeCanvas(dim, dim);
  }

  window.preload = preload;
  window.setup = setup;
  window.draw = draw;
  window.windowResized = windowResized;

  const soundToggle = document.querySelector('#sound-toggle');
  const speedToggle = document.querySelector('#speed-toggle');
  let soundPlaying = false;
  let doubleTime = false;

  const toggleSound = () => {
    if (soundPlaying) {
      stop();
      return false;
    }
    start();
    return true;
  };

  const toggleSpeed = () => {
    if (doubleTime) {
      setTempo(120);
      return false;
    }
    setTempo(240);
    return true;
  };

  const setButtonState = () => {
    soundToggle.innerHTML = soundPlaying ? 'Stop work' : 'Start work';
    speedToggle.innerHTML = doubleTime ? 'Slow down' : 'Work harder';
  };

  soundToggle.addEventListener('click', () => {
    soundPlaying = toggleSound();
    setButtonState();
  });

  speedToggle.addEventListener('click', () => {
    doubleTime = toggleSpeed();
    setButtonState();
  });

  setButtonState();

})();
