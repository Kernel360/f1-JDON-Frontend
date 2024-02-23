import { Box, Grid } from '@mui/material'
import React from 'react'
import { SAMPLE_DATA } from './mock'
import CompanyCard from '../../components/common/card/CompanyCard'

function JDComponent() {
  return (
    <Box sx={{ width: "100%", my: 4 }}>
        {SAMPLE_DATA.length > 0 ? (
          <Grid container spacing={{ xs: 1, sm: 2, md: 2 }}>
            {SAMPLE_DATA.map((item, index) => (
              <Grid item xs={6} sm={4} md={4} key={index}>
                <CompanyCard data={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              padding: "100px 0",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                color: "#B9B9B9",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              회사 데이터가 존재하지 않습니다
            </div>
          </Box>
        )}
      </Box>
  )
}

export default JDComponent
