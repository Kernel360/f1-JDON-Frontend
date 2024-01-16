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
