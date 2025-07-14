import { Modu, ModuOptions } from '@malven/modu';
import '@awesome.me/webawesome/dist/components/drawer/drawer.js';
import type WaDrawer from '@awesome.me/webawesome/dist/components/drawer/drawer.js';

/**
 * General purpose behavior for <wa-drawer> component.
 */

export default class extends Modu {
  constructor(m: ModuOptions) {
    super(m);
  }

  open() {
    const drawer = this.el as WaDrawer;
    drawer.open = true;
  }

  init = () => {};
}
