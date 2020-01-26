// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunction<F extends (...args: any[]) => any, S>(
  f: F | S
): f is F {
  return typeof f === 'function';
}
