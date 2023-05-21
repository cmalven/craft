import 'lazysizes';
import 'lazysizes/plugins/bgset/ls.bgset.js';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/respimg/ls.respimg';


//--------------------------------------------------------------------
// Enable reveal transitions
//--------------------------------------------------------------------

const root = document.getElementsByTagName('html')[0];
root.className = root.className.replace('preload-transitions', '');


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
  updateURL: false,
});


// ---------------------------------------------------------------
// Fit Videos
// ---------------------------------------------------------------

import objectFitVideos from 'object-fit-videos';

objectFitVideos();
