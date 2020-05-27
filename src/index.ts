const __ = Symbol('fn-pipe argument placeholder');

type FnPipeReturn = ((value: any) => void) | any;

async function runFnPipe(
  [fn, ...fns]: Function[],
  initialValue: any
): Promise<any> {
  if (!fn) return initialValue;
  return runFnPipe(fns, fn(await initialValue));
}

function fnPipe(
  functions: Function[] | symbol,
  initialValue?: symbol | any
): FnPipeReturn {
  if (functions === __) {
    return (fns: Function[]): any => runFnPipe(fns, initialValue);
  }

  if (initialValue === __) {
    return (value: any): any => runFnPipe(functions as Function[], value);
  }

  return runFnPipe(functions as Function[], initialValue);
}

export { __, fnPipe };
export default fnPipe;
