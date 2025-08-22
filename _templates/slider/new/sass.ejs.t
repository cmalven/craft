---
to: <%= h.getDestinationForType(h.changeCase.paramCase(name), 'Twig Include', 'scss', 'slider-') %>
---
<%_ const title = h.changeCase.title(name) _%>
<%_ const slug = 'slider-' + h.formatSlug(h.changeCase.paramCase(name), 'Twig Include') _%>
@use '~/common' as *;

/*
Slider - <%= h.getTitlePrefixForType('Twig Include') %><%= title %>
<%_ if (description.length) { %>
<%= description %>
<% } -%>
*/

.<%= slug %> {
  @include hide-splide-slides-js(<%= slug %>__slider);
  @include splide-number-pagination;
  @include splide-arrows;
}

.<%= slug %>__slider__slide {
  display: flex;
  flex-direction: column;

  > * {
    flex: 1 1 auto;
  }
}

.<%= slug %>__item {
}
