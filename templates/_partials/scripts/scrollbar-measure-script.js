// Create a test element on the page that we'll use to find the width of the user's scrollbars
const testEl = document.createElement('div');

// Hide the element and give it some width
testEl.style.visibility = 'hidden';
testEl.style.width = '100px';

// Append the element to the page and get its width
document.getElementsByTagName('html')[0].appendChild(testEl);
const widthNoScroll = testEl.offsetWidth;

// Set overflow to scroll to trigger scrollbars
testEl.style.overflow = 'scroll';

// Create a second element that we'll append to the test element
const testElInner = document.createElement('div');
testElInner.style.width = '100%';
testEl.appendChild(testElInner);

// Get the width of inner element
const widthWithScroll = testElInner.offsetWidth;

// Scrollbar width is equal to the difference
const scrollbarWidth = widthNoScroll - widthWithScroll;

// Set width as a custom property
document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

// If scrollbars have width, add a class that we can use as a styling hook
if (scrollbarWidth > 0) {
  document.documentElement.classList.add('has-scrollbars');
}

// Remove the test element from the page
if (testEl.parentNode) {
  testEl.parentNode.removeChild(testEl);
}
