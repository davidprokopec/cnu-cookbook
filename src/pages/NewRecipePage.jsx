import { CheckIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, useToast } from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rehypeSanitize from 'rehype-sanitize';
import { api } from '../api';
import { Portions } from '../components/inputs/Portions';
import { PreparationInput } from '../components/inputs/PreparationInput';
import { PreparationTime } from '../components/inputs/PreparationTime';
import { RecipeTitle } from '../components/inputs/RecipeTitle';
import { SideDishes } from '../components/inputs/SideDishes';
import { SortableIngredients } from '../components/sortable/SortableIngredients';

export const NewRecipePage = () => {
  const [title, setTitle] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [portions, setPortions] = useState('');

  const [sideDishes, setSideDishes] = useState([]);

  const [ingredients, setIngredients] = useState([]);

  const [ingredientAmount, setIngredientAmount] = useState('');
  const [ingredientUnit, setIngredientUnit] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [groupName, setGroupName] = useState('');

  const [preparation, setPreparation] = useState('');

  const navigate = useNavigate();

  const toast = useToast();

  const handleSave = () => {
    let sideDish = sideDishes
      .map((i) => {
        return ' ' + i['value'];
      })
      .toString();

    const recipe = {
      title,
      preparationTime,
      servingCount: portions,
      sideDish,
      directions: preparation,
      isMarkdown: true,
      ingredients,
    };

    api
      .post('recipes/', recipe)
      .then(({ data }) => {
        navigate('/recept/' + data.slug);
        toast({
          title: 'Recept byl úspěšně uložen',
          position: 'top',
          status: 'success',
          duration: 5000,
        });
      })
      .catch((error) => {
        if (error.response.data.code === 11000) {
          toast({
            title: 'Název již existuje',
            position: 'top',
            status: 'error',
            duration: 5000,
          });
        } else {
          toast({
            title: 'Něco se nepodařilo',
            position: 'top',
            status: 'error',
            duration: 5000,
          });
        }
      });
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading
          fontWeight="light"
          fontSize={{ sm: '2rem', md: '3rem' }}
          color="dodgerblue"
        >
          {title ? title : 'Nový recept'}
        </Heading>
        <Flex gap={3}>
          <Button disabled={!title} onClick={handleSave} colorScheme="green">
            <CheckIcon mr={2} /> Uložit
          </Button>
          <Button
            onClick={() => {
              navigate('/');
            }}
            variant="outline"
            colorScheme="red"
          >
            Zrušit
          </Button>
        </Flex>
      </Flex>
      <Flex mt={5} flexWrap="wrap" alignItems="center">
        <RecipeTitle recipeTitle={title} setRecipeTitle={setTitle} />
        <Flex direction={{ md: 'row', sm: 'column' }} w="100%">
          <Flex flex={1} direction="column">
            <Heading fontWeight="normal" fontSize="1.5rem">
              Základní údaje
            </Heading>
            <PreparationTime
              preparationTime={preparationTime}
              setPreparationTime={setPreparationTime}
            />
            <Portions portions={portions} setPortions={setPortions} />
            <SideDishes sideDishes={sideDishes} setSideDishes={setSideDishes} />
          </Flex>
          <Flex flex={1} direction="column" mx={5}>
            <Heading fontWeight="normal" fontSize="1.5rem">
              Ingredience
            </Heading>
            <SortableIngredients
              ingredients={ingredients}
              setIngredients={setIngredients}
              ingredientName={ingredientName}
              setIngredientName={setIngredientName}
              ingredientAmount={ingredientAmount}
              setIngredientAmount={setIngredientAmount}
              ingredientUnit={ingredientUnit}
              setIngredientUnit={setIngredientUnit}
              groupName={groupName}
              setGroupName={setGroupName}
            />
          </Flex>
          <Flex flex={2} direction="column">
            <Heading fontWeight="normal" fontSize="1.5rem">
              Postup
            </Heading>
            <PreparationInput
              preparation={preparation}
              setPreparation={setPreparation}
            />
          </Flex>
        </Flex>
        <Flex direction="column">
          <Heading fontWeight="normal" fontSize="1.5rem">
            Náhled postupu
          </Heading>
          <MDEditor.Markdown
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
            source={preparation}
          />
        </Flex>
      </Flex>
    </>
  );
};
