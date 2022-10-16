import styled from '@emotion/styled';

export const ERROR_MESSAGE_COMMON = {
  NO_ERROR: '',
  REQUIRED_VALUE: '필수 입력값입니다.',
};

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
