import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

const RadioOptionsGroup = ({ options, defaultValue, title, onChange, onClose }) => {
	return (
    <FormControl>
      <RadioGroup defaultValue={defaultValue} >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
			label={option.label}
			onClick={() =>
				{
					onChange(title, option.value)
					onClose();
				}
			}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioOptionsGroup;
