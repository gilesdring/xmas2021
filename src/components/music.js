import { ctx } from './audio-context';
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
let playing = false;
let tempo = 1;

export function setTempo(newTempo) {
  tempo = 120/newTempo;
}

const playSequence = () => {
  if (!playing) return;
  const [ freq, duration ] = tune.next().value;
  playNote(freq);
  const event = new CustomEvent('playnote', { detail: { freq, duration } })
  window.dispatchEvent(event);
  setTimeout(playSequence, duration * tempo);
}

export const start = () => {
  playing = true;
  ctx.resume();
  setTimeout(playSequence, 1000);
}

export const stop = () => {
  playing = false;
  ctx.suspend();
}
