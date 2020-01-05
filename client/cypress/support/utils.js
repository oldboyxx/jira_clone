export const testid = (strings, ...values) => {
  const id = strings.map((str, index) => str + (values[index] || '')).join('');
  return `[data-testid="${id}"]`;
};
