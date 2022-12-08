import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

export const CustomSortableItem = ({
  id,
  name,
  amount,
  amountUnit,
  isGroup,
  handleRemoveIngredient,
}) => {
  if (isGroup)
    return (
      <Flex
        w="100%"
        direction="column"
        bg="rgb(233, 236, 239)"
        p={1}
        borderTop="1px solid rgb(222, 226, 230)"
      >
        <Flex alignItems="center" mt={1}>
          <DeleteIcon justifySelf="flex-start" color="red" />
          <Flex w="100%" justifyContent="center" alignItems="center">
            <Text fontWeight="bold">{name}</Text>
          </Flex>
        </Flex>
      </Flex>
    );

  return (
    <>
      <Flex
        w="100%"
        p={1}
        direction="column"
        borderTop="1px solid rgb(222, 226, 230)"
      >
        <Flex alignItems="center" mt={1}>
          <Button
            onClick={() => {
              console.log('smazano ' + id);
              handleRemoveIngredient(id);
            }}
            zIndex={1}
          >
            <DeleteIcon justifySelf="flex-start" color="red" />
          </Button>
          <Flex w="100%" justifyContent="space-evenly">
            <Text textAlign="center" flex={2}>
              {amount} {amountUnit}
            </Text>
            <Text flex={3} overflow="hidden">
              {name}
            </Text>
          </Flex>
          <DragHandleIcon />
        </Flex>
      </Flex>
    </>
  );
};
