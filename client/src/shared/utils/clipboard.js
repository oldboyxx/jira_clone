export const copyToClipboard = value => {
  const $textarea = document.createElement('textarea');
  $textarea.value = value;
  document.body.appendChild($textarea);
  $textarea.select();
  document.execCommand('copy');
  document.body.removeChild($textarea);
};
