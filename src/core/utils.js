const compareArray = (a, b) => {
  for (let i = 0; i < Math.min(a.length, b.length); i += 1) {
    if (aPosition[i] < bPosition[i]) return -1;
    if (aPosition[i] > bPosition[i]) return 1;
  }

  return aPosition.length - bPosition.length;
};

export {compareArray};
