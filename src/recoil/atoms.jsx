import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: {
    memberId: null,
    isLoginUser: false,
  },
});

export const jdSearchValue = atom({
  key: 'jdSearchValue',
  default: '',
});

export const userInfo = atom({
  key: 'userInfoValues',
  default: {
    encrypted: '',
    hmac: '',
    nickname: '',
    birth: '',
    gender: '',
    jobCategoryId: null,
    skillList: [],
  },
});

export const jobIdState = atom({
  key: 'jobIdState',
  default: '',
});

export const kindOfJdState = atom({
  key: 'kindOfJdState',
  default: [],
});

export const selectedJobSkillState = atom({
  key: 'selectedJobSkillState',
  default: [],
});

export const filterValueState = atom({
  key: 'filterValueState',
  default: [],
});

export const coffeeChatListState = atom({
  key: 'coffeeChatListState',
  default: {
    content: [],
    pageInfo: {
      totalPages: 0,
      pageSize: 12,
      first: true,
      last: false,
      empty: true,
    },
  },
});

export const alertState = atom({
  key: 'alertState',
  default: false,
});
