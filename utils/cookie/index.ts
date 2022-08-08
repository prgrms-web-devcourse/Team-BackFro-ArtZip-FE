const cookie = {
  getItem: <T>(key: string, initialValue: T) => {
    const value = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return value ? value[2] : initialValue;
  },
  setItem: <T>(key: string, value: T) => {
    try {
      document.cookie =
        encodeURIComponent(key) +
        '=' +
        encodeURIComponent(JSON.stringify(value).replace(/\"/gi, ''));
    } catch (error) {
      console.error(error);
    }
  },
  removeItem: (key: string) => {
    document.cookie = encodeURIComponent(key);
  },
};

export default cookie;
