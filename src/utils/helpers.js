export const selectRandomColor = (colorList) => {
  const randomIndex = Math.floor(Math.random() * colorList.length);
  const selectedColor = colorList[randomIndex];
  return selectedColor;
};
