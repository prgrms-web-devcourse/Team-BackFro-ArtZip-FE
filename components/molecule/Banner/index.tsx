import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Logo from 'components/atoms/Logo';
import React from 'react';

interface BannerProps {
  title: string;
  content?: string;
  backgroundColor?: string;
  subtitle: string;
}

const Banner = ({ title, content, backgroundColor, subtitle }: BannerProps) => {
  const { color } = useTheme();

  return (
    <Section backgroundColor={backgroundColor ? backgroundColor : color.white}>
      <TextWrapper>
        <SubTitle>{subtitle}</SubTitle>
        <Title>{title}</Title>
        <Content>
          {content &&
            content.split('\\n').map((sentence, i) => (
              <React.Fragment key={i}>
                {sentence}
                <br />
              </React.Fragment>
            ))}
        </Content>
      </TextWrapper>
    </Section>
  );
};

const Section = styled.section<{ backgroundColor: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -45px;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  height: 250px;
  padding: 50px 0;
  text-align: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.05);
`;

const TextWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
  border-bottom: 3px solid ${({ theme }) => theme.color.blue.white};
`;
const SubTitle = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 100;
  color: ${({ theme }) => theme.color.font.main};
`;

const Content = styled.p`
  font-size: 2.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.font.main};
`;

export default Banner;
