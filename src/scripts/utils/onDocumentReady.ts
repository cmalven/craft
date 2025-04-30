export default (callback: () => void) => {
  if (document.readyState === 'complete') callback();
  window.addEventListener('load', callback);
};
