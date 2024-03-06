import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_BASE_URL;
export const instance = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      alert('로그인이 필요한 서비스입니다');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// -------------------------------------------- member
// 회원 로그인 상태 판별
export async function Authentication() {
  try {
    const res = await instance.get('/api/v1/authenticate');
    return res.data.data;
  } catch (error) {
    console.error('user login state', error);
    throw error;
  }
}

//최종 회원 정보 등록
export async function Outh() {
  try {
    const res = await instance.get('/oauth2/authorization/kakao', {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error('Outh API error', error);
    throw error;
  }
}
//최종 회원 정보 등록
export async function registerUserInfo(userInfo) {
  try {
    const res = await instance.post('/api/v1/register', userInfo);
    return res.data;
  } catch (error) {
    console.error('registerUserInfo API error', error);
    throw error;
  }
}

//닉네임 중복 확인
export async function checkNicknameDuplicate(nickName) {
  try {
    const res = await instance.post('/api/v1/nickname/duplicate', nickName);
    return res.status;
  } catch (error) {
    console.log('checkNicknameDuplicate API error', error);
    throw error;
  }
}

//회원정보 불러오기
export async function getMemberInfo() {
  try {
    const res = await instance.get('/api/v1/member');
    return res.data;
  } catch (error) {
    console.log('getMemberInfo API error', error);
    throw error;
  }
}

//회원정보 수정하기
export async function updateMemberInfo(data) {
  try {
    const res = await instance.put('/api/v1/member', data);
    return res.data;
  } catch (error) {
    console.log('getMemberInfo API error', error);
    throw error;
  }
}

//회원 로그아웃
export async function logoutMember() {
  try {
    const res = await instance.post('/api/v1/logout');
    return res;
  } catch (error) {
    console.log('logoutMember API error', error);
    // throw error;
  }
}

//회원 탈퇴
export async function deleteMember() {
  try {
    // console.log(nickName);
    const res = await instance.delete('/api/v1/withdraw');
    console.log('deleteMember API', res);
    return res.data;
  } catch (error) {
    console.log('deleteMember API error', error);
    throw error;
  }
}

// -------------------------------------------- skill

//요즘 뜨는 기술스택 조회
export async function getHotSkills() {
  try {
    const res = await instance.get('/api/v1/skills/hot');
    return res.data;
  } catch (error) {
    console.error('getHotSkills API error', error);
    throw error;
  }
}

//회원 맞춤 기술스택 조회
export async function getMemberSkills() {
  try {
    const res = await instance.get('/api/v1/skills/member');
    return res.data;
  } catch (error) {
    console.error('getMemberSkills API error', error);
    throw error;
  }
}

// 기술 스택 기반 원티드JD, 인프런 강의 데이터 조회하기
export async function getLectureByKeyword(keyword) {
  try {
    const res = await instance.get(`/api/v1/skills/search?keyword=${keyword}`);
    return res.data.data;
  } catch (error) {
    console.error('getLectureByKeyword API error', error);
    throw error;
  }
}

//직무 별 기술스택 조회하기
export async function getSkillsOnJD(jobCategoryId) {
  try {
    const res = await instance.get(`/api/v1/job-category/${jobCategoryId}`);

    return res.data.data;
  } catch (error) {
    console.error('getSkillsOnJD API error', error);
    throw error;
  }
}

// // 기술스택 기반 원디트JD 목록 전체 조회하기 (수요일 이후 연결 예정)
export async function getAllJDByKeyword(page, size, keyword) {
  try {
    const res = await instance.get(`/api/v1/jds?page=${page}&size=${size}&keyword=${keyword}`);
    return res.data.data;
  } catch (error) {
    console.error('getAllJDByKeyword API error', error);
    throw error;
  }
}

// -------------------------------------------- favorite
// 영상 찜하기 등록
export const postFavoritVideo = async (data) => {
  try {
    const res = await instance.post(`/api/v1/favorites`, data);
    return res.data;
  } catch (error) {
    console.error('getFavoritVideo API', error);
    throw error;
  }
};

// 내가 찜한 영상 목록 조회
export const getFavoritVideo = async () => {
  try {
    const res = await instance.get(`/api/v1/favorites?page=0&size=12`);
    return res.data;
  } catch (error) {
    console.error('getFavoritVideo API', error);
    throw error;
  }
};

// -------------------------------------------- faq

// faq 목록조회

export const getFAQ = async () => {
  try {
    const res = await instance.get(`/api/v1/faqs`);
    return res.data.data;
  } catch (error) {
    console.error('getFAQ API 통신에러', error);
    throw error;
  }
};
// -------------------------------------------- job_category
//직군 별 직무 조회
export const getJobCategory = async () => {
  try {
    const res = await instance.get('/api/v1/job-categories');
    return res.data.data;
  } catch (error) {
    console.error('getJobCategory API', error);
    throw error;
  }
};
// -------------------------------------------- coffeechat

//내가 오픈한 커피챗 목록 조회

export const getMyCoffeeChat = async (page) => {
  try {
    const res = await instance.get(`/api/v1/coffeechats/host?page=${page}&size=12`);
    return res.data.data;
  } catch (error) {
    console.error('getMyCoffeeChat API', error);
    throw error;
  }
};

//내가 신청한 커피챗 목록 조회
export const getSignCoffeeChat = async (page) => {
  try {
    const res = await instance.get(`/api/v1/coffeechats/guest?page=${page}&size=12&sort=createdDate`);
    return res.data.data;
  } catch (error) {
    console.error('getMyCoffeeChat API', error);
    throw error;
  }
};

//커피챗 목록 조회
export const getCoffeeChat = async (page, size, sorting, jobCategory) => {
  try {
    const res = await instance.get(
      `/api/v1/coffeechats?page=${page}&size=${size}&sort=${sorting}&jobCategory=${jobCategory}`
    );
    return res;
  } catch (error) {
    console.error('getCoffeeChat API', error);
    throw error;
  }
};

//커피챗 상세 조회
export const getCoffeeChatDetail = async (id) => {
  try {
    const res = await instance.get(`api/v1/coffeechats/${id}`);
    return res.data.data;
  } catch (error) {
    console.error('getCoffeeChatDetail API', error);
    throw error;
  }
};

//커피챗 등록
export async function registerCoffeeChat(coffeeChat) {
  try {
    const res = await instance.post('/api/v1/coffeechats', coffeeChat);
    return res.data;
  } catch (error) {
    console.error('registerCoffeeChat API error', error);
    throw error;
  }
}

//커피챗 수정
export async function updateCoffeechat(id, data) {
  try {
    const res = await instance.put(`/api/v1/coffeechats/${id}`, data);
    return res.data;
  } catch (error) {
    console.log('getMemberInfo API error', error);
    throw error;
  }
}

//커피챗 삭제
export async function deleteCoffeechat(id, data) {
  try {
    const res = await instance.delete(`/api/v1/coffeechats/${id}`, data);
    console.log('deleteCoffeechat API', res);
    return res.data;
  } catch (error) {
    console.log('deleteCoffeechat API error', error);
    throw error;
  }
}

//커피챗 신청
export async function applyCoffeechat(id, coffeeChatData) {
  try {
    const res = await instance.post(`/api/v1/coffeechats/${id}`, coffeeChatData);
    console.log('applyCoffeechat API', res);
    return res.data;
  } catch (error) {
    console.log('applyCoffeechat API error', error);
    throw error;
  }
}

// -------------------------------------------- faq

// -------------------------------------------- wantedjd
//jd 상세 조회
export const getJdDetail = async (id) => {
  try {
    const res = await instance.get(`api/v1/jds/${id}`);

    return res.data.data;
  } catch (error) {
    console.error('getJdDetail API', error);
    throw error;
  }
};
// -------------------------------------------- review

//리뷰 조회
export const getReivew = async (id, page) => {
  try {
    const res = await instance.get(`api/v1/reviews/${id}?page=${page}&size=5`);
    return res.data.data;
  } catch (error) {
    console.error('getReivew API', error);
    throw error;
  }
};

//리뷰 수정
export const addReivew = async (reviewData) => {
  try {
    const res = await instance.post('api/v1/reviews', reviewData);
    return res.data.data;
  } catch (error) {
    console.error('addReivew API', error);
    throw error;
  }
};

//리뷰 삭제
export const delReivew = async (id) => {
  try {
    const res = await instance.delete(`api/v1/reviews/${id}`);
    return res.data.data;
  } catch (error) {
    console.error('delReivew API', error);
    throw error;
  }
};
