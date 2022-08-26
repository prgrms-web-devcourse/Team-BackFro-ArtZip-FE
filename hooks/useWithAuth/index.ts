import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { useRouter } from 'next/router';
import { message } from 'antd';

const useWithAuth = () => {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const { userId } = useRecoilValue(userAtom);

  useEffect(() => {
    if (!userId) {
      message.warn('로그인이 필요한 서비스입니다.');
      router.push('/signin');
    } else {
      setIsChecking(false);
    }
  }, []);

  return [isChecking];
};

export default useWithAuth;
