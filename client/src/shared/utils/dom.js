export const isFocusedElementEditable = () =>
  !!document.activeElement.getAttribute('contenteditable') ||
  ['TEXTAREA', 'INPUT'].includes(document.activeElement.tagName);
