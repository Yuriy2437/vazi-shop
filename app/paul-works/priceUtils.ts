export const getPrice = (id: number): number | null => {
  if (id === 1) return 26;
  if (id === 2) return 20;
  if (id === 3 || id === 4) return 16;
  if (id === 5) return 65;
  if (id === 6 || id === 7) return 13;
  if (id === 8 || id === 9) return 34;
  return null;
};
