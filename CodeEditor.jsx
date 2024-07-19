import { useRef, useState } from "react";
import { Box, HStack, VStack, Input, Button, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const LANGUAGE_EXTENSIONS = {
  javascript: 'js',
  python: 'py',
  java: 'java',
  c: 'c',
  cpp: 'cpp',
  csharp: 'cs',
  go: 'go',
  kotlin: 'kt',
  php: 'php',
  ruby: 'rb',
  rust: 'rs',
  swift: 'swift',
  typescript: 'ts',
  // Add more languages as needed
};

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [input, setInput] = useState("");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const saveFile = () => {
    const element = document.createElement("a");
    const file = new Blob([value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `mycode.${LANGUAGE_EXTENSIONS[language]}`;
    document.body.appendChild(element);
    element.click();
  }

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
          <Button onClick={saveFile}>Save code</Button>
        </Box>
        <VStack w="50%" spacing={2} align="left">
          <Text mb={2} fontSize="lg">Inputs</Text>
          <Input
            placeholder="Enter comma ',' separated input here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Output editorRef={editorRef} language={language} input={input} />
        </VStack>
      </HStack>
    </Box>
  );
};
export default CodeEditor;
