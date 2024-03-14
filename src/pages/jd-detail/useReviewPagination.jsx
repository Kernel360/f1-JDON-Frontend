import { useState, useEffect, useCallback } from 'react';
import { getReivew } from 'api/api';
import { useInView } from 'react-intersection-observer';

export const useReviewPagination = (id) => {
  const [reviewId, setReviewId] = useState('');
  const [reviewData, setReviewData] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [ref, inView] = useInView();

  const fetchReviewData = useCallback(
    async (reset = false) => {
      if (reset) {
        setReviewId('');
        setReviewData([]);
        setIsLastPage(false);
      }
      if (isLastPage) return;
      try {
        const res = await getReivew(id, reviewId);
        setReviewData((prev) => [...prev, ...res.content] || []);
        if (!res.pageInfo.empty) {
          const newReviewId = res.content[res.content.length - 1].id;
          setReviewId(newReviewId);
        }
        if (res.pageInfo.last) {
          setIsLastPage(true);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [id, reviewId, isLastPage],
  );

  useEffect(() => {
    if (inView) {
      fetchReviewData();
    }
  }, [inView, reviewId, fetchReviewData]);

  return {
    reviewData,
    ref,
    fetchReviewData,
  };
};
