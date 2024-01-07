import fs from 'fs';
import { Document, Packer, PageBreak, Paragraph, TextRun } from 'docx';
import { getTranslation } from './translateText';
import WordDocPage from '../types/wordDocPage';
import { getPath } from '../helpers/getPath';
import { getNewFileName } from '../helpers/getNewFileName';

const buildPage = (text: string): WordDocPage => {
  const section = {
    properties: {},
    children: [
      new Paragraph({
        children: [
          new TextRun(text),
          new PageBreak(),
        ],
      }),
    ],
  };
  return section;
};

const createWordDoc = (sections: WordDocPage[], fileName: string): { translationFileName: string } => {
  const newWordDoc = new Document({
    sections,
  });
  const translationFileName = getNewFileName(fileName, 'docx');
  const translationFilePath = getPath('translated', translationFileName);
  Packer.toBuffer(newWordDoc).then((buffer) => {
    fs.writeFileSync(translationFilePath, buffer);
  });
  return { translationFileName };
};

export const createTranslatedDocument = async (uploadFileName: string, targetLang: string, start = 1, end?: number): Promise<{ translationFileName: string }> => {
  const uploadFilePath = getPath('uploaded', uploadFileName);
  const translatedText = await getTranslation(uploadFilePath, targetLang, start, end);
  const wordDocPages = translatedText.map((textPage) => {
    const page = buildPage(textPage.translation);
    return page;
  });
  const translationFileName = createWordDoc(wordDocPages, uploadFileName);
  return translationFileName;
};
