import { Modu, ModuOptions } from '@malven/modu';

/**
 * Individual content panel to be used with TabList.
 */

export default class extends Modu {
  hidingClass = 'is-hiding';
  hiddenClass = 'is-hidden';
  hideDelay = 500;

  constructor(m: ModuOptions) {
    super(m);
  }

  init = () => {
    this.on('TabList', 'selected', this.onSelect, this.key);
  };

  onSelect = (id: unknown) => {
    const thisId = this.el.getAttribute('id');
    if (id === thisId) {
      // Active
      this.el.classList.remove(this.hiddenClass);
      window.requestAnimationFrame(() => {
        this.el.classList.remove(this.hidingClass);
      });
    } else {
      // Inactive
      this.el.classList.add(this.hidingClass);
      this.el.classList.add(this.hiddenClass);
    }
  };

  cleanup = () => {
    // Code to run when the module is destroyed
  };
}
