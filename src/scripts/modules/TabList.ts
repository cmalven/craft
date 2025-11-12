import { Modu, ModuOptions } from '@malven/modu';

/**
 * List of tabs.
 */

export default class extends Modu {
  tabs: HTMLElement[] = [];
  firstTab: HTMLElement | null = null;
  lastTab: HTMLElement | null = null;
  tabSelector = '[role=tab]';
  tablistSelector = '[role="tablist"]';

  constructor(m: ModuOptions) {
    super(m);
  }

  init = () => {
    this.tabs = Array.from(this.el.querySelectorAll(this.tabSelector));

    for (let i = 0; i < this.tabs.length; i += 1) {
      const tab = this.tabs[i] as HTMLElement;
      if (!tab) continue;

      tab.tabIndex = -1;
      tab.setAttribute('aria-selected', 'false');

      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    }

    if (this.firstTab) this.setSelectedTab(this.firstTab, false);
  };

  setSelectedTab(currentTab: HTMLElement, setFocus: boolean = true) {
    for (let i = 0; i < this.tabs.length; i += 1) {
      const tab = this.tabs[i];
      if (currentTab === tab) {
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');
        this.emit('selected', tab.getAttribute('aria-controls'));
        if (setFocus) {
          tab.focus();
        }
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.tabIndex = -1;
      }
    }
  }

  setSelectedToPreviousTab(currentTab: HTMLElement) {
    let index;

    if (currentTab === this.firstTab) {
      if (this.lastTab) this.setSelectedTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index - 1]);
    }
  }

  setSelectedToNextTab(currentTab: HTMLElement) {
    let index;

    if (currentTab === this.lastTab) {
      if (this.firstTab) this.setSelectedTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  onKeydown(event: KeyboardEvent) {
    const target = event.currentTarget;
    let flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.setSelectedToPreviousTab(target as HTMLElement);
        flag = true;
        break;

      case 'ArrowRight':
        this.setSelectedToNextTab(target as HTMLElement);
        flag = true;
        break;

      case 'Home':
        if (this.firstTab) this.setSelectedTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        if (this.lastTab) this.setSelectedTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onClick(event: MouseEvent) {
    console.log('clicked');
    this.setSelectedTab(event.currentTarget as HTMLElement);
  }

  cleanup = () => {};
}
