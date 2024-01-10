import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import Arrow from "../../../assets/icons/chip_arrow.svg";

export function Filters() {
  const [openFilter, setOpenFilter] = useState([false, false]);
  const handleClose = () => setOpenFilter(openFilter.map(() => false));

  const handleChipClick = (value) => {
    setOpenFilter(openFilter.map((val, i) => (i === value ? !val : val)));
    console.log(openFilter[value]);
  };

  const handleDelete = () => {
    console.log("Icon clicked");
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Chip
          label="최신순"
          clickable
          variant="outlined"
          onClick={() => handleChipClick(0)}
          onDelete={handleDelete}
          sx={{
            display: "flex",
            width: "75px",
            color: "#6E6E71",
            borderColor: "#",
          }}
          deleteIcon={<img src={Arrow} alt="드롭다운" />}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button>중복확인</Button>
              </InputAdornment>
            ),
          }}
        ></Chip>

        <Chip
          label="직무"
          clickable={true}
          variant="outlined"
          onClick={() => handleChipClick(1)}
          onDelete={handleDelete}
          sx={{ display: "flex", width: "70px", color: "#6E6E71" }}
          deleteIcon={<img src={Arrow} alt="드롭다운" />}
        />

        <Modal open={openFilter[0]} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 10,
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="최신순"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="최신순"
                  control={<Radio />}
                  label="최신순"
                />
                <FormControlLabel
                  value="조회순"
                  control={<Radio />}
                  label="조회순"
                />
                <FormControlLabel
                  value="인기 높은 순"
                  control={<Radio />}
                  label="인기 높은 순"
                />
                <FormControlLabel
                  value="인기 낮은 순"
                  control={<Radio />}
                  label="인기 낮은 순"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Modal>
        <Modal open={openFilter[1]} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 338,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 10,
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="frontend"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="frontend"
                  control={<Radio />}
                  label="frontend"
                />
                <FormControlLabel
                  value="backend"
                  control={<Radio />}
                  label="backend"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Modal>
      </Box>
    </>
  );
}
