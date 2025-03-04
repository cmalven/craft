import { Modu, ModuOptions } from '@malven/modu';
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
import type SLDrawer from '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
import { setDefaultAnimation } from '@shoelace-style/shoelace/dist/utilities/animation-registry.js';

/**
 * Overlay for working with type in development.
 */

setDefaultAnimation('drawer.showBottom', {
  keyframes: [
    { transform: 'translateY(101%)', opacity: '1' },
    { transform: 'translateY(0)', opacity: '1' },
  ],
  options: {
    duration: 400,
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
  },
});

setDefaultAnimation('drawer.hideBottom', {
  keyframes: [
    { transform: 'translateY(0)', opacity: '1' },
    { transform: 'translateY(101%)', opacity: '1' },
  ],
  options: {
    duration: 250,
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
  },
});

export default class extends Modu {
  constructor(m: ModuOptions) {
    super(m);
  }

  init = () => {
    // Ctrl+t to toggle grid visibility
    document.addEventListener('keypress', (evt) => {
      if (evt.ctrlKey && evt.key === 't') {
        (this.el as SLDrawer).show();
      }
    });
  };
}
