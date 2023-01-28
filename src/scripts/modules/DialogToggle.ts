import { Modu, ModuOptions } from '@malven/modu';

/**
 * Toggles dialog open and closed.
 */

type Action = 'open' | 'close';

export default class extends Modu {
  isOpen = false;
  isOpenClass = 'is-open';
  action: Action;

  constructor(m: ModuOptions) {
    super(m);

    this.action = this.getData('action') as Action;
  }

  init = () => {
    this.addEventListeners();
  };

  addEventListeners = () => {
    this.el.addEventListener('click', this.onClick);
  };

  onClick = (evt: Event) => {
    evt.preventDefault();
    this[this.action]();
  };

  open = () => {
    this.emit('open', null);
  };

  close = () => {
    this.emit('close', null);
  };

  set = (state: boolean) => {
    this.isOpen = state;
    window.requestAnimationFrame(() => {
      this.el.classList.toggle(this.isOpenClass, this.isOpen);
    });
  };

  cleanup = () => {
    this.el.removeEventListener('click', this.onClick);
  };
}
