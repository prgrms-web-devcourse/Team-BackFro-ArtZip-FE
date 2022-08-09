const storage = {
  getItem: <T>(key: string, initialValue: T) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  },
  setItem: <T>(key: string, value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

export default storage;
