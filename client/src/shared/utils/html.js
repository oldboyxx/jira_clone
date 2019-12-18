export const getTextContentsFromHtmlString = html => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return el.textContent;
};
