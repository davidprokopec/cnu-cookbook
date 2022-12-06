import { Card, CardFooter, Image, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { createColor } from '../util/createColor';
import { TimeAndSideDishes } from './TimeAndSideDishes';

export const RecipeCard = ({ recipe }) => {
  return (
    <>
      <Link to={'recept/' + recipe.slug}>
        <Card
          _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
          transition={'0.3s'}
        >
          <Image src="/images/food-placeholder.png" />
          <CardFooter bg={createColor('#ff0000', recipe.preparationTime)}>
            <Flex flexDirection="column">
              <Text>{recipe.title}</Text>
              <Flex mt={1} alignItems="center">
                <TimeAndSideDishes recipe={recipe} />
              </Flex>
            </Flex>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};
