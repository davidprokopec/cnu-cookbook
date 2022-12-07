import { Text } from '@chakra-ui/react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { useEffect, useState } from 'react';
import { api } from '../../api';

export const SideDishes = ({ sideDishes, setSideDishes }) => {
  const [sideDishesAutocomplete, setSideDishesAutocomplete] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

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
  };

  return (
    <>
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
        }}
      />
    </>
  );
};
