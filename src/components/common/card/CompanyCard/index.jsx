import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CompanyCardStyle } from '../CardStyle';

export default function CompanyCard({ data }) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/jds/${data.id}`);
  };
  return (
    <Paper elevation={0} sx={{ my: 1 }} onClick={handleCardClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={data.imageUrl}
          sx={{ height: 180, borderRadius: '5px' }}
        />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body3" component="div" color="#9A9AA1" sx={CompanyCardStyle.Name}>
            {data.company}
          </Typography>
          <Typography color="#545459" fontSize="14px" fontWeight="500">
            {data.title}
          </Typography>
        </Box>
      </CardActionArea>
    </Paper>
  );
}
