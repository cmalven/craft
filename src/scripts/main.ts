//--------------------------------------------------------------------
// Global Types
//--------------------------------------------------------------------

declare global {
  interface Window {
    isTouch: boolean;
    devMode: boolean;
  }
}

// ---------------------------------------------------------------
// Modu
// ---------------------------------------------------------------

import * as initialModules from './modules/initial';
import { App } from '@malven/modu';

const app = new App({
  initialModules,
  importMethod: (module) => import(`./modules/${module}.ts`),
});
app.init();
