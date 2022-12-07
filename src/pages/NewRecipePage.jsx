import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Portions } from '../components/inputs/Portions';
import { PreparationTime } from '../components/inputs/PreparationTime';
import { SideDishes } from '../components/inputs/SideDishes';
import { SortableIngredients } from '../components/SortableIngredients';

export const NewRecipePage = () => {
  const [title, setTitle] = useState('');
  const [preparationTime, setPreparationTime] = useState();
  const [portions, setPortions] = useState();

  const [sideDishes, setSideDishes] = useState([]);

  const [ingredients, setIngredients] = useState([]);
  const [ingredientsAutocomplete, setIngredientsAutocomplete] = useState([]);

  const handleInputChange = (e) => setTitle(e.target.value);

  useEffect(() => console.log(sideDishes), [sideDishes]);

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
            <PreparationTime
              preparationTime={preparationTime}
              setPreparationTime={setPreparationTime}
            />
            <Portions portions={portions} setPortions={setPortions} />
            <SideDishes sideDishes={sideDishes} setSideDishes={setSideDishes} />
          </Flex>
          <Flex flex={1}>
            <Heading fontWeight="normal" fontSize="1.5rem">
              Ingredience
            </Heading>
            <SortableIngredients ingredients={{}} />
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
