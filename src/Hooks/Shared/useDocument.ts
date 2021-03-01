import {useCallback, useState} from 'react';
import DocumentPicker, {
  DocumentPickerOptions,
  DocumentPickerResponse,
  Platform,
} from 'react-native-document-picker';

function useDocument() {
  const [data, setData] = useState<DocumentPickerResponse[]>([]);

  const clear = useCallback(() => {
    setData([]);
  }, []);

  const remove = useCallback((index: number) => {
    setData((_data) => {
      const temp = [..._data];
      temp.splice(index, 1);
      return temp;
    });
  }, []);

  const openDocument = useCallback(
    async (options: DocumentPickerOptions<Platform>) => {
      try {
        const document = await DocumentPicker.pick(options);
        setData([document]);
      } catch (error) {}
    },
    [],
  );

  const openDocumentMultiple = useCallback(
    async (options: DocumentPickerOptions<Platform>) => {
      const documents = await DocumentPicker.pickMultiple(options);
      setData(documents);
    },
    [],
  );

  return {openDocument, openDocumentMultiple, clear, remove, data};
}

export default useDocument;
