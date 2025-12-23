import expand from 'emmet';

//--------------------------------------------------------------------
// Utility Functions
//--------------------------------------------------------------------

/**
 * Extracts all unique CSS classes from HTML markup
 */
const getClassListFromMarkup = (markup) => {
  // Get all unique css classes in html into dict
  const classRegexp = /class=['"](.*?)['"]/g;
  let dict = [];
  let m;
  while ((m = classRegexp.exec(markup))) {
    let classes = m[1].replace(/\s+/g, ' ').trim();
    classes.split(' ').forEach(function (item) {
      dict[item] = true;
    });
  }

  // convert dict to arr
  let arr = [];
  for (let key in dict) arr.push(key);

  return arr;
};

/**
 * Generates markup from Emmet abbreviation with BEM conventions
 */
const getEmmetMarkup = (filename, rootElement, emmetString) => {
  const emmet = `${rootElement}.${filename}>${emmetString}`;
  let markup = expand(emmet, {
    options: {
      inlineElements: [],
      'bem.enabled': true,
      'bem.element': '__',
      'bem.modifier': '--',
      'output.indent': '  ',
      'comment.enabled': true,
      'comment.after': '',
      'comment.before': '{# Object - [CLASS] #}\n',
    },
  });

  // Replace the comment for the filename.
  markup = markup.replace(`{# Object - ${filename} #}`, '');

  // Loop over every child comment and if we find this pattern, replace it with the formatted version and title case it
  const pattern = new RegExp(`{# Object - ${filename}__(.*?) #}`, 'g');
  markup = markup.replace(pattern, function (match, p1) {
    return `{# ${p1
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())} #}`;
  });

  return markup;
};

/**
 * Returns destination path based on component type
 */
const getDestinationForType = (name, type, extension, prefix = '') => {
  const destinations = {
    'Twig Include': {
      twig: `templates/_partials/${prefix}${name}.twig`,
      scss: `src/styles/objects/_${prefix}${name}.scss`,
    },
    'Twig Embed': {
      twig: `templates/_embeds/l-${prefix}${name}.twig`,
      scss: `src/styles/layout/_l-${prefix}${name}.scss`,
    },
    'Twig Block': {
      twig: `templates/_partials/blocks/${prefix}${name}.twig`,
      scss: `src/styles/objects/_${prefix}${name}.scss`,
    },
  };

  return destinations[type][extension];
};

/**
 * Returns title prefix based on component type
 */
const getTitlePrefixForType = (type) => {
  const prefixes = {
    'Twig Include': '',
    'Twig Embed': 'Layout - ',
    'Twig Block': 'Block - ',
  };
  return prefixes[type];
};

/**
 * Formats slug with type-specific prefix
 */
const formatSlug = (name, type) => {
  return type === 'Twig Embed' ? `l-${name}` : name;
};

//--------------------------------------------------------------------
// Plop Configuration
//--------------------------------------------------------------------

export default function (plop) {
  // Register custom Handlebars helpers
  plop.setHelper('eq', (a, b) => a === b);
  plop.setHelper('getTitle', (label) => {
    return plop.getHelper('titleCase')(label).replaceAll('-', ' ');
  });

  // ===== COMPONENT GENERATOR =====
  plop.setGenerator('component', {
    description: 'Generate a Twig component with styles',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What type of component is this?',
        default: 'Twig Include',
        choices: ['Twig Include', 'Twig Embed', 'Twig Block'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What should this component be called?',
        default: 'my-new-component',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Briefly describe this component.',
      },
      {
        type: 'input',
        name: 'rootElement',
        message: 'What should the root element be?',
        default: 'div',
      },
      {
        type: 'input',
        name: 'emmet',
        message:
          "What is the emmet abbreviation for this component? (e.g. 'div')",
        default: '',
      },
    ],
    actions: (data) => {
      const paramCaseName = plop.getHelper('kebabCase')(data.name);
      const slug = formatSlug(paramCaseName, data.type);

      // Pre-compute values for templates
      data.slug = slug;
      data.titlePrefix = getTitlePrefixForType(data.type);
      data.emmetMarkup = data.emmet
        ? getEmmetMarkup(slug, data.rootElement, data.emmet)
        : '';
      data.classList = data.emmet
        ? getClassListFromMarkup(data.emmetMarkup)
        : [];

      return [
        {
          type: 'add',
          path: getDestinationForType(paramCaseName, data.type, 'twig'),
          templateFile: 'plop-templates/component/twig.hbs',
        },
        {
          type: 'add',
          path: getDestinationForType(paramCaseName, data.type, 'scss'),
          templateFile: 'plop-templates/component/sass.hbs',
        },
      ];
    },
  });

  //--------------------------------------------------------------------
  // Modu
  //--------------------------------------------------------------------
  plop.setGenerator('modu', {
    description: 'Generate a TypeScript module using @malven/modu',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What should this module be called?',
        default: 'MyModule',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Briefly describe this module.',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/scripts/modules/{{name}}.ts',
        templateFile: 'plop-templates/modu/ts.hbs',
      },
    ],
  });

  //--------------------------------------------------------------------
  // Sass Util
  //--------------------------------------------------------------------
  plop.setGenerator('sass-util', {
    description: 'Generate a Sass utility mixin',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What should this include be called?',
        default: 'my-new-util',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Briefly describe this include.',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/styles/util/project/_{{name}}.scss',
        templateFile: 'plop-templates/sass-util/sass.hbs',
      },
    ],
  });

  //--------------------------------------------------------------------
  // Slider
  //--------------------------------------------------------------------
  plop.setGenerator('slider', {
    description: 'Generate a complete slider with Twig, Sass, and TypeScript',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message:
          'What should this component be called? (will automatically be prefixed with "slider-")',
        default: 'my-example',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Briefly describe this component.',
      },
    ],
    actions: (data) => {
      const paramCaseName = plop.getHelper('kebabCase')(data.name);
      const pascalCaseName = plop.getHelper('pascalCase')(data.name);

      // Pre-compute slider-specific values
      data.sliderSlug = `slider-${paramCaseName}`;
      data.className = `Slider${pascalCaseName}`;

      return [
        {
          type: 'add',
          path: getDestinationForType(
            paramCaseName,
            'Twig Include',
            'twig',
            'slider-',
          ),
          templateFile: 'plop-templates/slider/twig.hbs',
        },
        {
          type: 'add',
          path: getDestinationForType(
            paramCaseName,
            'Twig Include',
            'scss',
            'slider-',
          ),
          templateFile: 'plop-templates/slider/sass.hbs',
        },
        {
          type: 'add',
          path: `src/scripts/modules/Slider${pascalCaseName}.ts`,
          templateFile: 'plop-templates/slider/script.hbs',
        },
      ];
    },
  });
}
