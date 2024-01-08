import { extractPdfText } from './extractPdfText';
import { transformText } from './transformText';
import { Translate } from '@google-cloud/translate/build/src/v2';
import { PdfPageText } from '../types/pdfPageData';
import { TranslatedText } from '../types/translatedTextData';

const translateText = async (textPages: PdfPageText[], targetLang: string): Promise<{ pageNumber: number, translation: string }[]> => {
  const projectId = process.env.PROJECT_ID;
  if (!projectId) {
    throw new Error('PROJECT_ID env variable not set');
  }
  const translator = new Translate({ projectId });
  const translatedText = textPages.map(async (textObject) => {
    const pageNumber = textObject.pageNumber;
    const text = textObject.pageText;
    const [translation] = await translator.translate(text, targetLang);
    return { pageNumber, translation };
  });
  return Promise.all(translatedText);
};

export const getTranslation = async (filePath: string, targetLang: string, start: number = 1, end?: number): Promise<TranslatedText[]> => {
  const rawText = await extractPdfText(filePath, start, end);
  const transformedText = transformText(rawText);
  const translatedText = await translateText(transformedText, targetLang);
  return translatedText;
};
