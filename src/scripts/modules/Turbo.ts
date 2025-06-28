import { Modu, ModuOptions } from '@malven/modu';
import * as Turbo from '@hotwired/turbo';

/**
 * Handles common logic for Hotwired Turbo
 */

export default class extends Modu {
  constructor(m: ModuOptions) {
    super(m);
  }

  init = () => {
    // Off by default
    // @ts-expect-error Turbo definition doesn't include session
    Turbo.session.drive = false;

    // Before frame renders
    document.addEventListener('turbo:before-frame-render', (evt) => {
      this.app.destroyModules(evt.target as HTMLElement);
      this.emit('before-frame-render', evt);
    });

    // After frame renders
    document.addEventListener('turbo:frame-load', (evt) => {
      this.app.init(evt.target as HTMLElement);
      this.emit('frame-load', evt);
    });
  };

  cleanup = () => {
    // Code to run when the module is destroyed
  };
}
