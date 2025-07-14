import Drawer from './Drawer';

/**
 * Overlay for working with type in development.
 */

export default class extends Drawer {
  init = () => {
    // Ctrl+t to toggle grid visibility
    document.addEventListener('keypress', (evt) => {
      if (evt.ctrlKey && evt.key === 't') {
        this.open();
      }
    });
  };
}
