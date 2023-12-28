import React from "react";
import {
  Box,
  Avatar,
  Chip,
  Container,
  Grid,
  IconButton,
  Stack,
  Tab,
  Typography,
} from "@mui/material";

export default function MyPage() {
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Avatar alt="user profile" src=""></Avatar>
      </Stack>
      <Box>
        <Typography variant="h6">지렁이</Typography>
      </Box>
    </div>
  );
}
