import axios from "axios";

const instance = axios.create({
  baseURL: `/api`, // 베이스 URL
  timeout: 5000, // 요청 시간 초과 설정
  headers: {
    "Content-Type": "application/json",
    // 기타 필요한 헤더 설정(JWT토큰)
  },
});

// //-------------------------------------------- skill

export async function getHotSkills() {
  try {
    const res = await instance.get("/v1/skills/hot");

    console.log("getHotSkills API", res);
    return res.data;
  } catch (error) {
    console.error("getHotSkills API error", error);
    throw error;
  }
}
// // export async function createReview(formData) {
// //   //throw new Error("버그가 아니라 기능입니다");
// //   // return 필수로 존재해야 한다 !! 없으면 데이터 못불러옴
// //   const response = await fetch(`https://learn.codeit.kr/0627/film-reviews`, {
// //     method: "POST",
// //     body: formData,
// //   });

// //   if (!response.ok) throw new Error("리뷰를 생성하는데 실패하였습니다");

// //   return await response.json(); //비동기 작업이므로
// // }

// // export const getFaq = async () => {
// //   try {
// //     const response = await fetch(`${apiUrl}/api/v1/faqs`);
// //     if (!response.ok) {
// //       throw new Error(`API 요청 실패: ${response.status}`);
// //     }

// //     const data = await response.json();
// //     return data;
// //   } catch (error) {
// //     console.error(error);
// //     throw error;
// //   }
// // };

export const getFavoritVideo = async () => {
  try {
    const res = await instance.get("/v1/favorites?page=0&size=12");
    return res.data;
  } catch (error) {
    console.error("getFavoritVideo API", error);
    throw error;
  }
};
