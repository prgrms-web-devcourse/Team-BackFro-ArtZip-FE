import { RuleObject } from 'antd/lib/form';
import { RcFile } from 'antd/es/upload';
import { message, Upload } from 'antd';
import { SubmitData } from 'components/organisms/ReviewEditForm';

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

export const validateReviewEditForm = (submitData: SubmitData) => {
  let isValidateComplete = false;
  const { exhibitionId, date, title, content } = submitData;

  if (!exhibitionId) {
    message.error('다녀온 전시회를 등록해주세요.');
    return isValidateComplete;
  }
  if (!date) {
    message.error('다녀온 날짜를 입력해주세요.');
    return isValidateComplete;
  }
  if (new Date(date as string) > new Date()) {
    message.error('다녀온 날짜는 오늘 이후일 수 없습니다.');
    return isValidateComplete;
  }
  if (!title) {
    message.error('후기 제목을 입력해주세요.');
    return isValidateComplete;
  }
  if (!content) {
    message.error('후기 내용을 입력해주세요.');
    return isValidateComplete;
  }
  if ((content as string).length > 1000) {
    message.error('내용은 1000자 이하로 작성해주세요.');
    return isValidateComplete;
  }
  isValidateComplete = true;
  return isValidateComplete;
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
