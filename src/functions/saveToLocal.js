import { store } from "../common/store";

export const saveToLocal = (key, el) => {
  const jsonEl = JSON.stringify(el);
  store[key] = el;

  localStorage.setItem(key, jsonEl);
};
