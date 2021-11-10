import { store } from "../store";

export const saveToLocal = (key, el) => {
  const jsonEl = JSON.stringify(el);
  store[key] = el;

  localStorage.setItem(key, jsonEl);
};
