import { useEffect, useRef } from 'react';

const useOnUnmount = (callback: () => void, dependencies: unknown[]) => {
  const isUnmounting = useRef(false);

  useEffect(() => {
    return () => {
      isUnmounting.current = true;
    };
  }, []);

  useEffect(
    () => () => {
      if (isUnmounting.current) {
        callback();
      }
    },
    dependencies
  );
};

export default useOnUnmount;
