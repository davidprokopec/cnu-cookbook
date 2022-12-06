import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Input,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import '../style.css';
import { RecipeCard } from '../components/RecipeCard';
import { api } from '../api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const DEFAULT_STATE = {
  data: null,
  isLoading: false,
  isError: false,
};

export function RecipeListPage() {
  const [state, setState] = useState(DEFAULT_STATE);
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchData(), []);

  const onFetchSuccess = ({ data }) => {
    setState({ data, isLoading: false, isError: false });
  };

  const onFetchError = (error) => {
    setState({ data: null, isLoading: false, isError: true });
  };

  const fetchData = () => {
    setState({
      data: null,
      isLoading: true,
      isError: false,
    });
    api.get('recipes').then(onFetchSuccess).catch(onFetchError);
  };

  return (
    <>
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <Heading my={4} color="dodgerblue">
          Recepty
        </Heading>
        <Link to="/recept/novy">
          <Button colorScheme="teal" variant="outline">
            <FontAwesomeIcon icon={faPlus} />
            <Box ml={2}>Nový recept</Box>
          </Button>
        </Link>
      </Flex>

      <Input
        mb={10}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {state.isLoading && <Loading />}
      {state.isError && <Error>Nelze nacist recepty!</Error>}

      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
      >
        {state.data
          ?.filter((item) => {
            return (
              item.title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(searchTerm.toLowerCase()) || searchTerm === ''
            );
          })
          .map((r) => (
            <RecipeCard key={r._id} recipe={r} />
          ))}
      </SimpleGrid>
    </>
  );
}
