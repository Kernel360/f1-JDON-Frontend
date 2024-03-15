/**
 * Header 공동 컴포넌트에 있는 버튼의 제목 및 라우팅 경로를 지정해주는 파일입니다.
 * */

// 커피챗 상세페이지 및 커피챗 생성 페이지
export const COFFEE_CHILD = {
  title: '목록으로',
  url: '/coffee',
};
// 커피챗 - 수정화면에서 상세페이지로 이동하도록.
export const COFFEE_CHILD_ID = {
  title: '상세페이지로',
  url: '/coffee/',
};
// 커피챗 - 마이페이지에서 타고 들어갈 시 다시 마이페이지로 오도록. (아직 적용 안됨.)
export const COFFEE_MYPAGE_CHILD = {
  title: '마이페이지 / 내 커피챗',
  url: '/mypage/coffee',
};
// JD 상세 페이지
export const JD_CHILD = {
  title: '목록으로',
  url: '/jds',
};

// 마이페이지 (찜, 커피챗, 정보수정)
export const MYPAGE_CHILD = {
  title: '마이페이지',
  url: '/mypage',
};

// 회원탈퇴 페이지
export const USER_QUIT = {
  title: '내 정보 수정',
  url: '/mypage/infoedit',
};
