
/**
 * 
 * @param entries The total entries (correct + wrong)
 * @param time The time in minutes
 * @returns gross wpm in type number
 */
export const calcGrossWpm = (entries: number, time: number) => {
  return entries / 5 / time;
};

/**
 * 
 * @param entries The total entries (correct + wrong)
 * @param time The time in minutes
 * @param errors Uncorrected entries
 * @returns wpm in type number
 */
export const calcNetWpm = (entries: number, time: number, errors: number) => {
  const gross = calcGrossWpm(entries, time);
  return gross - (errors / time);
};

/**
 * 
 * @param entries The total entries (correct + wrong)
 * @param time The time in minutes
 * @param errors Uncorrected entries
 * @returns accuracy in percentage
 */
export const calcAccuracy = (entries: number, time: number, errors: number) => {
  const gross = calcGrossWpm(entries, time);
  const net = calcNetWpm(entries, time, errors);
  return 100 * net / gross;
};
