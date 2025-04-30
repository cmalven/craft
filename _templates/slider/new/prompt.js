// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
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
];
