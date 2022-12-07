import {
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';

export const PreparationTime = ({ preparationTime, setPreparationTime }) => {
  return (
    <>
      <Text as="label" htmlFor="Doba přípravy" mt={5} mb={2}>
        Doba přípravy
      </Text>
      <InputGroup>
        <NumberInput
          min={1}
          value={preparationTime}
          onChange={(v) => {
            setPreparationTime(v);
          }}
          precision={0}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <InputRightAddon children="min" />
      </InputGroup>
    </>
  );
};
