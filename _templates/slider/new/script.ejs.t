---
to: src/scripts/modules/Slider<%= h.changeCase.pascalCase(name) %>.ts
---
import { ModuOptions } from '@malven/modu';
import SliderCore from './SliderCore';
import type { Options } from '@splidejs/splide';

<%_ if (description.length) { -%>
/**
 * <%= description %>
 */
<% } -%>


export default class extends SliderCore {
  options: Options;

  constructor(m: ModuOptions) {
    super(m);

    const options = JSON.parse((this.getData('options') as string) ?? '{}');
    this.options = Object.assign(
      {
        // Custom options
      },
      options,
    );
  }

  init = () => {
    const slideCount = this.getAll('slide').length;
    if (slideCount < 2) return;

    // Get slider
    this.slider = this.getSlider(this.el, this.options);

    super.init();
  };
}
