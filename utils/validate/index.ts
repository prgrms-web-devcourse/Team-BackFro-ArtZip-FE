import { RuleObject } from 'antd/lib/form';

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
