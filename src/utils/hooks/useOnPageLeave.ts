import { useEffect } from 'react';

const useOnPageLeave = (callback: () => void) => {
  useEffect(() => {
    return () => {
      callback();
    };
  }, []);
};
export default useOnPageLeave;
