
/**
 * 
 * @param entries The total entries (correct + wrong)
 * @param time The time in minutes
 * @returns gross wpm in type number with one thousands accuracy
 */
export const calcGrossWpm = (entries: number, time: number) => {
  return Number((entries / 5 / time).toFixed(3));
};

/**
 * 
 * @param entries The total entries (correct + wrong)
 * @param time The time in minutes
 * @param errors Uncorrected entries
 * @returns wpm in type number with one thousands accuracy
 */
export const calcNetWpm = (entries: number, time: number, errors: number) => {
  const gross = calcGrossWpm(entries, time);
  return Number((gross - (errors / time)).toFixed(3));
};

/**
 * 
 * @param entries The total entries (correct + wrong)
 * @param time The time in minutes
 * @param errors Uncorrected entries
 * @returns accuracy in percentage with one thousands accuracy
 */
export const calcAccuracy = (entries: number, time: number, errors: number) => {
  const gross = calcGrossWpm(entries, time);
  const net = calcNetWpm(entries, time, errors);
  return Number((100 * net / gross).toFixed(3));
};

/**
 * 
 * @param entries The total entries (correct + wrong)
 * @param time The time in minutes
 * @param errors Uncorrected entries
 * @returns gross wpm in type number with one thousands accuracy
 */
export const calcCpm = (entries: number, time: number, errors: number) => {
  return Number(((entries - errors) / time).toFixed(3));
};
