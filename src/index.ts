export async function fnPipe<T, Fns extends Function[]>(
  [fn, ...fns]: Fns,
  initialValue?: any
): Promise<T> {
  if (!fn) return initialValue;
  return fnPipe(fns, fn(await initialValue));
}

export default fnPipe;
