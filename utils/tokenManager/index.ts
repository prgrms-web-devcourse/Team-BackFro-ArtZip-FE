import cookie from 'react-cookies';

function setToken(key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN', token: string) {
  // 개발 환경에 따라서 설정
  // const HTTP_ONLY = process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEVELOP';
  const expires = new Date();

  expires.setDate(expires.getDate() + 14);

  // TODO: 테스트용 주석, 배포 확정시 삭제
  // console.log('환경:', process.env.NEXT_PUBLIC_ENVIRONMENT);

  cookie.save(key, token, {
    path: '/',
    expires: key === 'REFRESH_TOKEN' ? expires : undefined,
    domain:
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEVELOP'
        ? '.localhost'
        : '.team-back-fro-art-zip-fe.vercel.app',
    // httpOnly: HTTP_ONLY,
  });
}

export { setToken };
