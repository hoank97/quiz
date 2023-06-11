export const convertArrToDict = <T>(
  array: T[],
  key: keyof T
): { [key: string]: T } => {
  return array.reduce((dict, cV) => {
    dict[cV[key.toString()]] = cV;
    return dict;
  }, {});
};
