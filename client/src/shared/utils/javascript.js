export const moveItemWithinArray = (arr, item, newIndex) => {
  const arrClone = [...arr];
  const oldIndex = arrClone.indexOf(item);
  arrClone.splice(newIndex, 0, arrClone.splice(oldIndex, 1)[0]);
  return arrClone;
};

export const insertItemIntoArray = (arr, item, index) => {
  const arrClone = [...arr];
  arrClone.splice(index, 0, item);
  return arrClone;
};

export const updateArrayItemById = (arr, itemId, newFields) => {
  const arrClone = [...arr];
  const item = arrClone.find(({ id }) => id === itemId);
  const itemIndex = arrClone.indexOf(item);
  if (itemIndex > -1) {
    arrClone.splice(itemIndex, 1, { ...item, ...newFields });
  }
  return arrClone;
};
