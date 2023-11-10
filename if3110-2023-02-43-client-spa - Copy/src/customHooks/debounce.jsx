import { debounce } from "lodash";
import { useEffect, useMemo, useRef } from "react";

const useDebounce = (callback) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 800);
  }, []);

  return debouncedCallback;
};

export default useDebounce;