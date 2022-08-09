const storage = {
  getItem: <T>(key: string, initialValue: T) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value).value : initialValue;
  },
  setItem: <T>(key: string, value: T) => {
    const expireDate = new Date();
    try {
      const obj = {
        value: value,
        expire: expireDate.setMinutes(expireDate.getMinutes() + 30),
      };
      localStorage.setItem(key, JSON.stringify(obj));
    } catch (error) {
      console.error(error);
    }
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

export default storage;
