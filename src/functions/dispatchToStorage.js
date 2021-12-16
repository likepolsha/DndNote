import { getItemFromLocal } from ".";
import { store } from "../common/store";

export const dispatchToStorage = () => {
  const imp = getItemFromLocal("imp");
  const chars = getItemFromLocal("chars");
  const diary = getItemFromLocal("diary");
  const tags = getItemFromLocal("tags");

  store.imp = imp;
  store.chars = chars;
  store.diary = diary;
  store.tags = tags;
};
