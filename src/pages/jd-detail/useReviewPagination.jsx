import { useState, useEffect } from 'react';
import { getReivew } from '../../api/api';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/atoms';
import { useNavigate } from 'react-router-dom';

export const useReviewPagination = (id) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [ref, inView] = useInView();
  const isLogin = useRecoilValue(isLoggedInState).isLoginUser;

  const fetchReviewData = async (reset = false) => {
    if (!isLogin) {
      promptLogin();
      return;
    }
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

  const promptLogin = () => {
    const confirmResult = window.confirm('리뷰는 로그인 후 조회할 수 있습니다. 로그인 하시겠습니까?');
    if (confirmResult) {
      navigate('/signin');
    }
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
