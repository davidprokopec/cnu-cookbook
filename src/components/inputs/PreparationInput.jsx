import { Box, Flex, Link } from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

export const PreparationInput = ({ preparation, setPreparation }) => {
  return (
    <>
      <Flex mt={5} direction="column">
        <MDEditor
          height={500}
          hideToolbar
          value={preparation}
          onChange={setPreparation}
          textareaProps={{
            placeholder: 'Instrukce',
          }}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          preview="edit"
        />
        <Link
          mt={2}
          target="_blank"
          color="blue.500"
          alignSelf="flex-end"
          href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
        >
          Návod na Markdown
        </Link>
      </Flex>
    </>
  );
};
