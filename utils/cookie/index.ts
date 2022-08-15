const cookie = {
  getItem: <T>(key: string, initialValue: T) => {
    const value = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return value ? value[2] : initialValue;
  },
  setItem: <T>(key: string, value: T) => {
    try {
      if (key === 'REFRESH_TOKEN') {
        const expires = new Date();

        expires.setDate(expires.getDate() + 14);
        document.cookie =
          encodeURIComponent(key) +
          '=' +
          // eslint-disable-next-line
          encodeURIComponent(JSON.stringify(value).replace(/\"/gi, '')) +
          ';expires=' +
          expires +
          ';path=/';
      }
    } catch (error) {
      console.error(error);
    }
  },
  removeItem: (key: string) => {
    document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 JAN 1999 00:00:10 GMT';
  },
};

export default cookie;
