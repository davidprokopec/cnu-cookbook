import { AddIcon } from '@chakra-ui/icons';
import {
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
import { SortableItem, SortableList } from '@thaddeusjiang/react-sortable-list';
import { useState } from 'react';
import { CustomSortableItem } from './CustomSortableItem';

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

  return (
    <>
      <Flex direction="column" mt={5}>
        {!ingredients[0] ? (
          <Text align="center" rounded="full" bg="teal.100" py={2} my={2}>
            Zatím žádné ingredience.
          </Text>
        ) : (
          <SortableList items={ingredients} setItems={setIngredients}>
            {({ items }) => (
              <>
                {items.map((item) => (
                  <SortableItem key={item.id} id={item.id}>
                    <CustomSortableItem
                      id={item.id}
                      name={item.name}
                      amount={item.amount}
                      amountUnit={item.amountUnit}
                      isGroup={item.isGroup}
                      handleRemoveIngredient={handleRemoveIngredient}
                    />
                  </SortableItem>
                ))}
              </>
            )}
          </SortableList>
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
