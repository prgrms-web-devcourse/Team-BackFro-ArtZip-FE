import { RuleObject } from 'antd/lib/form';
import { message } from 'antd';
import { SubmitData } from 'pages/reviews/create/index';

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
  if (new Date(date) > new Date()) {
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
  if (content.length > 1000) {
    message.error('내용은 1000자 이하로 작성해주세요.');
    return isValidateComplete;
  }
  isValidateComplete = true;
  return isValidateComplete;
};
