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

//--------------------------------------------------------------------
// CMS Entry Edit Buttons
//--------------------------------------------------------------------

type EditableBlock = {
  id: number;
  cpEditUrl: string;
  name: string;
};

function createBlockEditButton(block: EditableBlock): string {
  return `
    <div class="entry-edit-button">
      <a href="${block.cpEditUrl}" target="_blank" class="entry-edit-button__inner">
        <span class="entry-edit-button__label">Edit ${block.name}</span>
        <span class="entry-edit-button__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
            <path d="m15 5 4 4"/>
          </svg>
        </span>
      </a>
    </div>
  `;
}

document.addEventListener('afterBlitzInject', function () {
  const editableBlocks = document
    .querySelector('.craft-cms-toolbar')
    ?.getAttribute('data-editable-blocks');
  if (!editableBlocks) return;

  const blocks: EditableBlock[] = JSON.parse(editableBlocks);

  blocks.forEach((block) => {
    const blockEl = document.querySelector(`[data-block-id="${block.id}"]`);
    if (!blockEl) return;

    blockEl.insertAdjacentHTML('beforeend', createBlockEditButton(block));
  });
});
