// import { useState, useEffect } from "react";

// export function useInfiniteScroll(fetchData) {
//   const [reviewData, setReviewData] = useState({ content: [], pageInfo: {} });
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);

//   const handleScroll = () => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop ===
//       document.documentElement.offsetHeight
//     ) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchDataAndAppend = async () => {
//       setLoading(true);
//       const newReviewData = await fetchData(page);
//       setReviewData((prevData) => ({
//         content: [...prevData.content, ...newReviewData.content],
//         pageInfo: newReviewData.pageInfo,
//       }));
//       setLoading(false);
//     };

//     fetchDataAndAppend();
//   }, [page]);

//   return { loading };
// }
