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

export const updateArrayItemById = (arr, itemId, fields) => {
  const arrClone = [...arr];
  const item = arrClone.find(({ id }) => id === itemId);
  if (item) {
    const itemIndex = arrClone.indexOf(item);
    arrClone.splice(itemIndex, 1, { ...item, ...fields });
  }
  return arrClone;
};

export const sortByNewest = (items, sortField) =>
  items.sort((a, b) => -a[sortField].localeCompare(b[sortField]));
