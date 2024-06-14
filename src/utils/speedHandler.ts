

export const calcGrossWpm = (entries: number, time: number) => {
  return entries / 5 / time;
};

export const calcNetWpm = (entries: number, time: number, errors: number) => {
  const gross = calcGrossWpm(entries, time);
  return gross - (errors / time);
};

export const calcAccuracy = (entries: number, time: number, errors: number) => {
  const gross = calcGrossWpm(entries, time);
  const net = calcNetWpm(entries, time, errors);
  return 100 * net / gross;
};
