import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useFilterPersistence() {
  const { pathname } = useLocation();
  const [shouldPersist, setShouldPersist] = useState(false);

  useEffect(() => {
    if (pathname !== '/coffee') {
      const hasFilterValue = JSON.parse(localStorage.getItem('filters'));
      if (hasFilterValue) {
        // setSortData(hasFilterValue); // 필요에 따라 여기서 상태 업데이트
        setShouldPersist(true);
      } else {
        setShouldPersist(false);
      }
    } else {
      localStorage.removeItem('filters');
      // setSortData(defaultSortData); // 필요에 따라 여기서 상태 업데이트
      setShouldPersist(false);
    }
  }, [pathname]);

  return shouldPersist;
}

export default useFilterPersistence;
