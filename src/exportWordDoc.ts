import * as fs from 'fs';
import { Document, Packer, PageBreak, Paragraph, TextRun } from 'docx';
import { getTranslation } from './translateText';
import WordDocPage from './types/wordDocPage';

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

const createWordDoc = (sections: WordDocPage[]): void => {
  const newWordDoc = new Document({
    sections,
  });
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const stringDate = `${month}-${day}-${year}`;

  Packer.toBuffer(newWordDoc).then((buffer) => {
    fs.writeFileSync(`translatedDocs/translated_${stringDate}.docx`, buffer);
  });
};

export const exportWordDoc = async (
): Promise<void> => {
  // Pdf file is stored at root dir for now
  // Provide start, or start and end, to get specific pages
  // Pass nothing after file path to translate whole document
  const translatedText = await getTranslation('./dhl-handbuch-funktion-retoure-v7-122019.pdf', 1, 1);

  const wordDocPages = translatedText.map((textPage) => {
    const page = buildPage(textPage.translation);
    return page;
  });
  createWordDoc(wordDocPages);
};

exportWordDoc();
