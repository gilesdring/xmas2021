import { start } from './components/music';
import { setup, draw, windowResized } from './components/sketch';

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;

start();
