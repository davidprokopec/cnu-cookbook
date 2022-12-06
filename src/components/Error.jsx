import React from 'react';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

export const Error = ({ children }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  );
};
