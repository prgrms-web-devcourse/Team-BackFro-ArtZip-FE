import cookie from 'react-cookies';

function setToken(key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN', token: string) {
  // 개발 환경에 따라서 설정
  const HTTP_ONLY = process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEVELOP';
  const expires = new Date();

  if (key === 'ACCESS_TOKEN') {
    expires.setMinutes(expires.getMinutes() + 30);
  }

  if (key === 'REFRESH_TOKEN') {
    expires.setDate(expires.getDate() + 14);
  }

  cookie.save(key, token, {
    path: '/',
    expires,
    httpOnly: HTTP_ONLY,
  });
}

export { setToken };
