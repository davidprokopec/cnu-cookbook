import {
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';
import { TimeIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import '../style.css';
import { convertToHoursAndMins } from '../util/convertToHoursAndMins';
import moment from 'moment';
import 'moment/locale/cs';
import DeleteRecipeDialog from '../components/DeleteRecipeDialog';

const DEFAULT_STATE = {
  data: null,
  isLoading: false,
  isError: false,
};

export const RecipeEditPage = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(DEFAULT_STATE);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  console.log('recept', recipe);

  if (recipe.isLoading) return <Loading />;
  if (recipe.isError) return <Error>Recept nelze načíst</Error>;

  return (
    <>
      <Box p={5}>
        <Flex flexWrap="wrap" alignItems="center">
          <Heading flex="1" pb={5}>
            {recipe.data?.title}
          </Heading>
          <Flex mb={3}>
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
              ml={5}
              onClick={onOpen}
            >
              Smazat
            </Button>
          </Flex>
        </Flex>
        <Flex direction={{ sm: 'column', md: 'row' }}>
          <Flex flex="1" direction="column" mr={5}>
            <Flex alignItems="center" mb={2}>
              <TimeIcon />
              <Text ml={2}>
                {convertToHoursAndMins(recipe.data?.preparationTime)}
              </Text>
            </Flex>
            <hr
              style={{
                backgroundColor: 'grey',
                height: 0.05,
              }}
            />
            <TableContainer>
              <Table variant="simple" size="md">
                <Tbody>
                  {recipe.data?.ingredients?.map((i) => (
                    <Tr>
                      <Td>
                        {i.amount} {i.amountUnit}
                      </Td>
                      <Td>{i.name}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          <Flex flex="2" direction="column">
            <Box ml={5}>
              <ReactMarkdown>{recipe.data?.directions}</ReactMarkdown>
            </Box>
          </Flex>
        </Flex>
        <Text color="grey" pt={5}>
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
