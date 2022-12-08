import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';

export const RecipeTitle = ({ recipeTitle, setRecipeTitle }) => {
  const isError = recipeTitle === '';

  return (
    <>
      <FormControl isInvalid={isError} mb={5}>
        <Input
          type="email"
          value={recipeTitle}
          onChange={(e) => setRecipeTitle(e.target.value)}
          placeholder="Název receptu"
        />
        {isError ? (
          <FormErrorMessage>Musíte zadat název!</FormErrorMessage>
        ) : null}
      </FormControl>
    </>
  );
};
