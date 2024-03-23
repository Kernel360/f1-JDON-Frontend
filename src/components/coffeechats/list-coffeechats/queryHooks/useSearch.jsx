import { useState } from 'react';

function useSearch() {
  const prevKeyword = JSON.parse(localStorage.getItem('keyword')) || '';
  const [검색어, set검색어] = useState(prevKeyword);

  return { 검색어, set검색어 };
}

export default useSearch;
