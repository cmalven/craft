//--------------------------------------------------------------------
// Global Types
//--------------------------------------------------------------------

declare global {
  interface Window {
    isTouch: boolean;
    devMode: boolean;
  }
}

//--------------------------------------------------------------------
// Third-Party Styles
//--------------------------------------------------------------------

async function loadThirdPartyStyles() {
  await import(
    // @ts-expect-error Dynamically loading third-party CSS confuses TypeScript
    '@awesome.me/webawesome/dist/styles/themes/default.css'
  );
}
loadThirdPartyStyles();

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
