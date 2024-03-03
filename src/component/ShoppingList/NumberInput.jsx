import * as React from 'react';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { StyledInputRoot, StyledInput, StyledButton } from './NumberInputStyle';

const NumberInput = ({val,handleChange}) => (
  <BaseNumberInput
    slots={{
      root: StyledInputRoot,
      input: StyledInput,
      incrementButton: StyledButton,
      decrementButton: StyledButton,
    }}
    slotProps={{
      incrementButton: {
        children: <AddIcon fontSize="small" />,
        className: 'increment',
      },
      decrementButton: {
        children: <RemoveIcon fontSize="small" />,
      },
    }}
    min={0}
    value={val}
    onChange={(event, val) => {
      handleChange(val)
    }}
  />
);

export default NumberInput;