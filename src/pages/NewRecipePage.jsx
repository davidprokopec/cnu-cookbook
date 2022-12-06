import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
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
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { useEffect, useState } from 'react';
import { api } from '../api';

export const NewRecipePage = () => {
  const [title, setTitle] = useState('');
  const [preparationTime, setPreparationTime] = useState();
  const [portions, setPortions] = useState();

  const [sideDishes, setSideDishes] = useState([]);
  const [sideDishesAutocomplete, setSideDishesAutocomplete] = useState([]);

  const [ingredients, setIngredients] = useState([]);
  const [ingredientsAutocomplete, setIngredientsAutocomplete] = useState([]);

  const fetchData = () => {
    api
      .get('recipes/side-dishes')
      .then(({ data }) => {
        const arrayOfObjects = data.map((item) => ({
          value: item,
          label: item,
        }));

        setSideDishesAutocomplete(arrayOfObjects);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get('recipes/ingredients')
      .then(({ data }) => {
        const arrayOfObjects = data.map((item) => ({
          value: item,
          label: item,
        }));

        setIngredientsAutocomplete(arrayOfObjects);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => setTitle(e.target.value);

  const isError = title === '';

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading
          fontWeight="light"
          fontSize={{ sm: '2rem', md: '3rem' }}
          color="dodgerblue"
        >
          Nový recept
        </Heading>
        <Flex gap={3}>
          <Button>ulozit</Button>
          <Button>zrusit</Button>
        </Flex>
      </Flex>
      <Flex mt={5} flexWrap="wrap" alignItems="center">
        <FormControl isInvalid={isError} mb={5}>
          <Input
            type="email"
            value={title}
            onChange={handleInputChange}
            placeholder="Název receptu"
          />
          {isError ? (
            <FormErrorMessage>Musíte zadat název!</FormErrorMessage>
          ) : null}
        </FormControl>
        <Flex direction={{ sm: 'column', md: 'row' }} w="100%">
          <Flex flex={1} direction="column">
            <Heading fontWeight="normal" fontSize="1.5rem">
              Základní údaje
            </Heading>
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
            <Text as="label" htmlFor="Příloha" mt={5} mb={2}>
              Příloha
            </Text>
            <CUIAutoComplete
              onCreateItem={(item) => {
                setSideDishes([...sideDishes, item]);
              }}
              items={sideDishesAutocomplete}
              selectedItems={sideDishes}
              onSelectedItemsChange={(changes) => {
                setSideDishes(changes.selectedItems);
                console.log(sideDishes);
              }}
            />
          </Flex>
          <Flex flex={1}>
            <Heading fontWeight="normal" fontSize="1.5rem">
              Základní údaje
            </Heading>
          </Flex>
          <Flex flex={2}>
            <Heading fontWeight="normal" fontSize="1.5rem">
              Základní údaje
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
