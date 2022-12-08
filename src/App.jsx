import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AppLayout } from './components/layout/AppLayout';
import { ApiTestPage } from './pages/ApiTestPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecipeListPage } from './pages/RecipeListPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { RecipeEditPage } from './pages/RecipeEditPage';
import { NewRecipePage } from './pages/NewRecipePage';
import theme from './theme';

export function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AppLayout>
          <Routes>
            <Route path="/" element={<RecipeListPage />} />
            <Route path="/recept/:slug" element={<RecipeDetailPage />} />
            <Route path="/recept/:slug/upravit" element={<RecipeEditPage />} />
            <Route path="/recept/novy" element={<NewRecipePage />} />
            <Route path="/api-test" element={<ApiTestPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppLayout>
      </ChakraProvider>
    </BrowserRouter>
  );
}
