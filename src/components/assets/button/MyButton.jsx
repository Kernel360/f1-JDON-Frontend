import React from 'react';
import { Button } from '@mui/material';

export default function MyButton({ text, size, color, onClick }) {
  return (
    <Button variant="contained" size={size} color={color} onClick={onClick} sx={{ width: '100%' }}>
      {text}
    </Button>
  );
}
