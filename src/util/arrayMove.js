export const arrayMove = (array, fromIndex, toIndex) => {
  const result = array.slice();
  const element = result[fromIndex];
  result.splice(fromIndex, 1);
  result.splice(toIndex, 0, element);
  return result;
};
