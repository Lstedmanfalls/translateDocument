import * as fs from 'fs';
import { Document, Packer, PageBreak, Paragraph, TextRun } from 'docx';
import { getTranslation } from './translateText';
import WordDocPage from './types/wordDocPage';
import { clearTmpFile } from './clearTmpFile';

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
  const date = Date.now();
  const fileNameSplitExt = fileName.split('.');
  const translationFileName = `${fileNameSplitExt[0]}_${date}.docx`;
  const translationFilePath = `tmp/translated/${translationFileName}`;
  Packer.toBuffer(newWordDoc).then((buffer) => {
    if (!fs.existsSync('tmp/translated')) {
      fs.mkdirSync('tmp/translated');
    }
    fs.writeFileSync(translationFilePath, buffer);
  });
  return { translationFileName };
};

export const createTranslatedDocument = async (uploadFileName: string, start = 1, end?: number): Promise<{ translationFileName: string }> => {
  const uploadFilePath = `tmp/uploaded/${uploadFileName}`;
  const translatedText = await getTranslation(uploadFilePath, start, end);
  const wordDocPages = translatedText.map((textPage) => {
    const page = buildPage(textPage.translation);
    return page;
  });
  const translationFileName = createWordDoc(wordDocPages, uploadFileName);
  clearTmpFile(uploadFilePath);
  return translationFileName;
};
