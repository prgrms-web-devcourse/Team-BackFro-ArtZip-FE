import styled from '@emotion/styled';

interface ErrorMessageProps {
  message: string;
  visible: boolean;
}

const ErrorMessage = ({ message, visible }: ErrorMessageProps) => {
  return <Message visible={visible}>{message}</Message>;
};

const Message = styled.p<{
  visible: boolean;
}>`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  margin-top: 2px;
  color: #ff4d4f;
  font-size: 1.4rem;
  height: 16px;
`;

export default ErrorMessage;
