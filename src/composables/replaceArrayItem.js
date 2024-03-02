export function useReplaceArrayItem(array, itemToReplace) {
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i]._id === itemToReplace._id ? itemToReplace : array[i];
  }
}
