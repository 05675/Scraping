import React, { useEffect } from 'react';

const useOnClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  handler: { (): void; (arg0: boolean): void }
) => {
  useEffect(() => {
    // TODO:後で調査する
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler();
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
