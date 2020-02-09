import { match } from 'react-router-dom';

export const isEqualMatch = (a: match<any>, b: match<any>): boolean => {
  if (a.path !== b.path || a.url !== b.url || a.isExact !== b.isExact) {
    return false;
  }

  const aParams = Object.entries(a);
  const bParams = Object.entries(b);

  if (aParams.length !== bParams.length) {
    return false;
  }

  for (let [k, v] of aParams) {
    if (v !== b.params[k]) {
      return false;
    }
  }

  return true;
};
