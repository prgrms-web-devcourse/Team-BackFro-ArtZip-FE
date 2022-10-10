import { useState, useCallback } from 'react';

const useSessionStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        window.sessionStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    },
    [key],
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }, [key, initialValue]);
  return [storedValue, setValue, removeValue];
};

export default useSessionStorage;
