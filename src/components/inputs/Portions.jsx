import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';

export const Portions = ({ portions, setPortions }) => {
  return (
    <>
      <Text as="label" htmlFor="Počet porcí" mt={5} mb={2}>
        Počet porcí
      </Text>
      <NumberInput
        min={1}
        value={portions}
        onChange={(v) => {
          setPortions(v);
        }}
        precision={0}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );
};
