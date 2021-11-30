import { playNote } from './synth';

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
}

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
  const event = new CustomEvent('playnote', { detail: { freq, duration } })
  window.dispatchEvent(event);
  setTimeout(playSequence, duration);
}

export const start = () => {
  setTimeout(playSequence, 1000);
}

