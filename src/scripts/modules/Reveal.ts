import { Modu, ModuOptions } from '@malven/modu';
import { inView } from 'motion';

/**
 * Handles reveal animations on scroll.
 */

export default class extends Modu {
  visibleClass = 'is-visible';
  offset = -80;
  stopInView?: VoidFunction;

  constructor(m: ModuOptions) {
    super(m);

    this.offset = (this.getData('offset') ?? this.offset) as number;
  }

  init = () => {
    // Enable reveal transitions
    const root = document.getElementsByTagName('html')[0];
    root.className = root.className.replace('preload-transitions', '');
    let triggerEl = this.el;

    // Change the trigger element based on settings
    const trigger = this.getData('trigger');
    if (trigger === 'parent') {
      triggerEl = this.el.parentNode as Element;
    } else if (typeof trigger === 'string') {
      const closestTrigger = this.el.closest(trigger);
      if (closestTrigger) triggerEl = closestTrigger;
    }

    this.stopInView = inView(
      triggerEl,
      (_info) => {
        this.el.classList.add(this.visibleClass);
      },
      {
        margin: `0px 0px ${this.offset}px 0px`,
      },
    );
  };

  cleanup = () => {
    if (this.stopInView) this.stopInView();
  };
}
