type Options = {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
};

// isObject 함수는 value가 객체인지 판단하는데 funtion 또한 객체를 포함하고 있기 때문에 function도 객체로 판단합니다.
function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && (typeof value === 'object' || typeof value === 'function');
}

interface DebouncedFunction<T extends (...args: any[]) => unknown> {
  (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> | undefined;
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
}

function debounce<Args extends any[], Return>(
  func: (...args: Args) => Return,
  wait: number = 0,
  options: Options = {}
): DebouncedFunction<(...args: Args) => Return> {
  const maxWait = Math.max(options.maxWait || 0, wait);
  let lastArgs: Args | undefined;
  // eslint-disable-next-line
  let lastThis: ThisParameterType<(...args: Args) => Return> | undefined;
  let result: Return | undefined;
  let timerId: ReturnType<typeof setTimeout> | undefined;
  let lastCallTime: number | undefined = undefined;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  if (typeof func !== 'function') {
    throw new TypeError('함수 타입이 아닙니다.');
  }

  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    trailing = options.trailing ?? true; // trailing 옵션이 undefined일 경우 true를 기본값으로 사용
  }

  function invokeFunction(time: number): Return {
    // lastArgs와 lastThis는 반드시 정의되어 있어야 하므로 non-null assertion 사용
    const args = lastArgs!;
    const thisArg = lastThis!;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    // 여기서 func.apply의 반환값을 명시적으로 단언합니다.
    // eslint-disable-next-line
    result = func.apply(thisArg, args) as Return;
    return result;
  }

  // debounce 함수는 시간이 중요한 요소이기 때문에 초기 호출 시의 시간과 이후 timer 호출 시의 시간을 비교하여 시간을 계산합니다.
  // 현재 시간인 time을 받아와서 마지막 호출 시간인 lastCallTime과 마지막 호출 시간과 마지막 호출 시간인 lastInvokeTime을 비교하여 시간을 계산합니다.
  function remainingWait(time: number): number {
    const timeSinceLastCall = lastCallTime === undefined ? 0 : time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time: number): boolean {
    const timeSinceLastCall = lastCallTime === undefined ? 0 : time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function leadingEdge(time: number): Return | undefined {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunction(time) : result;
  }

  function trailingEdge(time: number): Return | undefined {
    timerId = undefined;
    if (trailing && lastArgs) {
      return invokeFunction(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  // flush 함수의 역할은 현재 대기 중인(예약된) 함수 호출이 있다면 즉시 실행시켜 그 결과를 반환하는 것입니다.
  // 만약 타이머가 존재하지 않으면 마지막 실행 결과(result)를 반환합니다.
  function flush(): Return | undefined {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  // debounced 함수 내부의 기능 구조와 역할:
  // 1. 함수 호출 시점의 시간, 인자, this를 각각 lastCallTime, lastArgs, lastThis에 저장합니다.
  // 2. 현재 시간과 마지막 호출 시간, 마지막 실행 시간을 비교하여 즉시 실행할지(leading) 여부를 판단합니다.
  //    - 만약 즉시 실행해야 한다면(timer가 없으면) leadingEdge 함수를 호출하여 즉시 실행합니다.
  //    - maxing 옵션이 활성화되어 있다면, 기존 타이머를 재설정하고 즉시 실행합니다.
  // 3. 만약 즉시 실행하지 않아야 한다면, 타이머가 없다면 wait 시간 후에 timerExpired가 호출되도록 타이머를 설정합니다.
  // 4. timerExpired 함수는 wait 시간 이후에 호출되며, 다시 현재 시각과 저장된 시간을 비교한 후, 필요시 trailingEdge 함수를 통해
  //    마지막 저장된 인자(lastArgs)를 사용해 함수를 실행합니다.
  // 5. debounced 함수는 실행 결과(result)를 반환합니다.
  function debounced(this: ThisParameterType<(...args: Args) => Return>, ...args: Args): Return | undefined {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunction(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }

  (debounced as DebouncedFunction<(...args: Args) => Return>).cancel = cancel;
  (debounced as DebouncedFunction<(...args: Args) => Return>).flush = flush;
  return debounced as DebouncedFunction<(...args: Args) => Return>;
}

export { debounce };
