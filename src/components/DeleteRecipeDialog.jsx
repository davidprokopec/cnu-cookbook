import React from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function DeleteRecipeDialog({ isOpen, onClose, recipe }) {
  const cancelRef = React.useRef();
  const navigate = useNavigate();

  const toast = useToast();

  const deleteRecipe = () => {
    api.delete('recipes/' + recipe._id).then(() => {
      navigate('/');
      toast({
        title: 'Recept byl úspěšně smazán',
        position: 'top',
        status: 'success',
        duration: 9000,
      });
    });
  };
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Smazat recept
            </AlertDialogHeader>

            <AlertDialogBody>
              Určite smazat recept <b>{recipe?.title}</b>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Zrušit
              </Button>
              <Button colorScheme="red" onClick={deleteRecipe} ml={3}>
                Smazat
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
