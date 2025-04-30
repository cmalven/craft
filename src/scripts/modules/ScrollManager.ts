import { Modu, ModuOptions } from '@malven/modu';
import { throttle } from 'throttle-debounce';
import onDocumentReady from '../utils/onDocumentReady';

/**
 * Consolidates scroll behavior across the site.
 */

export default class extends Modu {
  previousScroll = window.scrollY;
  scrollUp = 0;

  constructor(m: ModuOptions) {
    super(m);
  }

  init = () => {
    // Listen for scrolling
    window.addEventListener('scroll', throttle(200, this.onScroll));

    // Trigger an initial scroll event
    this.onScroll();

    // Wait for the entire document to load
    onDocumentReady(this.onScroll);
  };

  onScroll = () => {
    // Current scroll
    const scroll = window.scrollY;

    // Get the difference from the previous scroll
    const scrollDiff = scroll - this.previousScroll;

    // Update previous scroll
    this.previousScroll = scroll;

    // Update the scrolled up amount
    if (scrollDiff > 0) {
      this.scrollUp = 0;
    } else {
      this.scrollUp -= scrollDiff;
    }

    this.emit('scroll', {
      scroll: scroll,
      scrollUp: this.scrollUp,
    });
  };

  cleanup = () => {
    // Code to run when the module is destroyed
  };
}
