import { message, Upload } from 'antd';
import { RuleObject } from 'antd/lib/form';
import { RcFile } from 'antd/es/upload';

export const validateNickname = (_: RuleObject, value: string) => {
  if (!value) {
    return Promise.reject(new Error('닉네임을 입력해 주세요.'));
  }
  if (/\s/g.test(value)) {
    return Promise.reject(new Error('공백 문자를 제외하고 입력해 주세요.'));
  }
  if (value.length > 10) {
    return Promise.reject(new Error('최대 10자까지 입력 가능합니다.'));
  }
  return Promise.resolve();
};

export const validatePassword = (_: RuleObject, value: string) => {
  const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!?@#$%^&*])[a-zA-Z0-9!?@#$%^&*]{8,13}$/;
  if (!value) {
    return Promise.reject(new Error('필수 입력값 입니다.'));
  }
  if (!regExp.test(value)) {
    return Promise.reject(new Error('8~13자 영문, 숫자, 특수문자를 사용하세요.'));
  }
  return Promise.resolve();
};

export const validateImageFile = ({ type, size }: RcFile | File) => {
  const ALLOWED_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
  const MAX_SIZE_MB = 5;

  const isAllowedType = ALLOWED_TYPES.includes(type);
  if (!isAllowedType) {
    message.error('png, jpg, jpeg 확장자 파일만 업로드할 수 있습니다.');
    return isAllowedType || Upload.LIST_IGNORE;
  }

  const isAllowedSize = MAX_SIZE_MB >= size / 1024 / 1024;
  if (!isAllowedSize) {
    message.error(`${MAX_SIZE_MB}MB 이하의 파일만 업로드할 수 있습니다.`);
    return isAllowedSize || Upload.LIST_IGNORE;
  }
  return true;
};
