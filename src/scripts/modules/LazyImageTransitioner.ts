import { Modu, ModuOptions } from '@malven/modu';

/**
 * Nicely transitions images via lazy sizes hooks. Applies a class to the parent of a lazy loaded image when that image has been successfully loaded.
 */

export default class extends Modu {
  selectors = [
    '.image',
    '.image-video',
  ];

  readyClass = 'is-ready';

  constructor(m: ModuOptions) {
    super(m);
  }

  init = () => {
    this.addEventListeners();
  };

  addEventListeners = () => {
    // Handle a lazysizes loaded image
    document.addEventListener('lazybeforeunveil', (evt) => {
      this.makeParentVisible(evt.target as Element);
    });

    // Handle video playback
    document.querySelectorAll('.video').forEach(videoEl => {
      // Reveal the parent a bit after the video starts playing in case the browser is slow to actually start playing
      videoEl.addEventListener('loadedmetadata', evt => {
        window.setTimeout(() => {
          this.makeParentVisible(evt.target as Element);
        }, 300);
      });
    });

    // Handle vimeo video
    this.on('ImageVideo', 'vimeoPlay', (el) => {
      this.makeParentVisible(el);
    });
  };

  makeParentVisible = (el: Element) => {
    this.selectors.forEach((selector) => {
      const parentEl = el.closest(selector);
      if (parentEl) {
        parentEl.classList.add(this.readyClass);
      }
    });
  };

  cleanup = () => {
    // Code to run when the module is destroyed
  };
}
