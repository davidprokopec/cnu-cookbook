import { useState } from 'react';
import SortableList from 'react-sortable-list';
import { api } from '../api';

export const SortableIngredients = ({ ingredients }) => {
  return (
    <>
      <SortableList data={ingredients}></SortableList>
    </>
  );
};
