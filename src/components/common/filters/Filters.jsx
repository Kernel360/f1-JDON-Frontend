import {
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";

export function Filters() {
  const [openFilter, setOpenFilter] = useState(false);
  const handleClose = () => setOpenFilter(false);

  const handleChipClick = () => {
    setOpenFilter(!openFilter);
  };
  return (
    <>
      <Box>
        <Chip
          label="최신순"
          clickable={true}
          variant="outlined"
          onClick={handleChipClick}
        ></Chip>

        <Chip label="직무" clickable={true} variant="outlined" />
        {openFilter && (
          <Modal open={openFilter} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
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
        )}
      </Box>
    </>
  );
}
