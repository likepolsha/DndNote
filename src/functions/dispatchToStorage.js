import { getItemFromLocal } from ".";
import { store } from "../store";

export const dispatchToStorage = () => {
  const imp = getItemFromLocal("imp");
  const chars = getItemFromLocal("chars");
  const diary = getItemFromLocal("diary");

  store.imp = imp;
  store.chars = chars;
  store.diary = diary;
};
