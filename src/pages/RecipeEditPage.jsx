import { CheckIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, useToast } from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import rehypeSanitize from 'rehype-sanitize';
import { api } from '../api';
import { Portions } from '../components/inputs/Portions';
import { PreparationInput } from '../components/inputs/PreparationInput';
import { PreparationTime } from '../components/inputs/PreparationTime';
import { RecipeTitle } from '../components/inputs/RecipeTitle';
import { SideDishes } from '../components/inputs/SideDishes';
import { Error } from '../components/layout/Error';
import { Loading } from '../components/layout/Loading';
import { SortableIngredients } from '../components/sortable/SortableIngredients';

const DEFAULT_STATE = {
  isLoading: false,
  isError: false,
};

export const RecipeEditPage = () => {
  const { slug } = useParams();

  const [state, setState] = useState(DEFAULT_STATE);

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

  const [id, setId] = useState(1);

  const navigate = useNavigate();

  const toast = useToast();

  const onFetchSuccess = ({ data }) => {
    setState({ isLoading: false, isError: false });

    const sideDishObj = data.sideDish
      ? data.sideDish.split(', ').map((item) => ({
          value: item,
          label: item,
        }))
      : undefined;

    setId(data._id);
    setTitle(data.title);
    setPreparationTime(data.preparationTime);
    setPortions(data.servingCount);
    setSideDishes(sideDishObj);
    setIngredients(data.ingredients);
    setPreparation(data.directions);
  };

  const onFetchError = (error) => {
    setState({ isLoading: false, isError: true });
  };

  const fetchData = () => {
    setState({
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

  const handleSave = () => {
    let sideDish = sideDishes
      ? sideDishes
          .map((i) => {
            return ' ' + i['value'];
          })
          .toString()
      : null;

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
      .post('recipes/' + id, recipe)
      .then(({ data }) => {
        navigate('/recept/' + data.slug);
        toast({
          title: 'Recept byl ??sp????n?? ulo??en',
          position: 'top',
          status: 'success',
          duration: 5000,
        });
      })
      .catch((error) => {
        if (error.response.data.code === 11000) {
          toast({
            title: 'N??zev ji?? existuje',
            position: 'top',
            status: 'error',
            duration: 5000,
          });
        } else {
          toast({
            title: 'N??co se nepoda??ilo',
            position: 'top',
            status: 'error',
            duration: 5000,
          });
        }
      });
  };

  if (state.isLoading) return <Loading />;
  if (state.isError) return <Error>Recept nelze na????st</Error>;

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading
          fontWeight="light"
          fontSize={{ sm: '2rem', md: '3rem' }}
          color="dodgerblue"
        >
          {title ? title : 'Nov?? recept'}
        </Heading>
        <Flex gap={3}>
          <Button disabled={!title} onClick={handleSave} colorScheme="green">
            <CheckIcon mr={2} /> Ulo??it
          </Button>
          <Button
            onClick={() => {
              navigate('/recept/' + slug);
            }}
            variant="outline"
            colorScheme="red"
          >
            Zru??it
          </Button>
        </Flex>
      </Flex>
      <Flex mt={5} flexWrap="wrap" alignItems="center">
        <RecipeTitle recipeTitle={title} setRecipeTitle={setTitle} />
        <Flex direction={{ md: 'row', sm: 'column' }} w="100%">
          <Flex flex={1} direction="column">
            <Heading fontWeight="normal" fontSize="1.5rem">
              Z??kladn?? ??daje
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
            N??hled postupu
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
