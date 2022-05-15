import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

function useWindowScrollTop(): number {
  // States
  const [top, setTop] = useState<number>(0);

  // Functions
  const handleScroll = (): void => {
    setTop(window.scrollY);
  };
  const debouncedHandleScroll = debounce(handleScroll, 300);

  // Hooks
  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll);
    () => () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, []);

  // Main
  return top;
}

export default useWindowScrollTop;