import { playNote } from './synth';

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
  const event = new CustomEvent('playnote', { detail: { freq, duration } })
  window.dispatchEvent(event);
  setTimeout(playSequence, duration);
}

export const start = () => {
  playSequence();
}

