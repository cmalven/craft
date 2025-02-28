import { Modu, ModuOptions } from '@malven/modu';

/**
 * General purpose accessible navigation menu.
 */

export default class extends Modu {
  toggleEl: HTMLButtonElement;
  menuEl: HTMLUListElement;
  linkEls: NodeList;

  constructor(m: ModuOptions) {
    super(m);

    this.toggleEl = this.get('toggle') as HTMLButtonElement;
    this.menuEl = this.get('menu') as HTMLUListElement;
    this.linkEls = this.getAll('link');
  }

  init = () => {
    this.addListeners();
  };

  addListeners = () => {
    // Mouse and keyboard
    this.toggleEl.addEventListener('keypress', this.toggle);
    this.toggleEl.addEventListener('click', this.toggle);
    (this.el as HTMLElement).addEventListener('keyup', this.onKeyUp);
    document.addEventListener('click', this.onDocumentClick);

    // Listen for other menus to open so we can close this one
    this.on('NavMenu', 'toggled', (state: unknown) => {
      if (state === true) this.set(false);
    });

    // Every link should broadcast its click
    this.linkEls.forEach((el) => {
      el.addEventListener('click', this.onLinkClick);
    });

    // Close initially
    this.set(false);
  };

  onDocumentClick = (evt: MouseEvent) => {
    // If we click anywhere outside an item, close the active item
    if (!evt.target) return;
    const isChild = this.el.contains(evt.target as HTMLElement);
    if (!isChild) {
      this.set(false);
    }
  };

  onKeyUp = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') this.set(false);
  };

  onLinkClick = (evt: Event) => {};

  toggle = (evt: MouseEvent | KeyboardEvent) => {
    evt.preventDefault();

    const expanded =
      this.toggleEl.getAttribute('aria-expanded') === 'true' || false;
    this.set(!expanded);
  };

  set = (state: boolean) => {
    this.toggleEl.setAttribute('aria-expanded', state ? 'true' : 'false');

    // Toggle hidden on all links
    const linkEls = this.menuEl.querySelectorAll('a');
    linkEls.forEach((el) => {
      if (!state) {
        el.setAttribute('tabindex', '-1');
        el.setAttribute('aria-hidden', 'true');
      } else {
        el.removeAttribute('tabindex');
        el.removeAttribute('aria-hidden');
      }
    });

    // If true, announce to other nav menus that we're open
    if (state) this.emit('toggled', state);
  };

  cleanup = () => {
    // Code to run when the module is destroyed
    this.toggleEl.removeEventListener('click', this.toggle);
    (this.el as HTMLElement).removeEventListener('keyup', this.onKeyUp);
    document.removeEventListener('click', this.onDocumentClick);
    this.linkEls.forEach((el) => {
      el.removeEventListener('click', this.onLinkClick);
    });
  };
}
