export const getItemFromLocal = (key) =>
  JSON.parse(localStorage.getItem(key));
