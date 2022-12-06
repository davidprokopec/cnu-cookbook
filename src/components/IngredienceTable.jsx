import { Table, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react';

export const IngredienceTable = ({ recipe, porce }) => {
  return (
    <>
      {!recipe.data?.ingredients[0] ? (
        <Text align="center" rounded="full" bg="teal.100" py={2} my={2}>
          Žádné ingredience.
        </Text>
      ) : (
        <TableContainer>
          <Table variant="simple" size="md">
            <Tbody>
              {recipe.data?.ingredients?.map((i) => (
                <Tr key={i._id}>
                  <Td>
                    {typeof i.amount == 'number' ? i.amount * porce : i.amount}{' '}
                    {i.amountUnit}
                  </Td>
                  <Td>{i.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
