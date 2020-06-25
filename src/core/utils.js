const compareArray = (a, b) => {
  for (let i = 0; i < Math.min (a.length, b.length); i += 1) {
    if (a[i] < b[i]) return -1;
    if (a[i] > b[i]) return 1;
  }

  return a.length - b.length;
};

export {compareArray};
