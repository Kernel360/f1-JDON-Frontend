import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import CompanyTitle from './CompanyTitle';
import CompanyList from './CompanyList';

function CompanySection({ loading, selectedChip, data }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading('관련된 회사 정보가 존재하지 않습니다.');
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  // --------------------------------

  return (
    <Box sx={{ mt: 8 }}>
      <CompanyTitle keyword={selectedChip.keyword} />
      <Box sx={{ width: '100%' }}>
        {data.length > 0 ? (
          <CompanyList loading={loading} data={data} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              padding: '100px 0',
            }}>
            <div
              style={{
                fontSize: '16px',
                color: '#B9B9B9',
                fontWeight: 600,
                textAlign: 'center',
              }}>
              {isLoading}
            </div>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CompanySection;
