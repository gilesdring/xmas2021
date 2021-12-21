import { start as startSound, stop as stopSound, setTempo } from './components/music';
import { preload, setup, draw, windowResized } from './components/sketch';

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
    stopSound();
    return false;
  }
  startSound();
  return true;
}

const toggleSpeed = () => {
  if (doubleTime) {
    setTempo(120);
    return false;
  }
  setTempo(240);
  return true;
}

const setButtonState = () => {
  soundToggle.innerHTML = soundPlaying ? 'Stop work' : 'Start work';
  speedToggle.innerHTML = doubleTime ? 'Slow down' : 'Work harder';
}

soundToggle.addEventListener('click', () => {
  soundPlaying = toggleSound();
  setButtonState();
});

speedToggle.addEventListener('click', () => {
  doubleTime = toggleSpeed();
  setButtonState();
})

setButtonState();
