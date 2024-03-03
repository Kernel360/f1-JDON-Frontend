import { Box, Grid, Typography } from '@mui/material';
import CompanyCard from '../../components/common/card/CompanyCard';
import { MainStyles } from '../PageStyles';
import { useEffect, useState } from 'react';

function CompanySection({ selectedChip, data }) {
  // 추후 스켈레톤 UI 반영 시 지울 내용입니다.
  const [foundTxt, setFoundTxt] = useState('회사 정보 불러오는 중..');

  useEffect(() => {
    const timer = setTimeout(() => {
      setFoundTxt('관련된 회사 정보가 존재하지 않습니다.');
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  // --------------------------------
  return (
    <Box sx={{ mt: 8 }}>
      <Typography sx={MainStyles.JDTypoGraphy}>
        {/* Typography 내부에 span 사용시 불필요한 중괄호 제거 */}
        <p>
          <span
            style={{
              color: 'black',
              fontWeight: 700,
              marginRight: 7,
              fontSize: '18px',
            }}
          >
            {selectedChip.keyword}
          </span>
          에 관심있는 회사에요!
        </p>
      </Typography>
      <Box sx={{ width: '100%' }}>
        {data.length > 0 ? (
          <Grid container spacing={{ xs: 1, sm: 2, md: 2 }} sx={{ py: 1 }}>
            {data.map((item, index) => (
              <Grid item xs={6} sm={4} md={4} key={index}>
                <CompanyCard data={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              padding: '100px 0',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                color: '#B9B9B9',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              {foundTxt}
            </div>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CompanySection;
