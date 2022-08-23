import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { Spinner } from 'components/atoms';

function withAuth(Component: NextPage | React.FC) {
  const Auth = () => {
    const router = useRouter();
    const { userId } = useRecoilValue(userAtom);

    useEffect(() => {
      if (!userId) {
        message.warn('로그인이 필요한 서비스입니다.');
        router.push('/signin');
      }
    }, []);

    return userId ? <Component /> : <Spinner />;
  };
  return Auth;
}

export default withAuth;
