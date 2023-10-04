import htmx from 'htmx.org';

declare global {
  interface Window {
    htmx: typeof htmx;
  }
}

window.htmx = htmx;

// ---------------------------------------------------------------
// Modu
// ---------------------------------------------------------------

import * as initialModules from './modules/initial';
import { App } from '@malven/modu';

const app = new App({
  initialModules,
  importMethod: module => import(`./modules/${module}.ts`),
});
app.init();


// ---------------------------------------------------------------
// Smooth Scroll
// ---------------------------------------------------------------

import SmoothScroll from 'smooth-scroll';

new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
  easing: 'easeInOutCubic',
  updateURL: true,
});


//--------------------------------------------------------------------
// HTMX
//--------------------------------------------------------------------

// Destroy Modu modules before we swap in new content
htmx.on('htmx:beforeSwap', function(evt) {
  if (evt.target) app.destroyModules(evt.target as Element);
});

// Initialize Modu modules after we swap in new content
htmx.on('htmx:afterSwap', function(evt) {
  if (evt.target) app.init(evt.target as Element);
});
