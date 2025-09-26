import { Modu, ModuOptions } from '@malven/modu';

/**
 * Toggles expandable content.
 */

export default class extends Modu {
  activeClass = 'is-active';
  isOpen = false;
  buttonEl: HTMLButtonElement;
  defaultOpen: boolean;

  constructor(m: ModuOptions) {
    super(m);

    this.buttonEl = this.el as HTMLButtonElement;
    this.defaultOpen = (this.getData('default-open') ?? false) === true;

    // Should other expandables be closed when this one is opened?
    this.closeOthers = (this.getData('close-others') ?? false) === true;
  }

  init = () => {
    // Add the active class to the element
    this.el.classList.add(this.activeClass);

    // Don't prevent buttons from being clicked
    this.el.removeAttribute('aria-disabled');

    // Add event listener
    this.buttonEl.addEventListener('click', this.onClick);

    // Ensure all ExpandableContent modules are ready before setting initial state
    this.app.modulesReady?.then(() => {
      this.toggle(this.defaultOpen);
    });
  };

  onClick = (_evt: MouseEvent) => {
    this.emit('click', this.key);
    this.toggle();
  };

  toggle = (state?: boolean) => {
    // Update the internal state
    this.isOpen = state ?? !this.isOpen;

    // DOM updates
    this.buttonEl.setAttribute('aria-expanded', `${this.isOpen}`);
    this.call('ExpandableContent', 'toggle', this.isOpen, this.key);

    if (this.isOpen && this.closeOthers) {
      this.call('ExpandableToggle', 'close');
    }

    if (this.isOpen) {
      this.emit('open', this.key);
    } else {
      this.emit('close', this.key);
    }
  };

  open = () => {
    this.toggle(true);
  };

  close = () => {
    this.toggle(false);
  };

  cleanup = () => {
    // Remove listener
    this.buttonEl.removeEventListener('click', this.onClick);
  };
}
