import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const RadioOptionsGroup = ({ options, defaultValue, onChange, onClose }) => {
  return (
    <FormControl>
      <RadioGroup defaultValue={defaultValue} name="radio-buttons-group">
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.koValue}
            onClick={() => {
              onChange(option.value);
              onClose();
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioOptionsGroup;
