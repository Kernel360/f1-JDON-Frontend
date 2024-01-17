const apiUrl = "http://43.201.221.251:1221"; // API의 기본 URL

export async function getHotSkills() {
  const response = await fetch(`http://43.201.221.251:1221/api/v1/skills/hot`);
  if (!response.ok) throw new Error("리뷰를 불러오는데 실패하였습니다");
  console.log(122);

  return await response.json();
}

// export async function createReview(formData) {
//   //throw new Error("버그가 아니라 기능입니다");
//   // return 필수로 존재해야 한다 !! 없으면 데이터 못불러옴
//   const response = await fetch(`https://learn.codeit.kr/0627/film-reviews`, {
//     method: "POST",
//     body: formData,
//   });

//   if (!response.ok) throw new Error("리뷰를 생성하는데 실패하였습니다");

//   return await response.json(); //비동기 작업이므로
// }

export const getFaq = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/faqs`);
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getFavoritVideo = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/favorites?page=0&size=10`);
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
