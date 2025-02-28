import { Modu, ModuOptions } from '@malven/modu';
import SmoothScroll from 'smooth-scroll';

/**
 * Enables smooth scrolling for links.
 */

export default class extends Modu {
  constructor(m: ModuOptions) {
    super(m);
  }

  init = () => {
    new SmoothScroll('a[href*="#"]', {
      speed: 1000,
      speedAsDuration: true,
      easing: 'easeInOutCubic',
      updateURL: true,
    });
  };

  cleanup = () => {
    // Code to run when the module is destroyed
  };
}
