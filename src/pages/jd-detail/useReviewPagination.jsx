import { useState, useEffect, useCallback } from 'react';
import { getReivew } from 'api/api';
import { useInView } from 'react-intersection-observer';

export const useReviewPagination = (id) => {
  const [reviewId, setReviewId] = useState('');
  const [lastPage, setLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [ref, inView] = useInView();

  const fetchReviewData = useCallback(
    async (reset = false) => {
      if (reset) {
        setReviewId('');
        setReviewData([]);
        setLastPage(false);
      }
      if (isLoading || lastPage) return;
      setIsLoading(true);

      try {
        const res = await getReivew(id, reviewId);
        setReviewData((prev) => [...prev, ...res.content]);
        if (res.content.length > 0) {
          const newReviewId = res.content[res.content.length - 1].id;
          setReviewId(newReviewId);
        }
        if (res.pageInfo.last) {
          setLastPage(true);
        }
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    },
    [id, reviewId, isLoading, lastPage]
  );

  useEffect(() => {
    if ((inView && !isLoading) || reviewId) {
      fetchReviewData();
    }
  }, [inView, reviewId, isLoading, fetchReviewData]);

  return {
    isLoading,
    reviewData,
    ref,
    fetchReviewData,
  };
};
