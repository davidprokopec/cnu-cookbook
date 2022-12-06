import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import '../style.css';
import moment from 'moment';
import 'moment/locale/cs';
import DeleteRecipeDialog from '../components/DeleteRecipeDialog';
import { PortionCount } from '../components/PortionCount';
import { IngredienceTable } from '../components/IngredienceTable';
import { TimeAndSideDishes } from '../components/TimeAndSideDishes';

const DEFAULT_STATE = {
  data: null,
  isLoading: false,
  isError: false,
};

export const RecipeDetailPage = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(DEFAULT_STATE);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [portions, setPortions] = useState('4');

  const onFetchSuccess = ({ data }) => {
    setRecipe({ data, isLoading: false, isError: false });
  };

  const onFetchError = (error) => {
    setRecipe({ data: null, isLoading: false, isError: true });
  };

  const fetchData = () => {
    setRecipe({
      data: null,
      isLoading: true,
      isError: false,
    });

    api
      .get('recipes/' + slug)
      .then(onFetchSuccess)
      .catch(onFetchError);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchData(), []);

  if (recipe.isLoading) return <Loading />;
  if (recipe.isError) return <Error>Recept nelze načíst</Error>;

  console.log('recipe', recipe);

  return (
    <>
      <Box p={5}>
        <Flex flexWrap="wrap" alignItems="center">
          <Heading flex="1" mb={2} color="dodgerblue">
            {recipe.data?.title}
          </Heading>
          <Flex mb={3} gap={3}>
            <Link to="upravit">
              <Button
                leftIcon={<EditIcon />}
                colorScheme="teal"
                variant="outline"
              >
                Upravit
              </Button>
            </Link>
            <Button
              leftIcon={<DeleteIcon />}
              colorScheme="red"
              onClick={onOpen}
            >
              Smazat
            </Button>
          </Flex>
        </Flex>
        <Flex alignItems="center" mb={2}>
          <TimeAndSideDishes recipe={recipe.data} />
        </Flex>
        <Flex direction={{ sm: 'column', md: 'row' }}>
          <Flex flex="1" direction="column" mr={5}>
            {recipe.data?.servingCount && recipe.data?.ingredients[0] ? (
              <Box mb={4}>
                <PortionCount onInputChange={setPortions} />
              </Box>
            ) : null}
            <hr
              style={{
                backgroundColor: 'grey',
                height: 0.05,
              }}
            />
            <IngredienceTable recipe={recipe} porce={portions} />
          </Flex>
          <Flex flex="2" direction="column">
            <Box ml={5}>
              {!recipe.data?.directions ? (
                <Text align="center" rounded="full" bg="teal.100" py={2} my={2}>
                  Žádný postup
                </Text>
              ) : (
                <ReactMarkdown>{recipe.data?.directions}</ReactMarkdown>
              )}
            </Box>
          </Flex>
        </Flex>
        <Text color="grey" mt={5}>
          Naposledy upraveno:{' '}
        </Text>
        <Text>
          {moment(new Date(recipe.data?.lastModifiedDate)).format('LLL')}
        </Text>
      </Box>
      <DeleteRecipeDialog
        isOpen={isOpen}
        onClose={onClose}
        recipe={recipe.data}
      />
    </>
  );
};
