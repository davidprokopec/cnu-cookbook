import { Table, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react';

const Ingredient = ({ _id, name, amount, amountUnit, portions, isGroup }) => {
  if (isGroup)
    return (
      <Tr bg="rgb(233, 236, 239)" key={_id}>
        <Td></Td>
        <Td>
          <Text fontWeight="bold">{name}</Text>
        </Td>
      </Tr>
    );

  return (
    <Tr key={_id}>
      <Td>
        {typeof amount == 'number' ? amount * portions : amount} {amountUnit}
      </Td>
      <Td>{name}</Td>
    </Tr>
  );
};

export const IngredientsTable = ({ ingredients, portions }) => {
  return (
    <>
      {!ingredients?.[0] ? (
        <Text align="center" rounded="full" bg="teal.100" py={2} my={2}>
          Žádné ingredience.
        </Text>
      ) : (
        <TableContainer>
          <Table variant="simple" size="md">
            <Tbody>
              {ingredients?.map(
                ({ _id, name, amount, amountUnit, isGroup }) => (
                  <Ingredient
                    key={_id}
                    name={name}
                    amount={amount}
                    amountUnit={amountUnit}
                    isGroup={isGroup}
                    portions={portions}
                  />
                ),
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
