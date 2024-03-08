export function useReplaceArrayItem(array, itemToReplace) {
  console.log(array);
  for (let i = 0; i < array.length; i++) {
    array[i].title =
      array[i]._id === itemToReplace._id ? itemToReplace.title : array[i].title;
    array[i].message =
      array[i]._id === itemToReplace._id
        ? itemToReplace.message
        : array[i].message;
  }
  console.log(array);
}
