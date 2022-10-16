import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loading = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) => url === router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  const antIcon = <StyledIcon style={{ fontSize: '10rem' }} spin />;

  return loading ? (
    <LoadingDim>
      <StyledSpin
        tip={
          <StyledTip>
            로딩 중입니다.
            <br />
            잠시만 기다려주세요!
          </StyledTip>
        }
        indicator={antIcon}
      />
    </LoadingDim>
  ) : (
    <></>
  );
};

const StyledTip = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.color.blue.dark};
`;

const LoadingDim = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;

const StyledSpin = styled(Spin)`
  color: ${({ theme }) => theme.color.blue.main};
`;

const StyledIcon = styled(LoadingOutlined)`
  color: ${({ theme }) => theme.color.blue.light};
  margin-bottom: 20px;
`;
export default Loading;
