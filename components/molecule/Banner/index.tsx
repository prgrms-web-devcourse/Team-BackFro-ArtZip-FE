import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

interface BannerProps {
  title: string;
  content?: string;
  backgroundColor?: string;
}

const Banner = ({ title, content, backgroundColor }: BannerProps) => {
  const { color } = useTheme();

  return (
    <Section backgroundColor={backgroundColor ? backgroundColor : color.blue.white}>
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
    </Section>
  );
};

const Section = styled.section<{ backgroundColor: string }>`
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  padding: 50px 0;
  text-align: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Title = styled.h1`
  margin-bottom: 14px;
  font-size: 4.6rem;
  color: ${({ theme }) => theme.color.black};
`;

const Content = styled.p`
  font-size: 2.6rem;
  color: ${({ theme }) => theme.color.font.main};
`;

export default Banner;
