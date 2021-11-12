export const fileValidator = (text) => {
  const [$characters, $important, $diary] = text.split("\n");

  const characters = JSON.parse($characters);
  const important = JSON.parse($important);
  const diary = JSON.parse($diary);

  if (
    !Array.isArray(characters) ||
    !Array.isArray(diary) ||
    typeof important !== "string"
  ) {
    return false;
  }

  return true;
};
