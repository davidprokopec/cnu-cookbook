import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => (
  <span>
    <DragHandleIcon _hover={{ cursor: 'pointer' }} />
  </span>
));

export const SortableItem = SortableElement(
  ({ id, title, amount, amountUnit, isGroup, handleRemoveIngredient }) => {
    if (isGroup)
      return (
        <Flex
          key={id}
          w="100%"
          direction="column"
          bg="rgb(233, 236, 239)"
          p={1}
          pb={2}
          borderTop="1px solid rgb(222, 226, 230)"
        >
          <Flex alignItems="center" mt={1}>
            <DeleteIcon
              _hover={{ cursor: 'pointer' }}
              onClick={() => {
                console.log('smazano ' + id);
                handleRemoveIngredient(id);
              }}
              justifySelf="flex-start"
              color="red"
            />
            <Flex w="100%" justifyContent="center" alignItems="center">
              <Text fontWeight="bold">{title}</Text>
            </Flex>
            <DragHandle />
          </Flex>
        </Flex>
      );

    return (
      <>
        <Flex
          key={id}
          w="100%"
          p={1}
          pb={2}
          direction="column"
          borderTop="1px solid rgb(222, 226, 230)"
        >
          <Flex alignItems="center" mt={1}>
            <DeleteIcon
              _hover={{ cursor: 'pointer' }}
              justifySelf="flex-start"
              color="red"
              onClick={() => {
                console.log('smazano ' + id);
                handleRemoveIngredient(id);
              }}
            />

            <Flex w="100%" justifyContent="space-evenly">
              <Text textAlign="center" flex={2}>
                {amount} {amountUnit}
              </Text>
              <Text flex={3} overflow="hidden">
                {title}
              </Text>
            </Flex>
            <DragHandle />
          </Flex>
        </Flex>
      </>
    );
  },
);
