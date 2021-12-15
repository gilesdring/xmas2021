import { start as startSound, stop as stopSound } from './components/music';
import { preload, setup, draw, windowResized } from './components/sketch';

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;

const soundToggle = document.querySelector('#sound-toggle');
let soundPlaying = false;

const toggleSound = () => {
  if (soundPlaying) {
    stopSound();
    return false;
  }
  startSound();
  return true;
}

const setButtonState = () => {
  soundToggle.innerHTML = soundPlaying ? 'Stop sound' : 'Start sound';
}

soundToggle.addEventListener('click', () => {
  soundPlaying = toggleSound();
  setButtonState();
});

setButtonState();
