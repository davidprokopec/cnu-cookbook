import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputLeftAddon,
  InputGroup,
} from '@chakra-ui/react';
import { useState } from 'react';

export const PortionCount = ({ onInputChange }) => {
  const [count, setCount] = useState('4');

  const handleChange = (valueString) => {
    setCount(valueString);
    onInputChange(valueString);
  };

  return (
    <>
      <InputGroup>
        <InputLeftAddon children="Počet porcí" />
        <NumberInput value={count} min={1} max={20} onChange={handleChange}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </InputGroup>
    </>
  );
};
