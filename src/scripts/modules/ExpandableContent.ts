import { Modu, ModuOptions } from '@malven/modu';

/**
 * Content revealed by an expandable toggle.
 */

export default class extends Modu {
  contentEl: HTMLElement;
  contentInnerEl: HTMLElement;
  activeClass = 'is-active';
  isCollapsible: boolean = false;
  resizeObserver?: ResizeObserver;

  constructor(m: ModuOptions) {
    super(m);

    this.contentEl = this.el as HTMLElement;
    this.contentInnerEl = this.get('inner') as HTMLElement;
    this.isCollapsible = (this.getData('is-collapsible') ?? false) as boolean;
  }

  init = () => {
    // Add the active class to the element
    this.el.classList.add(this.activeClass);

    if (this.isCollapsible) {
      // Create a resize observer to update content height
      this.resizeObserver = new ResizeObserver((_entries) => {
        this.updateContentHeight();
      });
      this.resizeObserver.observe(this.contentInnerEl);
    }
  };

  updateContentHeight = () => {
    this.contentEl.style.maxHeight = this.contentInnerEl.offsetHeight + 'px';
  };

  toggle = (isOpen: boolean) => {
    this.el.setAttribute('aria-hidden', `${!isOpen}`);

    // Toggle focus of links
    this.el.querySelectorAll('a').forEach((linkEl) => {
      linkEl.setAttribute('tabindex', isOpen ? '0' : '-1');
    });
  };

  cleanup = () => {
    // Remove resize observer
    if (this.resizeObserver) this.resizeObserver.disconnect();
  };
}
