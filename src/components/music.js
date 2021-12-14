import { playNote } from './synth';

import { frequencies } from './midi-notes';
import { notes, durations } from './scores/rudolph-the-red-nosed-reindeer';
// import { notes, durations } from './scores/santa-claus-is-coming-to-town';


function* score() {
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

