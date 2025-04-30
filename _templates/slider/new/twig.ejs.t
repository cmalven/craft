---
to: <%= h.getDestinationForType(h.changeCase.paramCase(name), 'Twig Include', 'twig', 'slider-') %>
---
<%_ const title = h.changeCase.title(name) _%>
<%_ const slug = 'slider-' + h.formatSlug(h.changeCase.paramCase(name), 'Twig Include') _%>
{# =============================================================== #}
{# Slider - <%= h.getTitlePrefixForType('Twig Include') %><%= title %>
{# =============================================================== #}
{#
  {% include '_partials/<%= slug %>' with {
    items: [
      '<p>Any html can go in here</p>',
    ],
    label: 'Appropriate accessibility label for item.',
    key: 'my-unique-key',
    options: {},
  } %}
#}

{% set slides = [] %}

{% for itemContent in items ??? [] %}
  {% set slide %}
      <div class="<%= slug %>__item">
        {# Slide content goes here #}
        {{ itemContent }}
      </div>
  {% endset %}

  {% set slides = slides | push(slide) %}
{% endfor %}

<div class="<%= slug %>">
  {% include '_partials/slider-base' with {
    objectName: '<%= slug %>__slider',
    moduleName: '<%= slug %>',
    key: key,
    label: label,
    slides: slides,
    options: options ?? {},
  } only %}
</div>
