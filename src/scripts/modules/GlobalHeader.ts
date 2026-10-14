import { Modu, ModuOptions } from '@malven/modu';

/**
 * Handle behavior for the global header.
 */

type ScrollArgs = {
  scroll: number;
  scrollUp: number;
};

export default class extends Modu {
  scrolledUpClass = 'is-scrolled-up';
  scrolledClass = 'is-scrolled';
  minScrolledUp = 100;
  minScroll = 50;
  resizeObserver?: ResizeObserver;

  constructor(m: ModuOptions) {
    super(m);
  }

  init = () => {
    this.on('ScrollManager', 'scroll', this.onScroll);

    // Initially set content height
    this.updateGlobalHeight();

    // Create a resize observer to update content height
    this.resizeObserver = new ResizeObserver((_entries) => {
      this.updateGlobalHeight();
    });
    this.resizeObserver.observe(this.el);
  };

  onScroll = (data: ScrollArgs | unknown) => {
    if (typeof data !== 'object' || data === null || !('scroll' in data))
      return;
    const scrollData = data as ScrollArgs;
    const isScrolled = scrollData.scroll > this.minScroll;
    const isScrolledUp = scrollData.scrollUp > this.minScrolledUp;
    this.el.classList.toggle(this.scrolledClass, isScrolled);
    this.el.classList.toggle(this.scrolledUpClass, isScrolledUp);

    // Visible amount is 0 when nav is hidden and 1 when visible
    const visibleAmount = isScrolled && !isScrolledUp ? 0 : 1;
    document.documentElement.style.setProperty(
      '--sticky-global-header-visible-amount',
      String(visibleAmount),
    );
  };

  updateGlobalHeight = () => {
    document.documentElement.style.setProperty(
      '--size-global-header-height',
      (this.el as HTMLElement).offsetHeight + 'px',
    );
  };

  cleanup = () => {
    // Remove resize observer
    if (this.resizeObserver) this.resizeObserver.disconnect();
  };
}
