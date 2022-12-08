import { TimeIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { faSpoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertToHoursAndMins } from '../util/convertToHoursAndMins';

export const TimeAndSideDishes = ({ recipe }) => {
  return (
    <>
      <TimeIcon />
      <Text ml={2}>
        {recipe?.preparationTime
          ? convertToHoursAndMins(recipe?.preparationTime)
          : 'Žádné údaje'}
      </Text>
      {recipe?.sideDish ? (
        <Flex
          ml={2}
          _before={{ content: '" · "', mr: 2 }}
          direction="row"
          alignItems="center"
        >
          <FontAwesomeIcon icon={faSpoon} />
          <Text ml={2}>{recipe?.sideDish}</Text>
        </Flex>
      ) : null}
    </>
  );
};
