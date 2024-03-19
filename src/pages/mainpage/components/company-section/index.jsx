import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import CompanyTitle from './CompanyTitle';
import CompanyList from './CompanyList';
import DataNone from '../DataNone';

function CompanySection({ loading, selectedChip, data }) {
  const [isDataNone, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Box sx={{ mt: 8 }}>
      <CompanyTitle keyword={selectedChip.keyword} />
      <Box sx={{ width: '100%' }}>
        {data.length > 0 ? (
          <CompanyList loading={loading} data={data} />
        ) : (
          <DataNone>{isDataNone && '관련된 회사 정보가 존재하지 않습니다.'}</DataNone>
        )}
      </Box>
    </Box>
  );
}

export default CompanySection;
