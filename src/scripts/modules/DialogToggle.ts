import { Modu } from '@malven/modu';

/**
 * Toggles dialog open and closed.
 */

export default class extends Modu {
  isOpen = false;
  isOpenClass = 'is-open';

  init = () => {
    // Nothing needed
  };

  set = (state: boolean) => {
    this.isOpen = state;
    window.requestAnimationFrame(() => {
      this.el.classList.toggle(this.isOpenClass, this.isOpen);
    });
  };

  cleanup = () => {
    // Code to run when the module is destroyed
  };
}
