import { useState, useEffect } from "react";
import { getReivew } from "../../api/api";
import { useInView } from "react-intersection-observer";

export const useReviewPagination = (id) => {
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [ref, inView] = useInView();

  const fetchReviewData = async (reset = false) => {
    if (reset) {
      setPage(0);
      setReviewData([]);
      setLastPage(false);
    }
    if (isLoading || lastPage) return;
    setIsLoading(true);

    try {
      const res = await getReivew(id, page);
      setReviewData((prev) => [...prev, ...res.content]);
      setPage((prev) => prev + 1);
      if (res.content.length === 0 || res.pageInfo.last) {
        setLastPage(true);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (inView && !isLoading) {
      fetchReviewData();
    }
  }, [inView, page, isLoading]);

  return {
    isLoading,
    reviewData,
    ref,
    fetchReviewData,
  };
};
