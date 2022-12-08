import {
  Flex,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { SortableList } from '@thaddeusjiang/react-sortable-list';
import { SortableItem } from './SortableItem';

export const SortableIngredients = ({
  ingredients,
  setIngredients,
  ingredientName,
  setIngredientName,
  ingredientAmount,
  setIngredientAmount,
  ingredientUnit,
  setIngredientUnit,
  groupName,
  setGroupName,
}) => {
  return (
    <>
      <Flex direction="column" mt={5}>
        <SortableList
          items={ingredients}
          setItems={setIngredients}
          itemRender={({ item }) => (
            <SortableItem
              name={item.name}
              amount={item.amount}
              amountUnit={item.amountUnit}
              isGroup={item.isGroup}
            />
          )}
        />
        <Flex direction="column">
          <Text fontSize="1.25em" mt={5} mb={2}>
            Přidat ingredienci
          </Text>
          <Flex direction="row">
            <Flex direction="column" mr="auto">
              <Text as="label" htmlFor="Množství">
                Množství
              </Text>
              <NumberInput
                min={0}
                value={ingredientAmount}
                onChange={(v) => {
                  setIngredientAmount(v);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Flex direction="column">
              <Text as="label" htmlFor="Jednotka">
                Jednotka
              </Text>
              <Input
                value={ingredientUnit}
                onChange={(e) => setIngredientUnit(e.target.value)}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
