import { playNote } from './synth';

import { notes, durations } from './scores/rudolph-the-red-nosed-reindeer';
// import { notes, durations } from './scores/santa-claus-is-coming-to-town';

function* score() {
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
  const event = new CustomEvent('playnote', { detail: { freq, duration } })
  window.dispatchEvent(event);
  setTimeout(playSequence, duration);
}

export const start = () => {
  setTimeout(playSequence, 1000);
}
