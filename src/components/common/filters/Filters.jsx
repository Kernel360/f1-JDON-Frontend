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
import Arrow from "../../../assets/icons/chip_arrow.svg";

export function Filters({ sortData, onChange, kindOfJd }) {
  const [openFilter, setOpenFilter] = useState([false, false]);

  const handleClose = () => setOpenFilter(openFilter.map(() => false));

  const handleChipClick = (value) => {
    setOpenFilter(openFilter.map((val, i) => (i === value ? !val : val)));
  };

  const getValueForRadioGroup = (jobCategory) => {
    switch (jobCategory) {
      case 2:
        return kindOfJd[0].name;
      case 3:
        return kindOfJd[1].name;
      default:
        return ""; // 기본값은 빈 문자열
    }
  };
  const radioValue = getValueForRadioGroup(sortData.jobCategory);

  return (
    <>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Chip
          label={sortData.sorting === "createdDate" ? "최신순" : "조회순"}
          clickable
          variant="outlined"
          onClick={() => handleChipClick(0)}
          onDelete={() => handleChipClick(0)}
          sx={{
            display: "flex",
            color: sortData.sorting !== "createdDate" ? "#6482FF" : "#6E6E71",
            background: sortData.sorting !== "createdDate" && "#E2E7FF",
            borderColor: sortData.sorting !== "createdDate" && "#6482FF",
            fontWeight: sortData.sorting !== "createdDate" && 700,
          }}
          deleteIcon={<img src={Arrow} alt="드롭다운" />}
        ></Chip>

        <Chip
          label={sortData.jobCategory ? radioValue : "전체 직무"}
          clickable={true}
          variant="outlined"
          onClick={() => handleChipClick(1)}
          onDelete={() => handleChipClick(1)}
          sx={{
            display: "flex",
            color: sortData.jobCategory ? "#6482FF" : "#6E6E71",
            background: sortData.jobCategory && "#E2E7FF",
            borderColor: sortData.jobCategory && "#6482FF",
            fontWeight: sortData.jobCategory && 700,
          }}
          deleteIcon={<img src={Arrow} alt="드롭다운" />}
        />

        <Modal open={openFilter[0]} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "92%",
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 8,
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={
                  sortData.sorting === "createdDate" ? "최신순" : "조회순"
                }
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="최신순"
                  control={<Radio />}
                  label="최신순"
                  onClick={() => {
                    onChange((prev) => ({ ...prev, sorting: "createdDate" }));
                  }}
                />
                <FormControlLabel
                  value="조회순"
                  control={<Radio />}
                  label="조회순"
                  onClick={() => {
                    onChange((prev) => ({ ...prev, sorting: "viewCount" }));
                  }}
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
              width: "92%",
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 8,
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                defaultValue={radioValue}
              >
                <FormControlLabel
                  value={""}
                  control={<Radio />}
                  label="전체"
                  onClick={() => {
                    onChange((prev) => ({ ...prev, jobCategory: "" }));
                  }}
                />
                {kindOfJd?.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    value={item.name}
                    control={<Radio />}
                    label={item.name}
                    onClick={() => {
                      onChange((prev) => ({ ...prev, jobCategory: item.id }));
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Modal>
      </Box>
    </>
  );
}
