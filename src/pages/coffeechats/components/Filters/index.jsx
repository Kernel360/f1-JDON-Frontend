import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import FilterChips from "./FilterChips";
import CommonModal from "components/common/modal/CommonModal";

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
        return "";
    }
  };
  const radioValue = getValueForRadioGroup(sortData.jobCategory);
  const sortingValues = [
    { value: "createdDate", koValue: "최신순" },
    { value: "viewCount", koValue: "조회순" },
  ];

  return (
    <>
      <Box sx={{ display: "flex", gap: 1 }}>
        <FilterChips
          label={sortData.sorting === "createdDate" ? "최신순" : "조회순"}
          onClick={() => handleChipClick(0)}
          onDelete={() => handleChipClick(0)}
          selected={sortData.sorting !== "createdDate"}
        />
        <FilterChips
          label={sortData.jobCategory ? radioValue : "전체 직무"}
          onClick={() => handleChipClick(1)}
          onDelete={() => handleChipClick(1)}
          selected={sortData.jobCategory}
        />

        <CommonModal open={openFilter[0]} onClose={handleClose}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={
                sortData.sorting === "createdDate" ? "최신순" : "조회순"
              }
              name="radio-buttons-group"
            >
              {sortingValues.map((item) => (
                <FormControlLabel
                  value={item.koValue}
                  control={<Radio />}
                  label={item.koValue}
                  onClick={() => {
                    onChange((prev) => ({ ...prev, sorting: item.value }));
                    handleClose();
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CommonModal>
        <CommonModal open={openFilter[1]} onClose={handleClose}>
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
                  handleClose();
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
                    handleClose();
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CommonModal>
      </Box>
    </>
  );
}
