import React from "react";

function usePrevious<T>(value: T) {
  const ref = React.useRef<T | undefined>(undefined);
  const previousValue = ref.current;

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return previousValue;
}

export default usePrevious;
