import { atom } from 'recoil';

// 유효한 유저인지 체크하는 로직 필요 (토큰 이용, selector 이용)
// TODO: 후에 API 만들어지면 비동기 통신으로 바꾸기
const userAtom = atom({
  key: 'users',
  default: null,
});

export default userAtom;
