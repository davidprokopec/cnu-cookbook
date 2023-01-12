import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { SortableItem } from './SortableItem';
import { arrayMove } from '../../util/arrayMove';

const SortableList = SortableContainer(({ items, handleRemoveIngredient }) => {
  return (
    <Box>
      {items.map((item, index) => (
        <SortableItem
          key={item.id}
          index={index}
          id={item.id}
          title={item.name}
          amount={item.amount}
          amountUnit={item.amountUnit}
          isGroup={item.isGroup}
          handleRemoveIngredient={handleRemoveIngredient}
        />
      ))}
    </Box>
  );
});

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
  const [id, setId] = useState(1);

  const handleAddIngredient = () => {
    const ingredient = {
      id,
      name: ingredientName,
      amount: ingredientAmount ? parseInt(ingredientAmount) : null,
      amountUnit: ingredientUnit ? ingredientUnit : null,
      isGroup: false,
    };
    setIngredientName('');
    setIngredientAmount('');
    setIngredientUnit('');
    setIngredients([...ingredients, ingredient]);
    setId(id + 1);
  };

  const handleAddGroup = () => {
    const group = {
      id,
      name: groupName,
      isGroup: true,
    };
    setGroupName('');
    setIngredients([...ingredients, group]);
    setId(id + 1);
  };

  const handleRemoveIngredient = (id) => {
    const newIngredients = ingredients.filter((obj) => {
      return obj.id !== id;
    });
    setIngredients(newIngredients);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setIngredients(arrayMove(ingredients, oldIndex, newIndex));
  };
  return (
    <>
      <Flex direction="column" mt={5}>
        {!ingredients[0] ? (
          <Text align="center" rounded="full" bg="teal.100" py={2} my={2}>
            Zatím žádné ingredience.
          </Text>
        ) : (
          <SortableList
            items={ingredients}
            handleRemoveIngredient={handleRemoveIngredient}
            onSortEnd={onSortEnd}
            useDragHandle
          />
        )}

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
          <Text mt={1} as="label" htmlFor="Název">
            Název
          </Text>
          <InputGroup>
            <Input
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && ingredientName) {
                  handleAddIngredient();
                }
              }}
            />
            <InputRightAddon
              p={0}
              children={
                <Button
                  disabled={!ingredientName}
                  px={10}
                  onClick={handleAddIngredient}
                >
                  <AddIcon />
                </Button>
              }
            />
          </InputGroup>
          <Text fontSize="1.25em" mt={5} mb={2}>
            Přidat skupinu
          </Text>
          <Text mt={1} as="label" htmlFor="Název">
            Název
          </Text>
          <InputGroup>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && groupName) {
                  handleAddGroup();
                }
              }}
            />
            <InputRightAddon
              p={0}
              children={
                <Button disabled={!groupName} onClick={handleAddGroup} px={10}>
                  <AddIcon />
                </Button>
              }
            />
          </InputGroup>
        </Flex>
      </Flex>
    </>
  );
};
